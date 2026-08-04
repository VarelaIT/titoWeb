import { Dialog } from "radix-ui"
import { type ReactNode, useEffect, useState } from "react"
import type { IProject } from "../../scripts/types"
import { Button } from "../elements/buttons"
import { Input } from "../elements/inputs"

interface IProjectFormProps {
    project: IProject,
    setProject: (project: IProject)=> void,
    triggerChild?: boolean
    children: ReactNode
}

export default function ProjectForm({project, setProject, triggerChild, children}: IProjectFormProps){
    const [formState, setFormState] = useState({title: project.title, date: project.date.toISOString(), total: project.total.toString()})

    useEffect(() => {
        setFormState({title: project.title, date: project.date.toISOString(), total: project.total.toString()})
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
                        <Input
                            value={formState.title}
                            onChange={(props)=> {
                                setFormState({...formState, title: props.target.value})
                            }}
                        />
                        <Input
                            type={"datetime"}
                            value={formState.date}
                            onChange={(props)=> {
                                setFormState({...formState, date: props.target.value})
                            }}
                        />
                        <Input
                            type="number"
                            value={formState.total}
                            onChange={(props)=> {
                                setFormState({...formState, total: props.target.value})
                            }}
                        />
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
                                        date: new Date(formState.date),
                                        total: Number.isNaN(total)? 0 : total,
                                    });
                                }}
                            >Aceptar</Button>
                        </Dialog.Close>
                    </footer>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
