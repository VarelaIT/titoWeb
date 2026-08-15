import React from "react";
import { PromptProvider } from "./prompt.provider";
import { ProjectProvider } from "./project.provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ProjectProvider>
      <PromptProvider>
        {children}
      </PromptProvider>
    </ProjectProvider>
  );
}
