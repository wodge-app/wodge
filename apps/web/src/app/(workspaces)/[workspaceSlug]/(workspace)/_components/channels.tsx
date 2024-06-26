import * as React from "react";

import { SidebarItem } from "./sidebar-item";
import {
  FileText,
  GanttChart,
  LucideIcon,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { SidebarItemBtn } from "./sidebar-item-btn";
import {
  ChannelsTypes,
  DrObj,
  Page,
  Room,
  Thread,
  type Channel as ChannelType,
} from "@repo/data";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";

import { cn } from "@/lib/utils";
import { useCurrentWorkspace } from "@/components/workspace-provider";
import { useParams, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCanView } from "@/hooks/use-can-view";
import { AddPageForm } from "./add-page-form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AddRoomForm } from "./add-room-form";
import { isSidebarOpenAtom, recentlyVisitedAtom } from "@/store/global-atoms";
import { useSetAtom } from "jotai";
import { produce } from "immer";
import { useIsTeamModerator } from "@/hooks/use-is-team-moderator";
import { Button } from "@/components/ui/button";
import { AddThreadForm } from "./add-thread-form";
import { toast } from "sonner";
import { useIsDesktop } from "@/hooks/use-is-desktop";

interface ChannelsProps {
  channels: readonly DrObj<ChannelType>[];
  folderId?: string;
  teamId: string;
  type: ChannelsTypes;
}

interface ChannelProps {
  channel: DrObj<ChannelType>;
  folderId?: string;
  teamId: string;
  type: ChannelsTypes;
  idx: number;
}

export function Channels({ channels, folderId, teamId, type }: ChannelsProps) {
  const channelsIds = useMemo(
    () => channels?.map((c) => c.id) || [],
    [channels],
  );

  return (
    <div>
      <SortableContext
        items={channelsIds}
        strategy={verticalListSortingStrategy}
      >
        <ul className="flex flex-col gap-1">
          {channels?.map((channel, i) => (
            <SortableChannel
              key={channel.id}
              channel={channel}
              folderId={folderId}
              teamId={teamId}
              type={type}
              idx={i}
            />
          ))}
        </ul>
      </SortableContext>
    </div>
  );
}

// Teamspace
function SortableChannel({
  channel,
  folderId,
  teamId,
  type,
  idx,
}: ChannelProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    activeIndex,
    index,
    overIndex,
    active,
  } = useSortable({
    id: channel.id,
    data: {
      type,
      folderId,
      teamId,
      idx,
    },
    disabled: true,
  });

  const isSomethingOver = index === overIndex;
  const isChannelOver = active?.data?.current?.type === type;

  const isAbove = activeIndex > overIndex;
  const isBelow = activeIndex < overIndex;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const canView = useCanView({
    type,
    forceTeamId: teamId,
    forceChannelId: channel.id,
    forceFolderId: folderId,
  });

  const isTeamMod = useIsTeamModerator();

  if (!canView) return null;

  return (
    <div
      {...listeners}
      {...attributes}
      className={cn(
        // "border-b-2 border-t-2 border-b-transparent border-t-transparent",
        isSomethingOver && isChannelOver && isAbove && "border-t-blue-400",
        isSomethingOver && isChannelOver && isBelow && "border-b-blue-400",
      )}
    >
      <Channel
        isMod={isTeamMod}
        channel={channel}
        activeIndex={activeIndex}
        isDragging={isDragging}
        type={type}
        ref={setNodeRef}
        teamId={teamId}
        folderId={folderId}
      />
    </div>
  );
}

interface DraggableProps {
  activeIndex?: number;
  isDragging: boolean;
  type: ChannelsTypes;
  teamId: string;
  folderId?: string;
  isMod: boolean;
}

export const Channel = React.forwardRef<
  HTMLLIElement,
  { channel: DrObj<ChannelType> } & DraggableProps &
    React.HTMLAttributes<HTMLLIElement>
>(
  (
    {
      channel,
      activeIndex,
      isMod = false,
      folderId,
      teamId,
      isDragging,
      type,
      ...props
    },
    ref,
  ) => {
    const { workspaceSlug, workspaceRep } = useCurrentWorkspace();
    const { channelId } = useParams() as { channelId: string };

    const isDesktop = useIsDesktop();
    const router = useRouter();
    const setIsSidebarOpen = useSetAtom(isSidebarOpenAtom);

    let icon: LucideIcon | undefined;

    switch (type) {
      case "page":
        icon = FileText;
        break;
      case "room":
        icon = MessageCircle;
        break;
      case "thread":
        icon = GanttChart;
        break;

      default:
        icon = undefined;
    }

    return (
      <li ref={ref} className="group flex grow items-center" {...props}>
        <SidebarItem
          aria-disabled={isDragging}
          Icon={icon}
          isActive={channel.id === channelId}
          onClick={() => {
            if (!isDesktop) setIsSidebarOpen(false);
            router.push(
              `/${workspaceSlug}/${type}/${teamId}${type === "page" ? "/" + folderId : ""}/${channel.id}`,
            );
          }}
        >
          <span className="select-none truncate">{channel.name}</span>
          {isMod && (
            <div className="ml-auto" onClick={(e) => e.stopPropagation()}>
              <Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarItemBtn
                      Icon={MoreHorizontal}
                      className="-my-1 ml-auto flex transition-all group-hover:visible aria-expanded:visible md:invisible"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DialogTrigger asChild>
                      <DropdownMenuItem className="">
                        <Pencil className="h-4 w-4 " />
                        Edit {type}
                      </DropdownMenuItem>
                    </DialogTrigger>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      disclosure
                      destructive
                      onDisclosureConfirm={async () => {
                        try {
                          await workspaceRep?.mutate.deleteChannel({
                            channelId: channel.id,
                            teamId,
                            type,
                            folderId,
                          });
                        } catch {
                          toast.error(`Delete ${type} failed`);
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete {type}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {type === "page" && (
                  <AddPageForm
                    teamId={teamId}
                    folderId={folderId}
                    page={channel as Page}
                  />
                )}

                {type === "room" && (
                  <AddRoomForm
                    teamId={teamId}
                    folderId={folderId}
                    room={channel as Room}
                  />
                )}
                {type === "thread" && (
                  <AddThreadForm
                    teamId={teamId}
                    folderId={folderId}
                    thread={channel as Thread}
                  />
                )}
              </Dialog>
            </div>
          )}
        </SidebarItem>
      </li>
    );
  },
);

// Channel.displayName = "Channel";
