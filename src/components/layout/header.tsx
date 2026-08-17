import { Moon, PanelRight, PanelTop, Sun } from "lucide-react";
import { useTheme } from "../providers/themeProvider";
import { Button } from "../elements/buttons";

export function AppHeader(){
    const {theme, setTheme, layout, setLayout} = useTheme();

    return (
        <header className={
            "p-4 flex justify-between items-center" +
            "bg-stone-100 text-gray-800 dark:bg-stone-800 dark:text-gray-100"
        }>
          <h1 className='font-bold text-xl'>VENTARELA</h1>
            <ul
                className="flex gap-2"
            >
                <Button
                    variant="transparent"
                    title="Claro/Oscuro"
                    onClick={()=> {
                        setTheme(theme === "light"? "dark" : "light");
                    }}
                >
                    {theme === "light"?
                        <Moon size={16}/>
                        :
                        <Sun size={16}/>
                    }
                </Button>

                <Button
                    variant="transparent"
                    title=""
                    onClick={()=> {
                        setLayout(layout === "wide"? "compact" : "wide");
                    }}
                >
                    {layout === "wide"?
                        <PanelRight size={16}/>
                        :
                        <PanelTop size={16}/>
                    }
                </Button>
            </ul>
        </header>
    );
}
