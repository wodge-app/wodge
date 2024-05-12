import { pageMutators, roomMutators, threadMutators } from "@repo/data";
import { userMutators } from "@repo/data/models/user/user-mutators";
import { workspaceMutators } from "@repo/data/models/workspace/workspace-mutators";
import { Room } from "livekit-client";
import PartySocket from "partysocket";
import { Replicache } from "replicache";
import { createStore } from "zustand/vanilla";
import { createWorkspaceRep } from "./create-workspace-rep";
import { createSocket } from "./create-socket";
import { env } from "@repo/env";
import { devtools } from "zustand/middleware";
import { extend } from "lodash";

type ChannelMutators =
  | typeof roomMutators
  | typeof threadMutators
  | typeof pageMutators;

export interface ConnectionParams {
  workspaceId?: string;
  channelId?: string;
  teamId?: string;
  channelName?: string;
  workspaceSlug?: string;
  workspaceName?: string;
  teamName?: string;
}

export interface RoomCall extends ConnectionParams {
  room: Room;
}

export interface AppStore {
  userStore?: Replicache<typeof userMutators>;
  workspaces: Record<string, Replicache<typeof workspaceMutators>>;
  activeChanRep?: Replicache<ChannelMutators>;
  socket?: PartySocket;
  room?: RoomCall;
  micStatus?: boolean;
  camStatus?: boolean;
  screenStatus?: boolean;

  actions: {
    addWorkspace: (
      workspace: string,
      userId: string,
    ) => Replicache<typeof workspaceMutators>;
    connectSocket: (userId: string) => void;
    getWorkspace: (
      workspaceId: string,
      userId: string,
    ) => Replicache<typeof workspaceMutators> | void;
    removeWorkspace: (workspaceId: string) => void;
    setChannelRep: (rep: Replicache<ChannelMutators>) => void;
    connectToRoom: (params: ConnectionParams) => Promise<RoomCall | undefined>;
    disconnectFromCurrentRoom: () => Promise<void>;
    toggleMic: () => void;
    toggleCam: () => void;
    toggleScreen: () => void;
  };
}

export const createAppStore = () => {
  return createStore<AppStore>()(
    devtools((set, get) => ({
      userStore: undefined,
      workspaces: {},
      micStatus: true,

      actions: {
        addWorkspace: (workspaceId, userId) => {
          // Closing the current workspace so to account for the case of switching from local to cloud
          if (get().workspaces?.[workspaceId] !== undefined)
            get().workspaces?.[workspaceId]?.close();

          const rep = createWorkspaceRep(userId, workspaceId);

          set({
            workspaces: {
              ...get().workspaces,
              [workspaceId]: rep,
            },
          });

          return rep;
        },
        getWorkspace: (workspaceId, userId) => {
          if (!workspaceId) return;
          const workspace = get().workspaces[workspaceId];

          if (!workspace)
            return get().actions.addWorkspace(workspaceId, userId);

          return workspace;
        },
        // Softly delete workspace from the store
        removeWorkspace: async (workspaceId: string) => {
          const workspaces = get().workspaces;

          if (workspaces[workspaceId]) {
            // workaround as close throws an error
            //@ts-ignore
            workspaces[workspaceId]!.puller = undefined;
            //@ts-ignore
            workspaces[workspaceId]!.pusher = undefined;
            // await workspaces[workspaceId]!.close();
          }
          const { workspaceId: _, ...rest } = workspaces;
          set({ ...rest });
        },
        connectSocket: (userId: string) => {
          if (get().socket) return;

          set({ socket: createSocket(userId) });
        },
        setChannelRep: (rep) => {
          set({ activeChanRep: rep });
        },

        connectToRoom: async ({
          workspaceId,
          channelId,
          teamId,
          channelName,
          workspaceSlug,
          teamName,
          workspaceName,
        }) => {
          if (!workspaceId || !channelId || !teamId || !channelName) return;
          const room = new Room({
            disconnectOnPageLeave: false,
          });

          const resp = await fetch(
            `${env.NEXT_PUBLIC_BACKEND_DOMAIN}/parties/room/${channelId}/call-token`,
            {
              headers: {
                "x-workspace-id": workspaceId,
                "x-team-id": teamId,
              },
              credentials: "include",
            },
          );
          const data = await resp.json<{
            token: string;
          }>();
          await room.connect(env.NEXT_PUBLIC_LIVEKIT_URL, data.token);

          room.localParticipant.setMicrophoneEnabled(!!get().micStatus);
          room.localParticipant.setCameraEnabled(!!get().camStatus);
          room.localParticipant.setScreenShareEnabled(!!get().screenStatus);

          room.on("localTrackPublished", (e) => {
            switch (e.track?.source) {
              case "camera":
                set({ camStatus: true });
                break;
              case "microphone":
                set({ micStatus: true });
                break;
              case "screen_share":
                set({ screenStatus: true });
                break;
            }
          });

          room.on("localTrackUnpublished", (e) => {
            console.log(e);
            switch (e.track?.source) {
              case "camera":
                set({ camStatus: false });
                break;
              case "microphone":
                set({ micStatus: false });
                break;
              case "screen_share":
                set({ screenStatus: false });
                break;
            }
          });

          room.on("trackUnpublished", (e) => {
            console.log("x", e);
          });

          const newRoom: RoomCall = {
            room,
            channelId,
            teamId,
            channelName,
            workspaceId,
            workspaceSlug,
            teamName,
            workspaceName,
          };
          set({
            room: { ...newRoom },
          });

          return newRoom;
        },
        disconnectFromCurrentRoom: async () => {
          const room = get().room;
          if (!room) {
            set({ room: undefined });
            return;
          }

          await room.room.disconnect();
          set({ room: undefined });
        },
        toggleMic: () => {
          const room = get().room;
          if (room)
            room.room.localParticipant.setMicrophoneEnabled(!get().micStatus);
          set({ micStatus: !get().micStatus });
        },
        toggleCam: () => {
          const room = get().room;
          if (room)
            room.room.localParticipant.setCameraEnabled(!get().camStatus);
          set({ camStatus: !get().camStatus });
        },
        toggleScreen: () => {
          const room = get().room;
          if (room)
            room.room.localParticipant.setScreenShareEnabled(
              !get().screenStatus,
            );
          set({ screenStatus: !get().screenStatus });
        },
      },
    })),
  );
};