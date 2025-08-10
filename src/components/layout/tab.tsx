import { useState, type ReactNode } from "react";
import { Page } from "../elements/pages";
import { TabButton } from "../elements/buttons";

export type Tab = {
    legend: string,
    renderer: ReactNode,
}

export interface ITabsProps{
    tabs: Tab[], 
}

export function Tabs({tabs}: ITabsProps){
    const [selected, setSelected] = useState(0);

    return (
        <Page>
            {tabs.map((tab, i)=> 
                <TabButton key={"tabElementIndex" + i} 
                    legend={tab.legend} 
                    selected={selected === i}
                    onClick={()=> setSelected(i)}
                />
            )}
            <div className="bg-slate-600 dark:bg-slate-900 p-1 rounded-bl-md rounded-br-md rounded-tr-md">
                {tabs[selected].renderer}
            </div>

        </Page>
    );
}