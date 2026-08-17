import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { EStorage, type LayoutType } from "../../scripts/types";

export interface IThemeContext{
    theme: "light" | "dark",
    setTheme: (theme: "light" | "dark") => void,
    layout: LayoutType,
    setLayout: (layout: LayoutType)=> void,
}

const ThemeContext = createContext<IThemeContext | null>(null);

export function ThemeProvider({children}: {children: ReactNode}){
    const [theme, setTheme] = useState<"light" | "dark">((localStorage.getItem(EStorage.THEME) as "light" | "dark")?? "light");
    const [layout, setLayout] = useState<LayoutType>(localStorage.getItem(EStorage.LAYOUT) as LayoutType?? "wide");

    useEffect(()=> {
        localStorage.setItem(EStorage.THEME, theme);
        localStorage.setItem(EStorage.LAYOUT, layout?? "wide");
        document.documentElement.className = theme;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, setTheme, layout, setLayout}}>
            {children}
        </ThemeContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme(){
    const context = useContext(ThemeContext);
    if(!context)
        throw new Error("Unable to create Theme context.");
    return context;
}