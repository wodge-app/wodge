import { RunnerParams } from "../../lib/replicache";
import WorkspaceParty from "../workspace-party";
import { makeWorkspaceStructureKey } from "@repo/data";
import { deleteFolderMutation } from "@repo/data/models/workspace/mutators/delete-folder";

export async function deleteFolder(
  party: WorkspaceParty,
  params: RunnerParams
) {
  const args = params.mutation.args as { teamId: string; folderId: string };
  party.workspaceStructure.data = deleteFolderMutation({
    structure: party.workspaceStructure.data,
    folderId: args.folderId,
    teamId: args.teamId,
  });

  party.workspaceStructure.lastModifiedVersion = params.nextVersion;

  await party.room.storage.put(
    makeWorkspaceStructureKey(),
    party.workspaceStructure
  );
}