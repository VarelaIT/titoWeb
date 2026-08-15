import { Dialog } from "radix-ui";
import { Button } from "../buttons";
import { X } from "lucide-react";
import { usePrompt } from "../../providers/prompt.provider";
import { useMemo, useState } from "react";
import type { IPromptProps } from "../../../scripts/utils";

export default function PromptModal() {
  const [open, setOpen] = useState(false);
  const { prompt } = usePrompt();

  const { content, onAccept, onCancel } = useMemo<IPromptProps>(() => {
    if (!prompt) return { content: { title: "", message: "" }, onAccept: () => {}, onCancel: () => {} };
    setOpen(true);
    return prompt;
  }, [prompt]);

  const { headerStyle, bodyStyle } = useMemo<{ headerStyle: string; bodyStyle: string }>(() => {
    switch (prompt?.variant) {
      case "error":
        return {
          headerStyle: "text-red-500 dark:text-red-300",
          bodyStyle: "bg-red-50 dark:bg-red-950",
        };
      case "warning":
        return {
          headerStyle: "text-yellow-500",
          bodyStyle: "bg-yellow-50",
        };
      default:
        return {
          headerStyle: "",
          bodyStyle: "bg-white",
        };
    };
  }, [prompt]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen} >
      <Dialog.Portal>
        <Dialog.Overlay
        className={"fixed inset-0 w-screen h-screen bg-gray-500/40"}
        />
        <Dialog.Content
          className={
            "absolute p-6 rounded-md max-w-md top-1/2 left-1/2 -translate-1/2 grid gap-4 "
            + bodyStyle
          }
          onInteractOutside={(e) => e.preventDefault()}
        >
          <header className={"flex justify-between items-center " + headerStyle}>
            <Dialog.Title className="font-bold text-xl">{content.title}</Dialog.Title>
            <Dialog.Close>
              <Button variant="transparent">
                <X size={18}/>
              </Button>
            </Dialog.Close>
          </header>
          <Dialog.Description className="dark:text-stone-50">{content.message}</Dialog.Description>
          <div className="flex justify-end gap-4">
            {onCancel &&
              <Dialog.Close>
                <Button variant="error"
                  onClick={()=> onCancel()}
                >Cancelar</Button>
              </Dialog.Close>
            }
            <Dialog.Close>
              <Button variant="primary"
                onClick={()=> onAccept&& onAccept()}
              >Aceptar</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
