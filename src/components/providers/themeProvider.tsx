import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { EStorage } from "../../scripts/types";

export interface IThemeContext{
    theme: "light" | "dark",
    setTheme: (theme: "light" | "dark") => void,
}

const ThemeContext = createContext<IThemeContext>({theme: "light", setTheme: (theme: "light" | "dark")=> console.log("Theme context initialized in " + theme + " mode.")});

export function ThemeProvider({children}: {children: ReactNode}){
    const [theme, setTheme] = useState<"light" | "dark">((localStorage.getItem(EStorage.THEME) as "light" | "dark")?? "light");

    useEffect(()=> {
        localStorage.setItem(EStorage.THEME, theme);
        document.documentElement.className = theme;
    }, [theme]);

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
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