import { useMemo, useState } from "react";
import { PRESETS_STORAGE, type IStoragePreset } from "../../scripts/presetStorage";
import { STORAGE_CONSTANTS, type IProject, type TWindow } from "../../scripts/types";
import { useProject } from "../providers/project.provider";
import { Button } from "../elements/buttons";
import { WindowMeasurements } from "../../scripts/windowsMeasurement";
import { ArrowDown, ArrowUp, PlusIcon } from "lucide-react";
import ProjectForm from "../forms/projectFrom";
import { Page } from "../elements/pages";

/**
 * Percentage of a project's allotted time that has been consumed,
 * from `startDate` (1%) to `endDate` (100%). Clamped to 1-100 so the
 * progress bar always stays visible. Projects with no `endDate` are
 * treated as fully consumed.
 */
function getTimeConsumed(startDate: Date, endDate?: Date): number {
  if (!endDate) return 100;

  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const now = Date.now();

  if (now >= end) return 100;

  const duration = end - start;
  if (duration <= 0) return 100;

  return Math.min(100, Math.max(1, ((now - start) / duration) * 100));
}

type SortType = {key: string, dir: "asc" | "desc"};

export default function ProjectSelector(){
  const {project, setProject} = useProject();
  const [sortState, setSortState] = useState<SortType>({key: "endDate", dir: "asc"});
  const sortersOptions: {key: string, label: string}[] = [
    {key: "endDate", label: "Fecha de Entrega"},
    {key: "startDate", label: "Fecha de Inicio"},
    {key: "total", label: "Total"},
  ];

  const projects = useMemo<IProject[]>(() => {
    const loadedProjects = loadProject();
    return loadedProjects.sort((a, b) => {
      const keyA = a[sortState.key as keyof IProject];
      const keyB = b[sortState.key as keyof IProject];
      if(keyA === undefined) return 1;
      if(keyB === undefined) return -1;
      return sortState.dir === "asc" ? keyA - keyB : keyB - keyA;
    });
  }, [project, sortState]);

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
    <Page className="bg-white">
      <header className="flex justify-between items-center p-2">
        <h2 className="text-xl font-bold">Listado de Proyectos</h2>
        <ProjectForm project={{projectId: Date.now().toString(), title: "", startDate: new Date(), total: 0}} setProject={setProject} triggerChild={true}>
          <Button
            variant="transparent"
            className="text-green-600"
            title="Crear Projecto Nuevo"
          >
            <PlusIcon size={16} />
          </Button>
        </ProjectForm>
      </header>
      <ul className="py-2 pb-4 flex gap-2">
        {sortersOptions.map((option, i) =>
          <li key={"sorter" + i}>
            <Button
              className="flex items-center justifyjustify-around gap-2 text-sm px-1 py-1"
              variant="transparent"
              title={"Ordenar por " + option.label}
              onClick={() => setSortState({key: option.key, dir: (option.key === sortState.key && sortState.dir === "asc") ? "desc" : "asc"})}
            >
              <span>{option.label}</span>
              {(option.key === sortState.key && sortState.dir === "asc")? <ArrowUp size={12} className="text-blue-600" /> : <ArrowDown size={12} className="text-blue-600" />}
            </Button>
          </li>
        )}
      </ul>
      <ul className="max-h-[80vh] overflow-auto">
        {projects.map((proj: IProject, i: number) => {
          const progress = getTimeConsumed(proj.startDate, proj.endDate);
          return <li key={"project" + i}
            className={
              "dark:hover:bg-stone-600 hover:bg-stone-200 p-2 cursor-pointer rounded-md shadow-sm mb-2 "
              + (proj.projectId === project.projectId ? " dark:bg-stone-600 bg-stone-300" : "dark:bg-stone-400 bg-stone-100")
            }
            onClick={() => setProject(proj)}
          >
            <p className="text-md font-semibold text-gray-600 dark:text-gray-100">{proj.title} <span className="text-sm">({proj.items?.length ?? 0} Articulos)</span></p>
            <p>Entrega: {proj.endDate ? new Date(proj.endDate).toLocaleDateString("es-ES") : "N/A"}</p>
            <p>Monto: RD{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(proj.total)}</p>
            <div className="h-1 bg-gray-400 rounded-md">
              <div
                className={
                  "h-full rounded-md "
                  + (progress < 50 ? " bg-green-600" : "")
                  + (progress >= 50 && progress < 75 ? " bg-yellow-600" : "")
                  + (progress >= 75 ? " bg-red-600" : "")
                }
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </li>
        })}
      </ul>
    </Page>
  );
}
