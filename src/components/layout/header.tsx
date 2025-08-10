import { Moon, Sun } from "lucide-react";
import { useTheme } from "../providers/themeProvider";
import { Button } from "../elements/buttons";

export function AppHeader(){
    const {theme, setTheme} = useTheme();

    return (
        <header className={
            "p-4 flex justify-between " +
            "bg-stone-100 text-gray-800 dark:bg-stone-800 dark:text-gray-100"
        }>
          <h1 className='font-bold text-xl'>VENTARELA</h1>
            <Button
                variant="transparent"
                onClick={()=> {
                    console.log("toggle theme...", theme)
                    setTheme(theme === "light"? "dark" : "light");
                }}
            >
                {theme === "light"? 
                    <Moon size={16}/>
                    :
                    <Sun size={16}/>
                }
            </Button>
        </header>
    );
}