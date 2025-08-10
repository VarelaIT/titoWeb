import type { ILayoutProps, TStyleVariant } from "../../scripts/types";

export interface IPageProps extends ILayoutProps{
    variant?: TStyleVariant,
}

export function Page({variant, className, style, children}: IPageProps){
    const baseStyle = getPageStyle(variant);

    function getPageStyle(variant?: TStyleVariant){
        let result = "rounded-md bg-stone-100 dark:bg-stone-800 p-4 "
            + "shadow-lg dark:shadow-blue-500/50"
            ;

        switch(variant){
            default:
                result += "";
                break;
        }

        return result;
    }

    return <section
        className={baseStyle + className}
        style={style}
    >
        {children}
    </section>
}