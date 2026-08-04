import type { ReactNode } from "react";
import * as z from "zod";
import type { WINDOW_SCHEMA } from "./zodSchemas";
import type { WindowMeasurements } from "./windowsMeasurement";

export interface ITableStyles {
  head: {
    container: string;
    row: string;
    cell: string;
  },
  body: {
    container: string;
    row: string;
    cell: string;
  },
  footer: {
    container: string;
    row: string;
    cell: string;
  }
}

export interface IOption {
  value: unknown;
  label: string;
  checked?: boolean;
}

export type TWindow = z.infer<typeof WINDOW_SCHEMA>;

export interface IWindowInputs {
  type: TWindow["type"],
  base: TWindow["base"],
  height: TWindow["height"],
  panels: TWindow["panels"],
}

export interface IBaseInput{
  value: string | number | undefined,
  required?: boolean,
  placeHolder?: string,
  inputMode?: "search" | "text" | "none" | "tel" | "url" | "email" | "numeric" | "decimal",
  pattern?: string,
  disable?: boolean,
  type?: "text" | "number" | "float" | "date" | "datetime",
}

export interface ILayoutProps extends IElementProps{
  children?: ReactNode,
}

export interface IElementProps {
  className?: string,
  style?: React.CSSProperties,
}

export type TStyleVariant = "primary" | "emerald" | "transparent" | "error";

export enum EStorage{
  THEME = "theme",
}

export interface IProject {
  projectId: string;
  title: string,
  date: Date,
  total: number,
  items?: Array<WindowMeasurements>,
}

export interface IFrameDiff {
  base: number;
  height: number;
}

export interface IPanelDiff {
  jambas: number;
  alfaisal: number;
}

export interface IGlassDiff {
  base: number;
  height: number;
}

export enum STORAGE_CONSTANTS {
  THEME = "theme",
  PROJECTS = "projects",
}
