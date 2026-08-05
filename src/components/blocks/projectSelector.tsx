import { useMemo } from "react";
import { PRESETS_STORAGE, type IStoragePreset } from "../../scripts/presetStorage";
import { STORAGE_CONSTANTS, type IProject, type TWindow } from "../../scripts/types";
import { useProject } from "../providers/project.provider";
import { Button } from "../elements/buttons";
import { WindowMeasurements } from "../../scripts/windowsMeasurement";
import { PlusIcon } from "lucide-react";
import ProjectForm from "../forms/projectFrom";
import { Page } from "../elements/pages";

export default function ProjectSelector(){
  const {project, setProject} = useProject();

  const projects = useMemo<IProject[]>(() => {
    return loadProject();
  }, [project]);

  function loadProject(): IProject[] {
    const projects:IStoragePreset[] | undefined = PRESETS_STORAGE.get(STORAGE_CONSTANTS.PROJECTS) as IStoragePreset[] | undefined;
    if (projects) {
      return projects.map((p: IStoragePreset) => {
        const { projectId, title, startDate, endDate, total, items } = p.value as IProject;
        return {
          projectId: projectId,
          title: title,
          startDate: new Date(startDate),
          endDate: endDate ? new Date(endDate) : undefined,
          total: total,
          items: items?.map((item: TWindow) => new WindowMeasurements({ type: item.type, base: item.base, height: item.height, panels: item.panels })),
        }
      });
    }
    return [];
  }

  return (
    <Page className="bg-stone-100">
      <header className="flex justify-between items-center p-2">
        <h2 className="text-xl font-bold">Listado de Proyectos</h2>
        <ProjectForm project={{projectId: Date.now().toString(), title: "", startDate: new Date(), total: 0}} setProject={setProject} triggerChild={true}>
          <Button
            variant="transparent"
            className="text-blue-600"
            title="Crear Projecto Nuevo"
          >
            <PlusIcon size={16} />
          </Button>
        </ProjectForm>
      </header>
      <ul>
        {projects.map((proj: IProject, i: number) =>
          <li key={"project" + i}
            className={
              "dark:hover:bg-stone-600 hover:bg-stone-200 p-2 cursor-pointer rounded-md shadow-sm mb-2 "
              + (proj.projectId === project.projectId ? " dark:bg-stone-600 bg-stone-300" : "dark:bg-stone-400 bg-stone-100")
            }
            onClick={() => setProject(proj)}
          >
            <p className="text-md font-semibold text-gray-600 dark:text-gray-100">{proj.title} <span className="text-sm">({proj.items?.length ?? 0} Articulos)</span></p>
            <p>Entrega: {proj.endDate ? new Date(proj.endDate).toLocaleDateString() : "N/A"}</p>
            <p>Monto: RD{new Intl.NumberFormat("en-IN", { style: "currency", currency: "USD" }).format(proj.total)}</p>
          </li>
        )}
      </ul>
    </Page>
  );
}
