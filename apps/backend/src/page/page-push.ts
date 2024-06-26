import type * as Party from "partykit/server";
import { repPush, RunnerParams } from "../lib/replicache";
import { pokeWorkspace } from "../lib/utils";
import { badRequest } from "../lib/http-utils";
import { Context, HonoRequest } from "hono";
import PageParty from "./page-party";
import { createColumn } from "./create-column";
import { deleteColumn } from "./delete-column";
import { updateColumn } from "./update-column";
import { createTask } from "./create-task";
import { editTask } from "./edit-task";
import { deleteTask } from "./delete-task";
import { moveColumns } from "./move-columns";
import { moveTasks } from "./move-tasks";

export async function pagePush(party: PageParty, c: Context) {
  const wid = c.req.header("x-workspace-id");

  if (!wid) return badRequest();

  const res = await repPush({
    req: c.req,
    storage: party.room.storage,
    versions: party.versions,
    runner: runner(party, c.req),
  });

  if (res.status === 200) {
    await pokeWorkspace(wid, party);
  }

  return res;
}

function runner(party: PageParty, req: HonoRequest) {
  return async (params: RunnerParams) => {
    const isAdmin = req.header("x-admin") === "true";
    const isOwner = req.header("x-owner") === "true";
    const isTeamModerator = req.header("x-team-moderator") === "true";
    const canEdit = req.header("x-can-edit") === "true";
    if (!isAdmin && !isOwner && !isTeamModerator && !canEdit) return;

    switch (params.mutation.name) {
      case "createColumn":
        return await createColumn(party, params);
      case "deleteColumn":
        return await deleteColumn(party, params);
      case "updateColumn":
        return await updateColumn(party, params);
      case "createTask":
        return await createTask(party, params);
      case "editTask":
        return await editTask(party, params);
      case "deleteTask":
        return await deleteTask(party, params);
      case "moveColumns":
        return await moveColumns(party, params);
      case "moveTasks":
        return await moveTasks(party, params);

      default:
        throw new Error("Unknown mutation: " + params.mutation.name);
    }
  };
}
