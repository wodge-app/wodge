import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Context } from "hono";
import { getS3Client } from "../../lib/get-s3-client";
import WorkspaceParty from "../workspace-party";
import { GetObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { getBucketAddress } from "@repo/data";

export async function downloadFile(party: WorkspaceParty, c: Context) {
  if (!c.req.param("path") || !c.req.param("teamId"))
    return c.json({ message: "Path and teamId are required" }, 400);

  const s3Client = getS3Client(party.room);
  const bucket = getBucketAddress(party.room.id);

  const path = atob(c.req.param("path"));
  let key = c.req.param("teamId") + "/" + path;

  const checkFile = await getSignedUrl(
    s3Client,
    new HeadObjectCommand({ Bucket: bucket, Key: key }),
    { expiresIn: 3600 }
  );
  let checkFileResponse = await fetch(checkFile, {
    method: "HEAD",
  });
  if (checkFileResponse.statusText === "Not Found") {
    return c.json({ message: "File does not exist" }, 400);
  } else {
    const downloadUrl = await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
        ResponseContentDisposition: "attachment",
      }),
      { expiresIn: 3600 }
    );
    return c.json({ downloadUrl }, 200);
  }
}
