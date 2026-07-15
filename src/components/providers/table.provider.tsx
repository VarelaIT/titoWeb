import type { Table } from "@tanstack/react-table";
import { createContext, type ReactNode, useContext, useState } from "react";

export interface ITableContext{
    table?: Table<any>,
    setTable: (table?: Table<any>) => void,
}

const TableContext = createContext<ITableContext | undefined>(undefined);

export function TableProvider({children}: {children: ReactNode}){
    const [table, setTable] = useState<Table<any> | undefined>(undefined);

    return (
        <TableContext.Provider value={{table, setTable}}>
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