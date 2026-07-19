import type { Table } from "@tanstack/react-table";
import { createContext, type ReactNode, useContext } from "react";

export interface ITableContext{
    table: Table<unknown>,
}

const TableContext = createContext<ITableContext | undefined>(undefined);

export function TableProvider({children, table}: {table: ITableContext, children: ReactNode}){

    return (
        <TableContext.Provider value={table}>
            {children}
        </TableContext.Provider>
    );
}
export function useTableInstance(){
    const context = useContext(TableContext);
    if(!context)
        throw new Error("Unable to create Project context.");
    return context;
}
