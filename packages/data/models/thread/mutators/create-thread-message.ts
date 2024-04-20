import { produce } from "immer";
import {
  DrObj,
  TEAM_MEMBERS_ROLE,
  Thread,
  ThreadMessage,
  ThreadSchema,
  ThreadMessageSchema,
  PublicUserType,
} from "../../..";
import { WorkspaceStructure } from "../../../schemas/workspace.schema";

export function createThreadMessageMutation({
  //   threadid,
  //   teamId,
  //   structure,
  msg,
  msgsArray,
  userId,
}: {
  //   threadid: string;
  //   teamId: string;
  msg: ThreadMessage;
  //   structure: WorkspaceStructure | DrObj<WorkspaceStructure>;
  msgsArray: ThreadMessage[] | DrObj<ThreadMessage[]>;
  userId: string;
}) {
  //   const team = structure.teams.find((t) => t.id === teamId);
  //   if (!team) throw new Error("Team not found");
  //   const thread = team.threads.find((t) => t.id === threadid);
  //   if (!thread) throw new Error("Thread not found");
  const validateFields = ThreadMessageSchema.safeParse(msg);
  if (!validateFields.success) throw new Error("Invalid msg data");

  //check the msg structure like the thread message structure if ok push the msg in the msgs array
  const { data: newMsg } = validateFields;
  if (newMsg.author !== userId) throw new Error("author error");
  //check if the message is unique in the array
  if (msgsArray.find((m) => m.id === newMsg.id))
    throw new Error("message already exists");
  const newMsgsArray = produce(msgsArray, (draft) => {
    draft.push(newMsg);
  });

  return newMsgsArray as ThreadMessage[];
}