import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "../elements/buttons";
import { Table, TableBody, TableHead } from "../elements/tables/table";
import ProjectForm from "../forms/projectFrom";
import { useProject } from "../providers/project.provider";
import { WindowMeasurements } from "../../scripts/windowsMeasurement";
import { WindowFormModal } from "../elements/dialogs/windowFromModal";
import { Pen, Plus, Printer, Trash } from "lucide-react";
import { toast } from "react-toastify";
import { STORAGE_CONSTANTS, type ITableStyles } from "../../scripts/types";
import ProjectSelector from "../blocks/projectSelector";
import { loadProject, printProject } from "../../scripts/utils";
import { PRESETS_STORAGE } from "../../scripts/presetStorage";
import { usePrompt } from "../providers/prompt.provider";
import { useState } from "react";

export default function Dashboard() {
  const tableStyles: ITableStyles = {
    head: {
      container: "",
      row: "p-0 m-0 bg-gray-100 dark:bg-gray-800 ",
      cell: "font-medium p-2 m-0 border-r border-b border-gray-200 truncate bg-gray-100 dark:bg-stone-700",
    },
    body: {
      container: "",
      row: "dark:bg-stone-800 hover:bg-gray-300 bg-white dark:hover:bg-stone-500 even:bg-gray-100 dark:even:bg-stone-700",
      cell: "p-2 border-b border-r border-gray-200 ",
    },
    footer: {
      container: "",
      row: "",
      cell: "",
    }
  };
  const [openWindowForm, setOpenWindowForm] = useState(false);
  const defaultColumnConf = {
    enableColumnFilter: true,
    enableGrouping: true,
  };
  const columns: ColumnDef<WindowMeasurements>[] = [
    {
      ...defaultColumnConf,
      id: "Acciones",
      enablePinning: true,
      header: ({table}) => (
        <div className="flex gap-2">
          <Button
            title="Agregar"
            variant="transparent"
            onClick={() => setOpenWindowForm(true)}
          >
            <Plus size={16} className="text-green-600 dark:text-green-400" />
          </Button>
          <Button
            title="Imprimir"
            variant="transparent"
            onClick={() => printProject(
              project,
              table.getRowModel().rows.map((row) => new WindowMeasurements({ ...row.original }))
            )}
          >
            <Printer size={16} className="text-blue-600 dark:text-blue-400" />
          </Button>
        </div>
      ),
      cell: ({ row }) => <div className="sticky left-0 h-full w-full">
        <Button
          title="Eliminar"
          variant="transparent"
          className="text-gray-600 hover:text-red-600 dark:text-red-400"
          onClick={() => {
            setPrompt({
              content: {
                title: `Eliminar Articulo ${row.original.type} ${row.original.base} x ${row.original.height}`,
                message: "¿Estás seguro de que deseas eliminar este articulo?"
              },
              variant: "error",
              onCancel: () => { },
              onAccept: () => {
                setProject({ ...project, items: project.items?.filter((item) => item !== row.original) });
                toast.warn("Articulo eliminado");
              }
            })
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
      cell: ({ cell }) => (cell.getValue() as number).toFixed(2),
    },
    {
      ...defaultColumnConf,
      header: "Altura",
      accessorKey: "height",
      cell: ({ cell }) => (cell.getValue() as number).toFixed(2),
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
      cell: ({ cell }) => (cell.getValue() as number).toFixed(2),
    },
    {
      ...defaultColumnConf,
      header: "Laterales",
      accessorFn: (row) => row.getLaterals(),
      cell: ({ cell }) => (cell.getValue() as number).toFixed(2),
    },
    {
      ...defaultColumnConf,
      header: "Alfaisal",
      accessorFn: (row) => row.getAlfaisal(),
      cell: ({ cell }) => (cell.getValue() as number).toFixed(2),
    },
    {
      ...defaultColumnConf,
      header: "Jambas",
      accessorFn: (row) => row.getJambas(),
      cell: ({ cell }) => (cell.getValue() as number).toFixed(2),
    },
    {
      ...defaultColumnConf,
      header: "Cristal",
      accessorFn: (row) => row.getGlassDimentions(),
    },
  ];




  const { project, setProject } = useProject();
  const { setPrompt } = usePrompt();

  function deleteProject(projectId: string) {
    PRESETS_STORAGE.remove(STORAGE_CONSTANTS.PROJECTS, projectId);
    setProject(loadProject());
    toast("Proyecto eliminado.");
  }

return (
      <section className="grid grid-cols-[2fr_auto] gap-4 " >
        <div className="">
          <article className="rounded-md shadow bg-stone-100 dark:bg-stone-800 p-4 grid gap-2">
            <header className="w-full">
              <div className="flex justify-between">
                <h2 className={"text-2xl font-bold"}>{project.title}</h2>
                <div className="flex gap-2">
                  <ProjectForm project={project} setProject={setProject} triggerChild={true}>
                    <Button variant="primary" title="Editar Projecto">
                      <Pen size={20}/>
                    </Button>
                  </ProjectForm>
                  <Button variant="error"
                    onClick={() => {
                      setPrompt({
                        content: {
                          title: "Eliminar " + project.title,
                          message: "¿Estás seguro de que deseas eliminar este proyecto?"
                        },
                        variant: "error",
                        onCancel: () => { },
                        onAccept: () => deleteProject(project.projectId)
                      });
                    }}
                  >
                    <Trash size={20} />
                  </Button>
                </div>
              </div>
              <p>Entrega: {project.endDate?.toLocaleDateString("es-ES")}</p>
              <p>Monto: RD{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(project.total)}</p>
            </header>
            <div className="overflow-auto shadow-md dark:shadow-stone-500 rounded-md border border-gray-300 dark:border-s-stone-900">
              <Table
                data={project.items ?? []}
                columns={columns as ColumnDef<unknown>[]}
                styles={tableStyles}
                tableStates={{
                  columnPinning: {
                    right: ["Acciones"],
                  }
                }}
              >
                <TableHead/>
                <TableBody/>
              </Table>
            </div>
            <WindowFormModal open={openWindowForm} setOpen={setOpenWindowForm}/>
          </article>
        </div>
        <div className="">
          <ProjectSelector/>
        </div>
      </section>
    );
}
