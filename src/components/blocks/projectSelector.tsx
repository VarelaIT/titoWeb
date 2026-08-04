import { useMemo } from "react";
import { PRESETS_STORAGE, type IStoragePreset } from "../../scripts/presetStorage";
import { STORAGE_CONSTANTS, type IProject } from "../../scripts/types";
import { useProject } from "../providers/project.provider";

export default function ProjectSelector(){
  const {project, setProject} = useProject();

  const projects = useMemo<IProject[]>(() => {
    return loadProject();
  }, []);

  function loadProject(): IProject[] {
    const projects = PRESETS_STORAGE.get(STORAGE_CONSTANTS.PROJECTS);
    console.log("project list", projects)
    if (projects) {
      return projects.map((p: IStoragePreset) => (p.value as IProject));
    }
    return [];
  }

  return (
    <ul>
      {projects.map((proj: IProject, i: number) =>
        <li key={"project" + i}
          onClick={() => setProject(proj)}
        >
          {new Date(proj.date).toLocaleDateString()}
        </li>
      )}
    </ul>
  );
}
