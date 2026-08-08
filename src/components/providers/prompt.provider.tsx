import React from "react";
import type { IPromptProps } from "../../scripts/utils";
import PromptModal from "../elements/dialogs/prompt";

export interface IPromptContext {
  prompt?: IPromptProps;
  setPrompt: (props: IPromptProps) => void;
}

const PromptContext = React.createContext<IPromptContext | undefined>(undefined);

export function PromptProvider({ children }: { children: React.ReactNode }) {
  const [prompt, setPrompt] = React.useState<IPromptProps | undefined>(undefined);

  return (
    <PromptContext.Provider value={{prompt, setPrompt}}>
      {children}
      <PromptModal/>
    </PromptContext.Provider>
  );
}

export function usePrompt() {
  const context = React.useContext(PromptContext);
  if (!context) {
    throw new Error("usePrompt must be used within a PromptProvider");
  }
  return context;
}
