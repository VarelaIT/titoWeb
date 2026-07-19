import { flexRender, getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getGroupedRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { type ReactNode } from "react";
import { TableProvider, useTableInstance } from "../../providers/table.provider";
import { ChevronDown, ChevronsUpDown, ChevronUp, Group, Ungroup } from "lucide-react";
import { Button } from "../buttons";

export interface ITableProps{
    data: unknown[],
    columns: ColumnDef<unknown>[],
    children: ReactNode,
}

export function Table({data, columns, children}: ITableProps) {

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
    <TableProvider table={{table}}>
      <table className="w-full overflow-auto">
        {children}
      </table>
    </TableProvider>
  );
}


export function TableHead(){
    const {table} = useTableInstance();
    return (
      <thead className="">
        {table &&
          table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}
                className="border-l border-t"
            >
              {headerGroup.headers.map(
                (
                  header, // map over the headerGroup headers array
                ) => (
                  <th key={header.id}
                    colSpan={header.colSpan}
                    className={`font-bold p-2 border-b border-r`}
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
    const {table} = useTableInstance();

    return (
      <tbody className="">
        {table &&
          table.getRowModel().rows.map((row) => (
            <tr key={row.id}
              className={"border-l opacity-90 hover:opacity-100 " + (row.getCanExpand() ? "cursor-pointer bg-gray-200" : "")}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}
                    className={`p-2 border-b border-r`}
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
