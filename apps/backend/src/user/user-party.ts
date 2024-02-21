import type * as Party from "partykit/server";

import { handlePost } from "./user-party-post";
import { json, notImplemented, ok, unauthorized } from "../lib/http-utils";
import { getSession } from "../lib/auth";
import { UserWorkspacesStoreType } from "@repo/data/schemas/user-schemas";
import {
  CLIENT_GROUP_PREFIX,
  WORKSPACES_STORE_PREFIX,
} from "@repo/data/prefixes";

export default class UserParty implements Party.Server {
  workspacesStore: UserWorkspacesStoreType;
  versions: Map<string, number>;

  constructor(readonly room: Party.Room) {}

  async onStart() {
    this.versions =
      (await this.room.storage.get("versions")) ||
      new Map([["globalVersion", 0]]);

    this.workspacesStore =
      (await this.room.storage.get<UserWorkspacesStoreType>(
        WORKSPACES_STORE_PREFIX
      )) || {
        workspaces: [],
        lastModifiedVersion: 0,
        deleted: false,
      };
  }

  async onRequest(req: Party.Request) {
    switch (req.method) {
      case "POST":
        return await handlePost(req, this);
      case "GET":
        return json({
          glob: "hi",
          versions: this.versions.get("globalVersion"),
          cls: Object.fromEntries(
            await this.room.storage.list({ prefix: "clientGroup" })
          ),
          s: this.workspacesStore,
        });
      case "OPTIONS":
        return ok();
      default:
        return notImplemented();
    }
  }

  static async onBeforeRequest(req: Party.Request, lobby: Party.Lobby) {
    // CORS preflight response
    if (req.method === "OPTIONS") {
      return ok();
    }

    try {
      const session = await getSession(req, lobby);

      // Authorize the user by checking that session.userId matches the target user id (party id)
      if (session.userId !== lobby.id) throw new Error("Unauthorized");

      // Request is authorized - forward it
      return req;
    } catch (e) {
      return unauthorized();
    }
  }
}
UserParty satisfies Party.Worker;
