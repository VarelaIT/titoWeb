import { Dialog } from "radix-ui";
import type { IProject } from "../../scripts/types";
import { Button } from "../elements/buttons";
import { Input } from "../elements/inputs";
import { Page } from "../elements/pages";
import { useProject } from "../providers/project.provider";
import { useMemo, useState, type ReactNode } from "react";
import "../../styles/dialog.css"
import { Table, TableBody, TableHead } from "../elements/tables/table";
import { WindowMeasurements } from "../../scripts/windowsMeasurement";
import type { ColumnDef } from "@tanstack/react-table";


export default function ProjectPage({style}: {style: string}){
  const defaultColumnConf = {
    enableColumnFilter: true,
    enableGrouping: true,
  };
  const {project, setProject} = useProject();
  const columns = useMemo<ColumnDef<WindowMeasurements>[]>(()=> {
    return [
      {
        ...defaultColumnConf,
        header: "Tipo",
        accessorKey: "type",
      },
      {
        ...defaultColumnConf,
        header: "Base",
        accessorKey: "base",
      },
      {
        ...defaultColumnConf,
        header: "Altura",
        accessorKey: "height",
      },
      {
        ...defaultColumnConf,
        header: "Paneles",
        accessorKey: "panels",
      },
      {
        ...defaultColumnConf,
        header: "Rieles",
        accessorFn: (row)=> row.getRails(),
      },
      {
        ...defaultColumnConf,
        header: "Laterales",
        accessorFn: (row)=> row.getLaterals(),
      },
      {
        ...defaultColumnConf,
        header: "Alfaisal",
        accessorFn: (row)=> row.getAlfaisal(),
      },
      {
        ...defaultColumnConf,
        header: "Jambas",
        accessorFn: (row)=> row.getJambas(),
      },
      {
        ...defaultColumnConf,
        header: "Base de Cristal",
        accessorFn: (row)=> row.getGlassBase(),
      },
      {
        ...defaultColumnConf,
        header: "Altura de Cristal",
        accessorFn: (row)=> row.getGlassHeigth(),
      },
    ]
  }, [project.items])

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
        <div className="py-4">
          {project.items&&
            <Table
              data={project.items}
              columns={columns}
            >
              <TableHead/>
              <TableBody/>
            </Table>
          }
        </div>
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
    const [formState, setFormState] = useState({title: project.title, date: project.date.toISOString(), total: project.total.toString()})

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild={triggerChild}>
                {children}
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className={"fixed inset-0 w-screen h-screen bg-gray-500/40"}/>
                <Dialog.Content  className={"absolute bg-white p-6 rounded-md max-w-md top-1/2 left-1/2 -translate-1/2"}>
                    <Dialog.Title className="font-bold text-xl">
                        Editar Projecto
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
                            <Button variant="error">Cerrar</Button>
                        </Dialog.Close>
                        <Dialog.Close asChild>
                            <Button
                                onClick={()=> {
                                    const total= Number.parseFloat(formState.total)
                                    setProject({
                                        ...project,
                                        title: formState.title,
                                        date: new Date(formState.date),
                                        total: Number.isNaN(total)? 0 : total,
                                    });
                                }}
                            >editar</Button>
                        </Dialog.Close>
                    </footer>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
