import { Dialog } from "radix-ui";
import { useState, type ReactNode } from "react";
import { Input } from "../inputs";
import { Button } from "../buttons";
import { toast } from "react-toastify";

interface IWindowFormModalProps {
  triggerChild?: boolean;
  children: ReactNode;
}

export function WindowFormModal({
  triggerChild,
  children,
}: IWindowFormModalProps) {
  const [formState, setFormState] = useState<{
    type: "clasic" | "p-65" | null;
    base: string;
    height: string;
  }>({
    type: null,
    base: '',
    height: '',
  });

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild={triggerChild}>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className={"fixed inset-0 w-screen h-screen bg-gray-500/40"}
        />
        <Dialog.Content
          className={
            "absolute bg-white p-6 rounded-md max-w-md top-1/2 left-1/2 -translate-1/2"
          }
        >
          <Dialog.Title className="font-bold text-xl">
            Agregar Ventana
          </Dialog.Title>
          <form
            className="grid gap-2 px-2 py-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <fieldset className="flex justify-right gap-2">
              <label>Base</label>
              <Input
                type="number"
                pattern="\d+|\d+\.\d+"
                value={formState.base}
                onChange={(props) => {
                  setFormState({ ...formState, base: props.target.value });
                  console.log(formState, props.target.value);
                }}
              />
            </fieldset>
            <fieldset className="flex justify-right gap-2">
              <label>Altura</label>
              <Input
                type="number"
                pattern="\d+|\d+\.\d+"
                value={formState.height}
                onChange={(props) => {
                  setFormState({ ...formState, base: props.target.value });
                  console.log(formState, props.target.value);
                }}
              />
            </fieldset>
          </form>
          <footer className="flex gap-2 justify-end">
            <Dialog.Close asChild>
              <Button variant="error">Cancelar</Button>
            </Dialog.Close>
            <Button
              onClick={() => {
                toast.success("Ventana Agregada.");
              }}
            >
              Aceptar
            </Button>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}