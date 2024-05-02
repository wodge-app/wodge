import WorkspaceParty from "../workspace-party";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { nanoid } from "nanoid";
import { Context } from "hono";
import { getBucketAddress, REPLICACHE_VERSIONS_KEY } from "@repo/data";

export async function uploadFile(party: WorkspaceParty, c: Context) {
  const s3Client = new S3Client({
    region: "us-east-1",
    endpoint: party.room.env.ENDPOINT as string,
    credentials: {
      accessKeyId: party.room.env.ACCESS_KEY as string,
      secretAccessKey: party.room.env.SECRET_KEY as string,
    },
  });

  const teamId = c.req.param("teamId");

  if (!teamId) return c.json({ error: "Team ID is required" }, 400);

  let path;

  if (c.req.param("path")) path = atob(c.req.param("path")!);

  const fileId = nanoid();

  const body = await c.req.parseBody();

  const file = body["file"] as File;

  const key = teamId + "/" + (path || fileId);

  const bucket = getBucketAddress(party.room.id);

  try {
    const input = {
      Body: file,
      Bucket: bucket,
      Key: key,
      ContentType: file.type,
    };

    const command = new PutObjectCommand(input);
    const response = await s3Client.send(command);

    party.versions.set(
      "workspaceInfo",
      party.versions.get("workspaceInfo")! + 1
    );

    await Promise.all([
      party.poke({
        type: "team-files",
      }),
      party.room.storage.put(REPLICACHE_VERSIONS_KEY, party.versions),
    ]);

    return c.json({ response, fileId }, 200);
  } catch (error) {
    return c.json(error, 400);
  }
}