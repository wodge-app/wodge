import { Context } from "hono";
import WorkspaceParty from "../workspace-party";
import { badRequest, ok, unauthorized } from "../../lib/http-utils";

export async function channelPoke(party: WorkspaceParty, c: Context) {
  const serviceKey = c.req.header("authorization");
  const channelId = c.req.header("channelId");
  if (!serviceKey || !channelId) {
    return badRequest();
    badRequest;
  }

  if (serviceKey !== party.room.env.SERVICE_KEY) {
    return unauthorized();
  }

  await party.poke({
    type: "channel",
    id: channelId,
  });

  return ok();
}
