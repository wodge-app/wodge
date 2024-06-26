import { z } from "zod";
import { ID_LENGTH, WORKSPACE_GROUP_ID_LENGTH } from "./config";

export type ChannelsTypes = "page" | "room" | "thread" | "resources";

export const ChannelSchema = z.object({
  id: z.string().length(ID_LENGTH),
  name: z.string().max(70).min(1),
  avatar: z.string().optional(),
  viewGroups: z.array(
    z.string().length(WORKSPACE_GROUP_ID_LENGTH).or(z.literal("team-members"))
  ),
  editGroups: z.array(
    z.string().length(WORKSPACE_GROUP_ID_LENGTH).or(z.literal("team-members"))
  ),
});

export type Channel = z.infer<typeof ChannelSchema>;

export const AiActionSchema = z.object({
  text: z.string(),
  action: z.enum([
    "simplify",
    "fix",
    "shorter",
    "longer",
    "tone",
    "tldr",
    "emojify",
    "translate",
    "complete",
  ]),
  lang: z.string().optional(),
});

export type AiAction = z.infer<typeof AiActionSchema>;
