import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { STORAGE_CONSTANTS, type IProject } from "../../scripts/types";
import { PRESETS_STORAGE } from "../../scripts/presetStorage";
import { WindowMeasurements } from "../../scripts/windowsMeasurement";
import { loadProject } from "../../scripts/utils";


export interface IProjectContext{
    project: IProject,
    setProject: (project: IProject) => void,
}

const ProjectContext = createContext<IProjectContext>({project: {projectId: Date.now().toString(), title: "Sin Titulo", startDate: new Date(), total: 0}, setProject: (project: IProject)=> console.log("Project context initialized in " + project + " mode.")});

export function ProjectProvider({children}: {children: ReactNode}){
  const [project, setProject] = useState<IProject>(loadProject());

  useEffect(() => {
    PRESETS_STORAGE.insert(
      STORAGE_CONSTANTS.PROJECTS,
      project.projectId,
      {
        projectId: project.projectId,
        title: project.title,
        startDate: project.startDate,
        endDate: project.endDate,
        total: project.total,
        items: !project.items ? []
          : project.items.map((item: WindowMeasurements) => ({
            type: item.type,
            base: item.base,
            height: item.height,
            panels: item.panels,
          }))
      }
    );
  }, [project])

  return (
    <ProjectContext.Provider value={{project, setProject}}>
      {children}
    </ProjectContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProject(){
    const context = useContext(ProjectContext);
    if(!context)
        throw new Error("Unable to create Project context.");
    return context;
}
