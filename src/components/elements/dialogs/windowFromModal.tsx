import { Dialog } from "radix-ui";
import { useForm } from "@tanstack/react-form";
import { Input } from "../inputs";
import { Button } from "../buttons";
import { toast } from "react-toastify";
import type { TWindow } from "../../../scripts/types";
import { WINDOW_SCHEMA } from "../../../scripts/zodSchemas";
import { calcWindow } from "../../../scripts/utils";
import { ChevronDown, XIcon } from "lucide-react";
import { useProject } from "../../providers/project.provider";
import { Dropdown } from "../dropdown/dropdown";
import { useEffect } from "react";

interface IWindowFormModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function FieldError({ errors }: { errors: unknown[] }) {
  const message = errors
    .map((error) =>
      typeof error === "string"
        ? error
        : (error as { message?: string } | undefined)?.message,
    )
    .find(Boolean);

  if (!message) return null;

  return <p className="w-full text-sm text-red-600">{message}</p>;
}

export function WindowFormModal({ open, setOpen }: IWindowFormModalProps) {
  const { project, setProject } = useProject();
  const form = useForm({
    // NaN marks an empty numeric field, so the schema rejects it until it is filled.
    defaultValues: {
      type: undefined,
      base: Number.NaN,
      height: Number.NaN,
      panels: 2,
    } as unknown as TWindow,
    validators: { onChange: WINDOW_SCHEMA },
    onSubmit: ({ value }) => {
      const measurements = calcWindow(value);
      setProject({
        ...project,
        items: project.items ? [...project.items, measurements] : [measurements],
      });
      toast.success("Ventana agregada.");
    },
    onSubmitInvalid: () => {
      toast.error("Revisa los datos de la ventana.");
    },
  });

  const typeOptions = [
    { value: undefined, label: "Seleciona un tipo" },
    { value: "classic", label: "Clasica" },
    { value: "p-65", label: "P-65" },
  ];

  useEffect(()=> {
    if (!open) form.reset();
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={"fixed inset-0 w-screen h-screen bg-gray-500/40"}
        />
        <Dialog.Content
          className={
            "absolute bg-white p-6 rounded-md max-w-md top-1/2 left-1/2 -translate-1/2"
          }
          onInteractOutside={(e) => e.preventDefault()}
        >
          <header className="flex justify-between">
            <Dialog.Title className="font-bold text-xl">
              Agregar Ventana
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="transparent" className="px-1 py-1">
                <XIcon className="text-red-600" size={18} />
              </Button>
            </Dialog.Close>
          </header>
          <form
            className="grid gap-2 px-2 py-4"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.Field name="type">
              {(field) => (
                <fieldset className="relative flex justify-right gap-2 flex-wrap">
                  <legend>Tipo</legend>
                  <Dropdown
                    asChild
                    options={typeOptions}
                    onChange={(option) => field.handleChange(option.value as TWindow["type"])}
                  >
                    <Button
                      variant={field.state.value === "classic" ? "cyan" : field.state.value === "p-65" ? "success" : undefined}
                      className={"w-full flex items-center justify-between! border-2 border-stone-800 dark:border-stone-400 text-stone-800 dark:text-stone-400 "}
                    >
                      <span>{typeOptions.find((o) => o.value === field.state.value)?.label}</span>
                      <ChevronDown size={18} />
                    </Button>
                  </Dropdown>
                  <FieldError errors={field.state.meta.errors} />
                </fieldset>
              )}
            </form.Field>
            <form.Field name="base">
              {(field) => (
                <fieldset className="flex justify-right gap-2 flex-wrap">
                  <legend>Base</legend>
                  <Input
                    type="number"
                    pattern="\d+|\d+\.\d+"
                    value={Number.isNaN(field.state.value) ? "" : field.state.value}
                    onChange={(e) => field.handleChange(parseFloat(e.target.value))}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </fieldset>
              )}
            </form.Field>
            <form.Field name="height">
              {(field) => (
                <fieldset className="flex justify-right gap-2 flex-wrap">
                  <legend>Altura</legend>
                  <Input
                    type="number"
                    pattern="\d+|\d+\.\d+"
                    value={Number.isNaN(field.state.value) ? "" : field.state.value}
                    onChange={(e) => field.handleChange(parseFloat(e.target.value))}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </fieldset>
              )}
            </form.Field>
            {/**
              Un-used field
            <form.Field name="panels">
              {(field) => (
                <fieldset className="flex justify-right gap-2 flex-wrap">
                  <legend>Paneles</legend>
                  <Input
                    type="number"
                    pattern="\d"
                    value={Number.isNaN(field.state.value) ? "" : field.state.value}
                    onChange={(e) => field.handleChange(parseInt(e.target.value))}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </fieldset>
              )}
            </form.Field>
            */}
          </form>
          <footer className="flex gap-2 justify-end">
            <Button variant="error" onClick={() => form.reset()}>
              Borrar
            </Button>
            <Button onClick={() => form.handleSubmit()}>Guardar</Button>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
