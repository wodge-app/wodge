import { cn } from "@/lib/utils";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { SortableContext } from "@dnd-kit/sortable";
import { Board, Column, pageMutators, Task } from "@repo/data";
import { Editor } from "@tiptap/react";
import { useMemo, useState } from "react";
import { Replicache } from "replicache";
import ColumnContainer, { ColumnTitle } from "./column-container";
import { Button } from "@/components/ui/button";
import { nanoid } from "nanoid";
import { createPortal } from "react-dom";
import { Plus } from "lucide-react";
import TaskCard from "./task-card";

export function KanbanView({
  board,
  editor,
  boardId,
  rep,
}: {
  board: Board;
  editor: Editor;
  boardId: string;
  rep?: Replicache<typeof pageMutators>;
}) {
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);

  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );
  const columnsId = useMemo(
    () => board?.columns.map((col) => col.id) || [],
    [board?.columns],
  );
  return (
    <div className="flex w-full items-center overflow-x-auto overflow-y-auto pb-4">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        // onDragOver={onDragOver}
        modifiers={activeColumn ? [restrictToHorizontalAxis] : []}
      >
        <div
          className={cn(
            "flex",

            board?.columns?.length && board?.columns?.length > 0 && "gap-4",
          )}
        >
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {board?.columns?.map((col) => (
                <ColumnContainer
                  editor={editor}
                  key={col.id}
                  column={col}
                  boardId={boardId}
                  rep={rep}
                  tasks={board?.tasks?.filter(
                    (task) => task.columnId === col.id,
                  )}
                />
              ))}
            </SortableContext>
          </div>

          <Button
            className="h-9 w-80 justify-start gap-2"
            variant="ghost"
            onClick={async () => {
              await rep?.mutate.createColumn({
                boardId,
                id: nanoid(6),
                title: "New column",
              });
            }}
          >
            <Plus className="h-4 w-4" />
            Add column
          </Button>
        </div>

        {createPortal(
          <DragOverlay dropAnimation={null}>
            {activeColumn && <ColumnTitle column={activeColumn} />}
            {activeTask && <TaskCard task={activeTask} />}
          </DragOverlay>,
          document.body,
        )}
      </DndContext>
    </div>
  );

  async function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;
    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isActiveColumn = active.data.current?.type === "Column";

    const isOverATask = over.data.current?.type === "Task";
    if (!isActiveATask && !isActiveColumn) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      // setTasks(tasks => {
      // const activeIndex = board?.tasks.findIndex((t) => t.id === activeId);
      // const overIndex = board?.tasks.findIndex((t) => t.id === overId);
      //   if (tasks[activeIndex]?.columnId != tasks[overIndex]?.columnId) {
      //     // Fix introduced after video recording
      //     if (tasks[activeIndex] && tasks[overIndex]) tasks[activeIndex].columnId = tasks[overIndex].columnId
      //     return arrayMove(tasks, activeIndex, overIndex - 1)
      //   }
      // return arrayMove(tasks, activeIndex, overIndex)
      // })

      await rep?.mutate.moveTasks({
        boardId,
        t1: activeId as string,
        isOverColumn: false,
        tOrC2: overId as string,
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";
    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      await rep?.mutate.moveTasks({
        boardId,
        t1: activeId as string,
        isOverColumn: true,
        tOrC2: overId as string,
      });
    }

    if (isActiveColumn && isOverAColumn) {
      await rep?.mutate.moveColumns({
        c1: activeId as string,
        c2: overId as string,
        boardId,
      });
    }
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      //@ts-ignore
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      // @ts-ignore
      setActiveTask(event.active.data.current.task);
      return;
    }
  }
}