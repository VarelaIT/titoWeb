import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { IProject } from "../../scripts/types";


export interface IProjectContext{
    project: IProject,
    setProject: (project: IProject) => void,
}

const ProjectContext = createContext<IProjectContext>({project: {title: "Sin Titulo", date: new Date(), total: 0}, setProject: (project: IProject)=> console.log("Project context initialized in " + project + " mode.")});

export function ProjectProvider({children}: {children: ReactNode}){
    const [project, setProject] = useState<IProject>({title: "Sin Titulo", date: new Date(), total: 0});

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