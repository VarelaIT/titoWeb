import { Dialog } from "radix-ui";
import type { IProject } from "../../scripts/types";
import { Button } from "../elements/buttons";
import { Input } from "../elements/inputs";
import { Page } from "../elements/pages";
import { useProject } from "../providers/project.provider";
import { type ReactNode } from "react";
import "../../styles/dialog.css"


export default function ProjectPage({style}: {style: string}){
    const {project, setProject} = useProject();

    return (
        <section>
            <Page>
                <header className="flex justify-between w-full">
                    <h2 className={"text-2xl font-bold"}>{project.title}</h2>
                    <ProjectForm project={project} setProject={setProject} triggerChild={true}>
                        <Button variant="primary">Editar</Button>
                    </ProjectForm>
                </header>
                <article>
                    <p>Dia: {project.date.toLocaleDateString()}</p>
                    <p>Monto: RD{new Intl.NumberFormat("en-IN", { style: "currency", currency: "USD" }).format(project.total)}</p>

                </article>
            </Page>
        </section>
    )
}

interface IProjectFormProps {
    project: IProject, 
    setProject: (project: IProject)=> void, 
    triggerChild?: boolean
    children: ReactNode
}
function ProjectForm({project, setProject, triggerChild, children}: IProjectFormProps){

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild={triggerChild}>
                {children}
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className={"DialogOverlay"}/>
                <Dialog.Content className={"DialogContent"}>
                    <Dialog.Title>
                        Editar Projecto
                    </Dialog.Title>
                    <form className="grid gap-2" onSubmit={(e)=> e.preventDefault()}>
                        <Input value={project.title} onChange={(props)=> {
                            console.log(props)
                        }}/>
                        <Dialog.Close asChild>
                            <Button>Editar</Button>
                        </Dialog.Close>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}