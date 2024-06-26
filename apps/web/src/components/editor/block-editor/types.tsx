import * as Y from "yjs";
import YPartyKitProvider from "y-partykit/provider";

export interface TiptapProps {
  ydoc: Y.Doc;
  provider: YPartyKitProvider;
}

export type EditorUser = {
  clientId: string;
  userId: string;
  username: string;
  displayName: string;
  color: string;
  avatar?: string;
  initials?: string;
};

export type LanguageOption = {
  name: string;
  label: string;
  // value: Language
};

export type AiTone =
  | "academic"
  | "business"
  | "casual"
  | "childfriendly"
  | "conversational"
  | "emotional"
  | "humorous"
  | "informative"
  | "inspirational"
  | string;

export type AiPromptType = "SHORTEN" | "EXTEND" | "SIMPLIFY" | "TONE";

export type AiToneOption = {
  name: string;
  label: string;
  value: AiTone;
};

export type AiImageStyle = {
  name: string;
  label: string;
  value: string;
};
