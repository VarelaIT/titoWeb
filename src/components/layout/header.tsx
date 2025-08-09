import { useTheme } from "../providers/themeProvider";

export function AppHeader(){
    const {theme, setTheme} = useTheme();

    return (
        <header className="bg-stone-0 text-gray-800 dark:bg-stone-800 dark:text-gray-100">
            <div><h2 className="text-lg">Logo</h2></div>
            <button
                onClick={()=> {
                    console.log("toggle theme...", theme)
                    setTheme(theme === "light"? "dark" : "light");
                }}
            >Theme</button>
        </header>
    );
}