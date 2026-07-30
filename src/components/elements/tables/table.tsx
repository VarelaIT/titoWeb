import { flexRender, getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getGroupedRowModel, getSortedRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { type ReactNode } from "react";
import { TableProvider } from "../../providers/table.provider";
import { ChevronDown, ChevronsUpDown, ChevronUp, Group, Ungroup } from "lucide-react";
import { Button } from "../buttons";
import type { ITableStyles } from "../../../scripts/types";
import { useTableInstance } from "../../../scripts/contexts/tableContext";

export interface ITableProps{
    data: unknown[],
    columns: ColumnDef<unknown>[],
    children: ReactNode,
    styles?: ITableStyles,
}

export function Table({data, columns, children, styles}: ITableProps) {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <TableProvider table={table} styles={styles}>
      <table className="w-full">
        {children}
      </table>
    </TableProvider>
  );
}


export function TableHead(){
    const {table, styles} = useTableInstance();
    return (
      <thead className={styles?.head.container}>
        {table &&
          table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}
              className={styles?.head.row}
            >
              {headerGroup.headers.map(
                (
                  header, // map over the headerGroup headers array
                ) => (
                  <th key={header.id}
                    colSpan={header.colSpan}
                    className={styles?.head.cell}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </span>
                      <ul className="flex items-center gap-1">
                        {header.column.getCanSort() &&
                          <Button
                            title="Ordenar Columna"
                            variant="transparent"
                            onClick={() => header.column.toggleSorting()}
                          >
                            {header.column.getIsSorted() === "asc" ? <ChevronDown /> : header.column.getIsSorted() === "desc" ? <ChevronsUpDown /> : <ChevronUp/>}
                          </Button>
                        }
                        {header.column.getCanGroup() &&
                          <Button
                            title="Agrupar Columna"
                            variant="transparent"
                            onClick={() => header.column.toggleGrouping()}
                          >
                            {header.column.getIsGrouped()?
                              <Ungroup />
                              :
                              <Group />
                            }
                          </Button>
                        }
                      </ul>
                    </div>
                  </th>
                ),
              )}
            </tr>
          ))}
      </thead>
    );
}

export function TableBody(){
    const {table, styles} = useTableInstance();

    return (
      <tbody className={styles?.body.container}>
        {table &&
          table.getRowModel().rows.map((row) => (
            <tr key={row.id}
              className={styles?.body.row + (row.getCanExpand() ? "cursor-pointer active:opacity-80" : "")}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}
                    className={styles?.body.cell}
                    onClick={row.getToggleExpandedHandler()}
                >
                  <div className="flex gap-2">
                    <span>
                      {cell.getIsAggregated() ?
                        null
                        : cell.getIsPlaceholder() ?
                        null
                        :
                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      }
                    </span >
                    {cell.getIsGrouped() && (<span className="flex items-center text-sm">({row.getLeafRows().length})</span>)}
                  </div>
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    );
}
