import type { ReactNode } from "react";
import * as z from "zod";
import type { WINDOW_SCHEMA } from "./zodSchemas";

export type TWindow = z.infer<typeof WINDOW_SCHEMA>;

export interface IWindowInputs {
    base: string | undefined,
    height: string | undefined, 
    panels: string | undefined,
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