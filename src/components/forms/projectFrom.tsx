import { Dialog } from "radix-ui"
import { type ReactNode, useEffect, useState } from "react"
import type { IProject } from "../../scripts/types"
import { Button } from "../elements/buttons"
import { DateInput, Input } from "../elements/inputs"
import { toast } from "react-toastify"

interface IProjectFormProps {
    project: IProject,
    setProject: (project: IProject)=> void,
    triggerChild?: boolean
    children: ReactNode
}

export default function ProjectForm({project, setProject, triggerChild, children}: IProjectFormProps){
  const [formState, setFormState] = useState({ title: project.title, startDate: project.startDate.toLocaleString(), endDate: project.endDate? project.endDate.toLocaleString() : "", total: project.total.toString() });

    useEffect(() => {
        setFormState({title: project.title, startDate: project.startDate.toLocaleString(), endDate: project.endDate? project.endDate.toLocaleString() : "", total: project.total.toString()})
    }, [project])

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild={triggerChild}>
                {children}
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className={"fixed inset-0 w-screen h-screen bg-gray-500/40"}/>
                <Dialog.Content  className={"absolute bg-white p-6 rounded-md max-w-md top-1/2 left-1/2 -translate-1/2"}>
                    <Dialog.Title className="font-bold text-xl">
                        Formulario de Projecto
                    </Dialog.Title>
                    <form className="grid gap-2 px-2 py-4" onSubmit={(e)=> e.preventDefault()}>
                      <fieldset>
                        <legend>Titulo</legend>
                        <Input
                        value={formState.title}
                        placeHolder="Titulo"
                        onChange={(props)=> {
                          setFormState({...formState, title: props.target.value})
                        }}
                        />
                      </fieldset>
                      <fieldset>
                        <legend>Fecha de entrega</legend>
                        <DateInput
                        value={formState.endDate}
                        placeHolder="Fecha de entrega"
                        onChange={(props)=> {
                          setFormState({...formState, endDate: props.target.value})
                        }}
                        />
                      </fieldset>
                      <fieldset>
                        <legend>Monto</legend>
                        <Input
                        type="number"
                        value={formState.total}
                        placeHolder="Valor"
                        onChange={(props)=> {
                          setFormState({...formState, total: props.target.value})
                        }}
                        />
                      </fieldset>
                    </form>
                    <footer className="flex gap-2 justify-end">
                      <Dialog.Close asChild>
                        <Button variant="error">Cancelar</Button>
                      </Dialog.Close>
                      <Dialog.Close asChild>
                        <Button
                          onClick={()=> {
                            const total= Number.parseFloat(formState.total)
                                    setProject({
                                        ...project,
                                        projectId: project.projectId?? Date.now().toString(),
                                        title: formState.title,
                                        endDate: formState.endDate? new Date(formState.endDate) : undefined,
                                        total: Number.isNaN(total)? 0 : total,
                                    });
                                    toast.success("Proyecto Guardado");
                                }}
                            >Aceptar</Button>
                        </Dialog.Close>
                    </footer>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
