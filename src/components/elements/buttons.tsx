import type { ILayoutProps, TStyleVariant } from "../../scripts/types";


export interface IButtonProps extends ILayoutProps{
    variant?: TStyleVariant,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
}

export function Button({variant, className, style, onClick, children}: IButtonProps){
    const baseStyle  = getClassVariant(variant);

    function getClassVariant(variant?: TStyleVariant){
        let result = "p-2 rounded-md cursor-pointer ";

        switch(variant){
            case "transparent":
                result += "hover:bg-stone-200 dark:hover:bg-slate-800 "
                    + " hover:shadow-md dark:hover:shadow-md dark:shadow-blue-500/50"
                    break;
            default:
                result += "bg-slate-600 text-white dark:bg-slate-700 dark:text-gray-200 "
                    + "hover:bg-slate-400 dark:hover:bg-slate-500 "
                    + "shadow-md dark:shadow-white/50"
                    break;
        }

        return result;
    }

    return <button 
        className={baseStyle + className}
        style={style}
        onClick={onClick}
    >
        {children}
    </button>
}