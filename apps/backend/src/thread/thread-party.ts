import type * as Party from "partykit/server";

import { error, notFound, ok, unauthorized } from "../lib/http-utils";
import { authorizeChannel, verifyToken } from "../lib/auth";
import { ServerThreadMessages, ThreadPartyInterface, Versions } from "../types";
import { startFn } from "./start-fn";
import { Hono } from "hono";
import { threadPush } from "./thread-push";
import { threadPull } from "./thread-pull";
import { cors } from "hono/cors";

export default class ThreadParty implements Party.Server, ThreadPartyInterface {
  options: Party.ServerOptions = {
    hibernate: true,
  };

  threadPosts: ServerThreadMessages;
  versions: Versions;

  app: Hono = new Hono().basePath("/parties/thread/:threadId");

  constructor(readonly room: Party.Room) {}

  async onStart() {
    this.app.use(
      cors({
        origin: "*",
      })
    );
    this.app.post("/replicache-pull", threadPull.bind(null, this));

    this.app.post("/replicache-push", threadPush.bind(null, this));

    this.app.onError((err, c) => {
      return error("Something went wrong");
    });

    await startFn(this);
  }

  async onRequest(req: Party.Request) {
    //@ts-ignore
    return this.app.fetch(req);
  }
  static async onBeforeRequest(req: Party.Request, lobby: Party.Lobby) {
    // CORS preflight response
    if (req.method === "OPTIONS") {
      return ok();
    }

    try {
      const payload = await verifyToken(req, lobby);

      if (!payload || !payload?.userId || payload?.isUpload) {
        return unauthorized();
      }

      req.headers.set("x-user-id", payload.userId as string);

      if (payload?.username)
        req.headers.set("x-username", payload.username as string);

      return authorizeChannel(req, lobby, payload.userId as string, "thread");
    } catch (e) {
      return unauthorized();
    }
  }
}

ThreadParty satisfies Party.Worker;
