import { flexRender, getCoreRowModel, getFilteredRowModel, getGroupedRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { type ReactNode } from "react";
import { TableProvider, useTableInstance } from "../../providers/table.provider";
import { Group, Ungroup } from "lucide-react";
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
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
                    <div>
                      <span>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </span>
                      <ul>
                        {header.column.getCanGroup() &&
                          <Button
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
                className="border-l"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}
                    className={`p-2 border-b border-r`}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    );
}
