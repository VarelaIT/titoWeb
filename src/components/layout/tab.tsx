import { useState, type ReactNode } from "react";
import { Page } from "../elements/pages";
import { TabButton } from "../elements/buttons";

export type Tab = {
    legend: string,
    renderer: ReactNode,
    tabStyle: string,
    tabBtnStyle: string,
}

export interface ITabsProps{
    tabs: Tab[], 
}

export function Tabs({tabs}: ITabsProps){
    const [selected, setSelected] = useState(0);

    return (
        <Page className="relative h-full">
            {tabs.map((tab, i)=> 
                <TabButton key={"tabElementIndex" + i} 
                    legend={tab.legend} 
                    selected={selected === i}
                    onClick={()=> setSelected(i)}
                    tabStyle={tab.tabBtnStyle}
                />
            )}
            <div className={"p-1 rounded-bl-md rounded-br-md rounded-tr-md " + tabs[selected].tabStyle}>
                {tabs[selected].renderer}
            </div>

        </Page>
    );
}