import { string } from "zod";
import { DrObj, Folder, Team, WorkspaceStructure } from "../../..";
import {
  addTeamFolderMutation,
  deleteTeamFoldersMutation,
} from "./team-folders";
import { updateTeamInfoMutation } from "./team-info";
import { addTeamMembersMutation, removeTeamMembers } from "./team-members";
import { WorkspaceTeamMutation } from "./types";
import { changeTeamMemberRoleMutation } from "./change-team-member-role";

export type UpdatableTeamFields = Omit<Team, "id" | "createdBy">;

export type TeamUpdate =
  | {
      action: "updateInfo";
      update: {
        name: Team["name"];
        avatar: Team["avatar"];
      };
    }
  | {
      action: "addMembers" | "removeMembers";
      update: { members: Team["members"] };
    }
  | {
      action: "addFolder";
      update: { folder: Folder };
    }
  | {
      action: "removeFolders";
      update: { folders: string[] };
    }
  | {
      action: "changeTeamMemberRole";
      update: { memberId: string; role: "teamMember" | "moderator" };
    };

export interface TeamUpdateRunnerArgs extends WorkspaceTeamMutation {
  teamUpdate: TeamUpdate;
  curMembers?: string[];
}

export function teamUpdateRunner({
  teamUpdate,
  structure,
  teamId,
  curMembers,
}: TeamUpdateRunnerArgs): WorkspaceStructure | DrObj<WorkspaceStructure> {
  if (!teamUpdate.action) throw new Error("Invalid update action");

  const { action, update } = teamUpdate;

  switch (action) {
    case "updateInfo":
      return updateTeamInfoMutation({ update, teamId, structure });

    case "addMembers":
      if (!curMembers)
        throw new Error("Current members are required for adding members");
      return addTeamMembersMutation({
        update,
        teamId,
        structure,
        curMembers,
      });

    case "removeMembers":
      return removeTeamMembers({ update, teamId, structure });

    case "changeTeamMemberRole":
      return changeTeamMemberRoleMutation({
        update,
        teamId,
        structure,
      });

    case "addFolder":
      return addTeamFolderMutation({ update, teamId, structure });

    case "removeFolders":
      return deleteTeamFoldersMutation({ update, teamId, structure });

    default:
      throw new Error("Invalid update action");
  }
}
