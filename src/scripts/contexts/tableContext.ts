import type { Table } from "@tanstack/react-table";
import { createContext, useContext } from "react";
import type { ITableStyles } from "../../scripts/types";


export interface ITableContext{
  table: Table<unknown>,
  styles?: ITableStyles,
}

export const TableContext = createContext< ITableContext | undefined>(undefined);

export function useTableInstance(){
    const context = useContext(TableContext);
    if(!context)
        throw new Error("Unable to create Project context.");
    return context;
}
