import { Dialog } from "radix-ui";
import { Button } from "../buttons";
import { X } from "lucide-react";

interface IPromptModalProps {
  content: { title: string; message: string};
  children: React.ReactNode;
  asChild?: boolean;
  variant?: string;
  onAccept?: () => void;
  onCancel?: () => void;
}

export default function PromptModal({ content, children, asChild, variant, onAccept, onCancel }: IPromptModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild={asChild}>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
        className={"fixed inset-0 w-screen h-screen bg-gray-500/40"}
        />
        <Dialog.Content
          className={
            "absolute bg-white p-6 rounded-md max-w-md top-1/2 left-1/2 -translate-1/2 "
            + "grid gap-4"
          }
          onInteractOutside={(e) => e.preventDefault()}
        >
          <header className="flex justify-between items-center">
            <Dialog.Title className="font-bold text-xl">{content.title}</Dialog.Title>
            <Dialog.Close>
              <Button variant="transparent">
                <X size={18}/>
              </Button>
            </Dialog.Close>
          </header>
          <Dialog.Description>{content.message}</Dialog.Description>
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
