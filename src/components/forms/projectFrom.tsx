import { Dialog } from "radix-ui"
import { type ReactNode, useEffect, useState } from "react"
import type { IProject } from "../../scripts/types"
import { Button } from "../elements/buttons"
import { DateInput, Input } from "../elements/inputs"
import { toast } from "react-toastify"
import { PROJECT_FORM_SCHEMA} from "../../scripts/zodSchemas"
import { useForm } from "@tanstack/react-form";
import { FieldError } from "./fieldError"

interface IProjectFormProps {
    project: IProject,
    setProject: (project: IProject)=> void,
    triggerChild?: boolean
    children: ReactNode
}

export default function ProjectForm({project, setProject, triggerChild, children}: IProjectFormProps){
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      title: project.title,
      startDate: project.startDate,
      endDate: project.endDate,
      total: project.total
    },
    validators: { onChange: PROJECT_FORM_SCHEMA },
    onSubmit: ({ value }) => {
      setProject({
        ...project,
        title: value.title,
        startDate: value.startDate,
        endDate: value.endDate,
        total: value.total
      });
      form.reset();
      toast.success("Projecto Guardado");
      setOpen(false);
    },
    onSubmitInvalid: () => {
      toast.error("Error al guardar el proyecto");
    },
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild={triggerChild}>
        {children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={"fixed inset-0 w-screen h-screen bg-gray-500/40 z-10"}/>
        <Dialog.Content  className={"absolute bg-stone-50 dark:bg-stone-600 p-6 rounded-md max-w-md top-1/2 left-1/2 -translate-1/2 z-20 dark:text-stone-50"}>
          <Dialog.Title className="font-bold text-xl">
            Formulario de Projecto
          </Dialog.Title>
          <form className="grid gap-2 px-2 py-4"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.Field name="title">
              {(field) =>
                <fieldset>
                  <legend>Titulo</legend>
                  <Input
                  value={field.state.value}
                  placeHolder="Titulo"
                  onChange={(e)=> {
                    field.handleChange(e.target.value);
                  }}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </fieldset>
              }
            </form.Field>
            <form.Field name="endDate">
              {(field) =>
                <fieldset>
                  <legend>Fecha de entrega</legend>
                  <DateInput
                    value={field.state.value}
                    onChange={(props)=> {
                      field.handleChange(props);
                    }}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </fieldset>
              }
            </form.Field>
            <form.Field name="total">
              {(field) =>
                <fieldset>
                  <legend>Monto</legend>
                  <Input
                    type="number"
                    value={isNaN(field.state.value) ? "" : field.state.value}
                    placeHolder="0.00"
                    onChange={(props)=> {
                      field.handleChange(Number.parseFloat(props.target.value));
                    }}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </fieldset>
              }
            </form.Field>
          </form>
          <footer className="flex gap-2 justify-end">
            <Dialog.Close asChild>
              <Button variant="error"
                onClick={()=> {
                  form.reset();
                }}
              >Cancelar</Button>
            </Dialog.Close>
            <Button
              onClick={()=> {
                form.handleSubmit();
              }}
            >Aceptar</Button>
          </footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
