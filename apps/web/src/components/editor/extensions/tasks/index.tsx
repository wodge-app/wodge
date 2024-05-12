import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import KanbanBoard from "./kanban-board";
import { nanoid } from "nanoid";

import { atom } from "jotai";
import * as Y from "yjs";

export const yDocAtom = atom<Y.Doc | undefined>(undefined);

export const Tasks = Node.create({
  name: "kanban-board",
  group: "block",
  isolating: true,
  selectable: false,

  parseHTML() {
    return [
      {
        tag: "kanban-board",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["kanban-board", mergeAttributes(HTMLAttributes)];
  },
  addNodeView() {
    return ReactNodeViewRenderer(KanbanBoard);
  },

  addAttributes() {
    return {
      "data-id": {
        default: nanoid(6),
      },
    };
  },
});