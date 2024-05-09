import {
  getAvatarAddress,
  makeUserAvatarKey,
  makeWorkspaceAvatarKey,
} from "@repo/data";
import { updateUserById, updateWorkspaceById } from "@repo/data/server";
import { env } from "@repo/env";

export async function POST(req: Request) {
  const serviceKey = req.headers.get("authorization");

  if (env.SERVICE_KEY !== serviceKey)
    return new Response(null, { status: 401 });

  const userId = req.headers.get("userId");
  const key = req.headers.get("key");

  if (!userId || !key) {
    return new Response(null, { status: 400 });
  }

  await updateUserById(userId, {
    avatar: getAvatarAddress(makeUserAvatarKey(key)),
  });

  return new Response(null, { status: 200 });
}

export async function DELETE(req: Request) {
  const serviceKey = req.headers.get("authorization");

  if (env.SERVICE_KEY !== serviceKey)
    return new Response(null, { status: 401 });

  const userId = req.headers.get("userId");

  if (!userId) {
    return new Response(null, { status: 400 });
  }

  const { user } = await updateUserById(userId, {
    avatar: null,
  });

  return Response.json({ user }, { status: 200 });
}