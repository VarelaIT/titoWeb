import type { ReactNode } from "react";

export interface IWindow {
    base: string | undefined,
    height: string | undefined, 
    panels: number | undefined,
}

export interface IBaseInput{
    value: string | number | undefined,
    required?: boolean,
    placeHolder?: string,
    inputMode?: "search" | "text" | "none" | "tel" | "url" | "email" | "numeric" | "decimal",
    pattern?: string,
    disable?: boolean,
}

export interface ILayoutProps extends IElementProps{
    children: ReactNode,
}

export interface IElementProps {
    className?: string,
    style?: React.CSSProperties,
}

export type TStyleVariant = "primary" | "transparent";

export enum EStorage{
    THEME = "theme",
}