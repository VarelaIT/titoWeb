import type { ColumnDef } from "@tanstack/react-table";
import { Button, TriggerButton } from "../elements/buttons";
import { Page } from "../elements/pages";
import { Table, TableBody, TableHead } from "../elements/tables/table";
import ProjectForm from "../forms/projectFrom";
import { useProject } from "../providers/project.provider";
import type { WindowMeasurements } from "../../scripts/windowsMeasurement";
import { WindowFormModal } from "../elements/dialogs/modal";
import { Plus, Trash } from "lucide-react";
import { toast } from "react-toastify";
import { STORAGE_CONSTANTS, type ITableStyles } from "../../scripts/types";
import ProjectSelector from "../blocks/projectSelector";
import { loadProject } from "../../scripts/utils";
import { PRESETS_STORAGE } from "../../scripts/presetStorage";

export default function Dashboard() {
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
  const defaultColumnConf = {
    enableColumnFilter: true,
    enableGrouping: true,
  };
  const columns: ColumnDef<WindowMeasurements>[] = [
    {
      ...defaultColumnConf,
      id: "Acciones",
      header: () => <WindowFormModal asChild >
        <TriggerButton
          title="Agregar"
          variant="transparent"
          onClick={() => console.log()}
        >
          <Plus size={16} className="text-blue-600" />
        </TriggerButton>
      </WindowFormModal>,
      pinned: "left",
      cell: ({ row }) => <div className="sticky left-0">
        <Button
          title="Eliminar"
          variant="transparent"
          className="text-gray-600 hover:text-red-500"
          onClick={() => {
            console.log(row)
            setProject({ ...project, items: project.items?.filter((item) => item !== row.original) });
            toast.warn("Articulo eliminado");
          }}
        >
          <Trash size={16} />
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
  ];

  const { project, setProject } = useProject();

  function deleteProject(projectId: string) {
    PRESETS_STORAGE.remove(STORAGE_CONSTANTS.PROJECTS, projectId);
    setProject(loadProject());
  }

return (
      <Page className="grid grid-cols-[auto_2fr_auto] grid-rows-[auto_1fr] gap-4" >
        <div className="col-start-2 col-end-3">
          <header className="w-full">
            <div className="flex justify-between">
              <h2 className={"text-2xl font-bold"}>{project.title}</h2>
              <div className="flex gap-2">
                <ProjectForm project={project} setProject={setProject} triggerChild={true}>
                  <Button variant="primary">Editar</Button>
                </ProjectForm>
                <Button variant="error" onClick={() => deleteProject(project.projectId)}>Eliminar</Button>
              </div>
            </div>
            <p>Dia: {project.date.toLocaleDateString()}</p>
            <p>Monto: RD{new Intl.NumberFormat("en-IN", { style: "currency", currency: "USD" }).format(project.total)}</p>
          </header>
        </div>
        <div className="row-start-1 row-end-3 col-span-1">
          <h2 className="text-2xl font-bold">Sidebar</h2>
        </div>
        <div className="row-start-2 col-start-2">
          <article className="overflow-auto shadow-lg rounded-md border border-gray-300">
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
        </div>
        <div className="row-start-1 row-end-3">
          <ProjectSelector/>
        </div>
      </Page>
    );
}
