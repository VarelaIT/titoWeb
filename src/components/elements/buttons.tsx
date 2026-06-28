import type { IElementProps, ILayoutProps, TStyleVariant } from "../../scripts/types";


export interface IButtonProps extends ILayoutProps{
    variant?: TStyleVariant,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
}

export function Button({variant, className, style, onClick, children}: IButtonProps){
    const baseStyle  = getClassVariant(variant);

    function getClassVariant(variant?: TStyleVariant){
        let result = "p-2 rounded-md flex justify-center cursor-pointer ";

        switch(variant){
            case "emerald":
                result += "bg-emerald-600 text-white dark:bg-emerald-800 dark:text-gray-200 hover:bg-emerald-700 dark:hover:bg-emerald-900 "
                    + " hover:shadow-md dark:hover:shadow-md dark:shadow-emerald-500/50"
                    break;
            case "transparent":
                result += "hover:bg-stone-200 dark:hover:bg-slate-900 "
                    + " hover:shadow-md dark:hover:shadow-md dark:shadow-blue-500/50"
                    break;
            default:
                result += "bg-slate-600 text-white dark:bg-slate-900 dark:text-gray-200 "
                    + "hover:bg-slate-800 dark:hover:bg-slate-950 "
                    + "shadow-md dark:shadow-white/50"
                    break;
        }

        return result;
    }

    return <button 
        tabIndex={0}   
        className={baseStyle + " " + className}
        style={style}
        onClick={onClick}
    >
        {children}
    </button>
}

export interface ITabButtonProps extends IElementProps{
    tabStyle: string,
    legend: string,
    selected: boolean
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
}

export function TabButton({legend, selected, tabStyle, className, style, onClick}: ITabButtonProps){
    const baseClass = getStyles(selected);

    function getStyles(isSelected: boolean) {
        let result = "p-2 rounded-tl-md rounded-tr-md cursor-pointer font-medium "
            + tabStyle
            ;
        if(!isSelected){
            result += " opacity-50 "
        }
        return result;
    }

    return <button
        onClick={onClick}
        className={baseClass + className}
        style={style}
    >
        {legend}
    </button>
}