import { produce } from "immer";
import { DrObj } from "../../..";
import { Board, Column, Task } from "../../../schemas/page.schema";

export function createTaskMutation({
  col,
  task,
  boards,
  boardId,
}: {
  col: string;
  task: Task;
  boards: Board[] | DrObj<Board[]>;
  boardId: string;
}) {
  const newBoards = produce(boards, (draft) => {
    const board = draft.find((b) => b.id === boardId);

    if (!board) return;

    const column = board.columns?.find((c) => c.id === col);

    if (!column) return draft;

    board.tasks.push({
      ...task,
      columnId: column.id,
    });

    return draft;
  });

  return newBoards as Board[];
}
