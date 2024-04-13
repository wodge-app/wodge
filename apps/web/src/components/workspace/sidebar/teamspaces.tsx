import * as React from "react";

import { SidebarItem } from "../sidebar-item";

import { SidebarItemBtn } from "../sidebar-item-btn";
import { ChannelsTypes, DrObj, Team } from "@repo/data";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";
import { cn } from "@repo/ui/lib/utils";
import { Folders } from "./folders";
import { useAtom, useAtomValue } from "jotai";
import { openTeamsAtom } from "@/app/(workspaces)/[workspaceSlug]/(workspace)/atoms";
import { useCurrentWorkspace } from "@repo/ui/hooks/use-current-workspace";
import { Avatar, AvatarFallback } from "@repo/ui/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/ui/components/ui/collapsible";
import { TeamMore } from "./team-more";
import { Channels } from "./channels";
import { TeamRoomsMore } from "./team-rooms-more";
import { TeamThreadsMore } from "./team-threads-more";

interface TeamspacesProps {
  isPages?: boolean;
  type: ChannelsTypes;
}

interface TeamspaceProps extends TeamspacesProps {
  team: DrObj<Team>;
  idx: number;
}

export function Teamspaces({ isPages = false, type }: TeamspacesProps) {
  const { structure } = useCurrentWorkspace();

  const teamsId = useMemo(
    () => structure.teams?.map((t) => t.id) || [],
    [structure.teams],
  );
  const [openTeams, setOpenTeams] = useAtom(openTeamsAtom);

  return (
    <div className="h-full min-h-full shrink-0">
      <SortableContext items={teamsId} strategy={verticalListSortingStrategy}>
        <ul className="flex flex-col gap-2">
          {structure.teams?.map((team, i) => (
            <SortableTeamspace
              key={team.id}
              team={team}
              idx={i}
              type={type}
              isPages={isPages}
            />
          ))}
        </ul>
      </SortableContext>
    </div>
  );
}

// Teamspace
function SortableTeamspace({
  team,
  idx,
  isPages = false,
  type,
}: TeamspaceProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    activeIndex,
    overIndex,
    active,
    index,
  } = useSortable({
    id: team.id,
    data: {
      type: "team",
      idx,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isSomethingOver = index === overIndex;
  const isTeamOver = active?.data?.current?.type === "team";

  const isOpen = useAtomValue(openTeamsAtom).includes(team.id);

  const isChannelOver =
    active?.data?.current?.type === "channel" &&
    active?.data?.current?.teamId !== team.id;

  const isFolderOver =
    active?.data?.current?.type === "folder" &&
    active?.data?.current?.teamId !== team.id;

  const isChanFoldOver = isSomethingOver && (isChannelOver || isFolderOver);

  const isAbove = activeIndex > overIndex;
  const isBelow = activeIndex < overIndex;

  return (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <div
          className={cn(
            // "border-b-2 border-b-blue-200 -py-2",
            isSomethingOver && isOpen && isChanFoldOver && "border-b-blue-400",
          )}
        >
          <Teamspace
            team={team}
            type={type}
            isChanFoldOver={isChanFoldOver}
            isDragging={isDragging}
            ref={setNodeRef}
          />
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="py-1 pl-[0.9375rem]">
        <div className="border-l border-border p-0 pl-1.5">
          {/* <Separator orientation="vertical" className="bg-yellow-300" /> */}

          {isPages && <Folders teamId={team.id} folders={team.folders} />}
          {!isPages && (
            <>
              {type === "room" && (
                <Channels type="room" teamId={team.id} channels={team.rooms} />
              )}

              {type === "thread" && (
                <Channels
                  type="thread"
                  teamId={team.id}
                  channels={team.threads}
                />
              )}
            </>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

interface DraggableProps {
  isChanFoldOver?: boolean;
  isDragging: boolean;
  type: ChannelsTypes;
}

export const Teamspace = React.forwardRef<
  HTMLLIElement,
  { team: DrObj<Team> } & DraggableProps & React.HTMLAttributes<HTMLLIElement>
>(({ team, isChanFoldOver, type, isDragging, ...props }, ref) => {
  return (
    <li ref={ref} className="group flex grow" {...props}>
      <SidebarItem
        aria-disabled={isDragging}
        isActive={isChanFoldOver}
        noIcon
        collapsible
      >
        <Avatar className=" mr-1.5 h-5 w-5 shrink-0 rounded-md border border-primary/30 text-xs">
          {/* <AvatarImage src={workspace?.avatar} /> */}
          <AvatarFallback className="select-none rounded-md text-xs uppercase">
            {team.name[0]}
          </AvatarFallback>
        </Avatar>

        <span className="select-none truncate">{team.name}</span>

        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="ml-auto"
        >
          {type === "page" && <TeamMore teamId={team.id} />}
          {type === "room" && <TeamRoomsMore teamId={team.id} />}
          {type === "thread" && <TeamThreadsMore teamId={team.id} />}
        </div>
      </SidebarItem>
    </li>
  );
});

Teamspace.displayName = "Teamspace";
