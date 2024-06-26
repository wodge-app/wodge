import {
  PullRequest,
  PullerResult,
  PushRequest,
  PusherResult,
  Replicache,
} from "replicache";

import { env } from "@repo/env";
import { replicacheWrapper } from "@repo/data";
import { workspaceMutators } from "@repo/data/models/workspace/workspace-mutators";

export function createWorkspaceRep(userId: string, workspaceId: string) {
  return new Replicache<typeof workspaceMutators>({
    name: `${userId}-${workspaceId}`,
    licenseKey: env.NEXT_PUBLIC_REPLICACHE_KEY,
    mutators: workspaceMutators,
    pullInterval: null,
    pushURL: undefined,
    pullURL: undefined,
    puller: replicacheWrapper<PullRequest, PullerResult>(
      "pull",
      "workspace",
      workspaceId,
    ),
    pusher: replicacheWrapper<PushRequest, PusherResult>(
      "push",
      "workspace",
      workspaceId,
    ),
  });
}
