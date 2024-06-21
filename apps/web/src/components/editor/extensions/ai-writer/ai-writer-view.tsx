import {
  Extension,
  NodeViewWrapper,
  NodeViewWrapperProps,
} from "@tiptap/react";
import { useCallback, useMemo, useRef, useState } from "react";
import { env } from "@repo/env";
import { useParams } from "next/navigation";
import { useCurrentWorkspace } from "@/components/workspace-provider";
import { Button } from "@/components/ui/button";
import { AiTone, AiToneOption } from "@/components/editor/block-editor/types";
import { nanoid } from "nanoid";
import { toast } from "sonner";
import { Prompt } from "@repo/data";
import { Panel, PanelHeadline } from "@/components/editor/ui/Panel";
import { Textarea } from "@/components/editor/ui/Textarea";
import { Icon } from "@/components/editor/ui/icon";
import { Check, Repeat, Sparkles, Trash2 } from "lucide-react";
import { tones } from "@/lib/utils";
import { useOnClickOutside } from "usehooks-ts";

export interface DataProps {
  text: string;
  addHeading: boolean;
  tone?: AiTone;
  textUnit?: string;
  textLength?: string;
  language?: string;
}

export const AiWriterView = ({
  editor,
  node,
  getPos,
  deleteNode,
}: NodeViewWrapperProps) => {
  const { channelId, folderId, teamId } = useParams<{
    channelId: string;
    teamId: string;
    folderId: string;
  }>();

  const { workspaceId } = useCurrentWorkspace();

  const [data, setData] = useState<DataProps>({
    text: "",
    tone: undefined,
    textLength: undefined,
    addHeading: false,
    language: undefined,
  });
  const [previewText, setPreviewText] = useState<string | undefined>(undefined);
  const [isFetching, setIsFetching] = useState(false);
  const textareaId = useMemo(() => nanoid(), []);

  const generateText = useCallback(async () => {
    const { text: dataText } = data;

    if (!data.text) {
      toast.error("Please enter a description");

      return;
    }

    if (!workspaceId) {
      return;
    }

    setIsFetching(true);

    const payload: Prompt = {
      prompt: dataText,
    };

    try {
      const eventSource = new EventSource(
        `${env.NEXT_PUBLIC_BACKEND_DOMAIN}/parties/page/${channelId}/prompt/${btoa(payload.prompt)}`,
      );

      // Add event listeners to handle different types of events
      eventSource.addEventListener("message", function (event) {
        // Handle message event

        if (event.data === "[DONE]") {
          setIsFetching(false);
          return eventSource.close();
        }
        const { response } = JSON.parse(event.data);

        setPreviewText((t) => (t ? t + response : response)?.trim());
      });

      eventSource.addEventListener("error", function (event) {
        setIsFetching(false);
        toast.error("Failed to fetch prompt");
      });
    } catch (errPayload: any) {
      const errorMessage = errPayload?.response?.data?.error;
      const message =
        errorMessage !== "An error occurred"
          ? `An error has occurred: ${errorMessage}`
          : errorMessage;

      setIsFetching(false);
      toast.error(message);
    }
  }, [data, workspaceId]);

  const insert = useCallback(() => {
    const from = getPos();
    const to = from + node.nodeSize;

    editor.chain().focus().insertContentAt({ from, to }, previewText).run();
  }, [editor, previewText, getPos, node.nodeSize]);

  const discard = useCallback(() => {
    deleteNode();
  }, [deleteNode]);

  const onTextAreaChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setData((prevData) => ({ ...prevData, text: e.target.value }));
    },
    [],
  );

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => {
    if (!isFetching && !previewText) discard();
  });

  return (
    <NodeViewWrapper data-drag-handle>
      <Panel noShadow className="w-full " ref={ref}>
        <div className="flex flex-col bg-dim p-1">
          {previewText && (
            <>
              <PanelHeadline>Preview</PanelHeadline>
              <div
                className="relative mb-4 ml-2.5 max-h-[14rem] overflow-y-auto border-l-4 border-neutral-100 bg-white px-4 text-base text-black dark:border-neutral-700 dark:bg-black dark:text-white"
                dangerouslySetInnerHTML={{ __html: previewText }}
              />
            </>
          )}
          <div className="flex flex-row items-center justify-between gap-1">
            <PanelHeadline asChild>
              <label htmlFor={textareaId}>Prompt</label>
            </PanelHeadline>
          </div>
          <Textarea
            id={textareaId}
            value={data.text}
            onChange={onTextAreaChange}
            placeholder={"Tell me what you want me to write about."}
            required
            className="mb-2"
          />
          <div className="flex flex-row items-center justify-between gap-1">
            <div className="flex w-auto justify-between gap-1"></div>
            <div className="flex w-auto justify-between gap-1">
              {true && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-red-500 hover:bg-red-500/10 hover:text-red-500"
                  onClick={discard}
                >
                  <Icon Icon={Trash2} className="mr-1 shrink-0" />
                  Discard
                </Button>
              )}
              {previewText && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={insert}
                  disabled={!previewText}
                >
                  <Icon Icon={Check} className="mr-1 shrink-0" />
                  Insert
                </Button>
              )}
              <Button
                size="sm"
                variant="default"
                onClick={() => {
                  if (previewText) setPreviewText(undefined);
                  generateText();
                }}
                disabled={isFetching || data.text === ""}
                style={{ whiteSpace: "nowrap" }}
                isPending={isFetching}
                className="w-36"
              >
                {previewText ? (
                  <Icon Icon={Repeat} className="mr-1 shrink-0" />
                ) : (
                  <Icon Icon={Sparkles} className="mr-1 shrink-0" />
                )}
                {previewText ? "Regenerate" : "Generate text"}
              </Button>
            </div>
          </div>
        </div>
      </Panel>
    </NodeViewWrapper>
  );
};
