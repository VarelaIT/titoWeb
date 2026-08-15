import type { IElementProps, ILayoutProps, TStyleVariant } from "../../scripts/types";


export interface IButtonProps extends ILayoutProps{
    variant?: TStyleVariant,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    type?: "button" | "submit",
    title?: string,
}

export function TriggerButton({variant, className, style, onClick, children, title}: IButtonProps){
    const baseStyle  = getClassVariant(variant);

    function getClassVariant(variant?: TStyleVariant){
        let result = "p-2 rounded-md flex justify-center cursor-pointer ";

        switch(variant){
            case "error":
                result += "bg-red-600 text-white dark:bg-red-800 dark:text-gray-200 hover:bg-red-700 dark:hover:bg-red-900 "
                    + " hover:shadow-md dark:hover:shadow-md dark:shadow-red-500/50"
                    break;
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

    return <span
        tabIndex={0}
        className={baseStyle + " " + className}
        style={style}
        onClick={onClick}
        title={title}
    >
        {children}
    </span>
}

export interface IActionButtonProps extends React.ComponentProps<"button">{
    variant?: TStyleVariant,
}

export function Button({variant, className, children, type, ...rest}: IActionButtonProps){
    const baseStyle  = getClassVariant(variant);

    function getClassVariant(variant?: TStyleVariant){
        let result = "p-2 rounded-md flex justify-center cursor-pointer hover:shadow-md  hover:shadow-stone-500/50 ";

        switch(variant){
          case "error":
          result += "bg-red-600 text-white dark:bg-red-800 dark:text-gray-200 hover:bg-red-700 dark:hover:bg-red-900 "
          break;
          case "warning":
          result += "bg-orange-600 text-white dark:bg-orange-800 dark:text-gray-200 hover:bg-orange-700 dark:hover:bg-orange-900 "
          break;
          case "success":
          result += "bg-green-600 text-white dark:bg-green-800 dark:text-gray-200 hover:bg-green-700 dark:hover:bg-green-900 "
          break;
          case "emerald":
          result += "bg-emerald-600 text-white dark:bg-emerald-800 dark:text-gray-200 hover:bg-emerald-700 dark:hover:bg-emerald-900 "
          break;
          case "cyan":
          result += "bg-cyan-600 text-white dark:bg-cyan-800 dark:text-gray-200 hover:bg-cyan-700 dark:hover:bg-cyan-900 "
          break;
          case "transparent":
          result += "hover:bg-stone-200 dark:hover:bg-stone-900 "
          break;
          default:
          result += "bg-blue-700 text-white dark:bg-blue-800 dark:text-gray-200 "
          + "hover:bg-blue-800 dark:hover:bg-blue-950 "
          break;
        }

        return result;
    }

    return <button
        {...rest}
        tabIndex={0}
        className={baseStyle + " " + className}
        type={type?? "button"}
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
