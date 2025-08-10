import type { ReactNode } from "react";


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