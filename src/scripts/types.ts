import type { ReactNode } from "react";

export interface ILayoutProps {
    className?: string,
    style?: React.CSSProperties,
    children: ReactNode,
}

export type TStyleVariant = "primary" | "transparent";

export enum EStorage{
    THEME = "theme",
}