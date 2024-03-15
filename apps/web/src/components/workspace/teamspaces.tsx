import * as React from "react";

import { SidebarItem } from "./sidebar-item";
import {
  ChevronRight,
  Component,
  GripVertical,
  MoreHorizontal,
} from "lucide-react";
import { SidebarItemBtn } from "./sidebar-item-btn";
import { Team, Dir } from "@repo/data";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/ui/accordion";
import { cn } from "@repo/ui/lib/utils";
import { Directories } from "./folders";
import { useAtom, useAtomValue } from "jotai";
import {
  isDraggingTeamAtom,
  tempOpenTeamsAtom,
} from "@/app/(app)/workspaces/[workspaceId]/(workspace)/atoms";

export function Teamspaces({ teams }: { teams: Team[] }) {
  const teamsId = useMemo(() => teams?.map((t) => t.id) || [], [teams]);
  const [openTeams, setOpenTeams] = useAtom(tempOpenTeamsAtom);
  const isDraggingTeam = useAtomValue(isDraggingTeamAtom);

  return (
    <div className="h-full min-h-full shrink-0">
      <Accordion type="multiple" value={openTeams} onValueChange={setOpenTeams}>
        <SortableContext items={teamsId} strategy={verticalListSortingStrategy}>
          <ul>
            {teams?.map((team) => (
              <SortableTeamspace key={team.id} team={team} />
            ))}
          </ul>
        </SortableContext>
      </Accordion>
    </div>
  );
}

// Teamspace
function SortableTeamspace({ team }: { team: Team }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    activeIndex,
  } = useSortable({
    id: team.id,
    data: {
      type: "team",
    },
  });

  const isDraggingTeam = useAtomValue(isDraggingTeamAtom);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <AccordionItem value={team.id}>
      <AccordionTrigger style={style} {...listeners} {...attributes} asChild>
        <div>
          <Teamspace
            team={team}
            activeIndex={activeIndex}
            isDragging={isDragging}
            ref={setNodeRef}
          />
        </div>
      </AccordionTrigger>
      <AccordionContent
        className={cn("pl-3 transition-all", isDraggingTeam && "hidden")}
      >
        <Directories teamId={team.id} dirs={team.dirs} />
      </AccordionContent>
    </AccordionItem>
  );
}

interface DraggableProps {
  activeIndex?: number;
  isDragging: boolean;
}

export const Teamspace = React.forwardRef<
  HTMLLIElement,
  { team: Team } & DraggableProps & React.HTMLAttributes<HTMLLIElement>
>(({ team, activeIndex, isDragging, ...props }, ref) => {
  return (
    <li ref={ref} className="group flex grow items-center" {...props}>
      <GripVertical
        className={cn(
          "invisible h-3.5 w-3.5 text-black group-hover:visible",
          activeIndex && activeIndex !== -1 && "invisible",
        )}
      />
      <SidebarItem
        aria-disabled={isDragging}
        label={team.name}
        Icon={Component}
      >
        <ChevronRight className=" ml-1.5 h-3.5 w-3.5 min-w-3.5 max-w-3.5 transition-transform group-data-[state=open]:rotate-90" />
        <SidebarItemBtn Icon={MoreHorizontal} className="-my-1 ml-auto" />
      </SidebarItem>
    </li>
  );
});

Teamspace.displayName = "Teamspace";
