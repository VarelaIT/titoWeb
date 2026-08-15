import type { Table } from "@tanstack/react-table";
import { type ReactNode } from "react";
import type { ITableStyles } from "../../scripts/types";
import { TableContext } from "../../scripts/contexts/tableContext";

export function TableProvider({children, table, styles}: {table: Table<unknown>, children: ReactNode, styles?: ITableStyles}){

    return (
        <TableContext.Provider value={{ table, styles }}>
            {children}
        </TableContext.Provider>
    );
}
