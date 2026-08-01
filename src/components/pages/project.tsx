import { Dialog } from "radix-ui";
import { STORAGE_CONSTANTS, type IOption, type IProject, type ITableStyles } from "../../scripts/types";
import { Button, TriggerButton } from "../elements/buttons";
import { Input } from "../elements/inputs";
import { Page } from "../elements/pages";
import { useProject } from "../providers/project.provider";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import "../../styles/dialog.css"
import { Table, TableBody, TableHead } from "../elements/tables/table";
import { WindowMeasurements } from "../../scripts/windowsMeasurement";
import type { ColumnDef } from "@tanstack/react-table";
import { Dropdown } from "../elements/dropdown/dropdown";
import { PRESETS_STORAGE, type IStoragePreset } from "../../scripts/presetStorage";
import { ChevronDown, Plus, Trash } from "lucide-react";
import { WindowFormModal } from "../elements/dialogs/modal";


export default function ProjectPage({style}: {style: string}){
  const defaultColumnConf = {
    enableColumnFilter: true,
    enableGrouping: true,
  };
  const {project, setProject} = useProject();
  const tableStyles: ITableStyles = {
    head: {
      container: "",
      row: "shadow-md p-0 m-0 bg-gray-100",
      cell: "font-medium p-2 m-0 border-r border-gray-200 truncate",
    },
    body: {
      container: "",
      row: "border-b border-gray-200 hover:bg-gray-300 even:bg-gray-100",
      cell: "p-2 border-r border-gray-200",
    },
    footer: {
      container: "",
      row: "",
      cell: "",
    }
  };

  const columns = useMemo<ColumnDef<WindowMeasurements>[]>(() => {
    return [
      {
        ...defaultColumnConf,
        id: "Acciones",
        header: () => <WindowFormModal >
          <TriggerButton
            title="Agregar"
            variant="transparent"
            onClick={() => console.log()}
          >
            <Plus size={16} className="text-blue-600"/>
          </TriggerButton>
        </WindowFormModal>,
        pinned: "left",
        cell: ({row}) => <div className="sticky left-0">
          <Button
            title="Eliminar"
            variant="transparent"
            onClick={() => console.log(row)}
          >
            <Trash size={16} className="text-red-500" />
          </Button>
        </div>,
      },
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
        accessorFn: (row) => row.getRails(),
      },
      {
        ...defaultColumnConf,
        header: "Laterales",
        accessorFn: (row) => row.getLaterals(),
      },
      {
        ...defaultColumnConf,
        header: "Alfaisal",
        accessorFn: (row) => row.getAlfaisal(),
      },
      {
        ...defaultColumnConf,
        header: "Jambas",
        accessorFn: (row) => row.getJambas(),
      },
      {
        ...defaultColumnConf,
        header: "Base de Cristal",
        accessorFn: (row) => row.getGlassBase(),
      },
      {
        ...defaultColumnConf,
        header: "Altura de Cristal",
        accessorFn: (row) => row.getGlassHeigth(),
      },
    ]
  }, [project.items]);


  return (
    <section>
      <Page>
        <header className="flex justify-between w-full">
          <h2 className={"text-2xl font-bold"}>{project.title}</h2>
          <div className="flex gap-2">
            <ProjectForm project={project} setProject={setProject} triggerChild={true}>
              <Button variant="primary">Editar</Button>
            </ProjectForm>
            <ProjectSelector />
            <ProjectForm project={{ title: "", date: new Date(), total: 0}} setProject={setProject} triggerChild={true}>
              <Button variant="emerald">Crear</Button>
            </ProjectForm>
          </div>
        </header>
        <article>
          <p>Dia: {project.date.toLocaleDateString()}</p>
          <p>Monto: RD{new Intl.NumberFormat("en-IN", { style: "currency", currency: "USD" }).format(project.total)}</p>
        </article>
        <article className="overflow-auto shadow-lg rounded-md border border-gray-300 mt-4">
          {project.items&&
            <Table
              data={project.items}
              columns={columns}
              styles={tableStyles}
            >
              <TableHead/>
              <TableBody/>
            </Table>
          }
        </article>
      </Page>
    </section>
  )
}

function ProjectSelector(){
  const projects = PRESETS_STORAGE.get(STORAGE_CONSTANTS.PROJECTS);
  const {project, setProject} = useProject();
  const [options, setOptions] = useState<IOption[]>(loadProjectOptions());

  useEffect(() => {
    setOptions(loadProjectOptions());
  }, [project]);

  function loadProjectOptions(): IOption[] {
    if (projects) {
      return projects.map((p: IStoragePreset) => ({ value: p.key, label: p.key }));
    }
    return [];
  }

  return (
    <Dropdown
      options={options}
      defaultValue={project.title}
      onChange={(option) => {
        const selectedProject = projects?.find(p => p.key === option.value);
        if (selectedProject) {
          const projectValue = selectedProject.value as unknown as IProject;
          setProject({
            title: option.label,
            date: new Date(projectValue.date),
            total: projectValue.total,
            items: projectValue.items?.map((item) => new WindowMeasurements({
              type: item.type,
              base: item.base,
              height: item.height,
              panels: item.panels,
            })),
          });
        }
      }}
    >
      <TriggerButton>
        <span>Seleccionar Projecto</span>
        <ChevronDown/>
      </TriggerButton>
    </Dropdown>
  );
}

interface IProjectFormProps {
    project: IProject,
    setProject: (project: IProject)=> void,
    triggerChild?: boolean
    children: ReactNode
}

function ProjectForm({project, setProject, triggerChild, children}: IProjectFormProps){
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
