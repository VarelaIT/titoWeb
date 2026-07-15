import { flexRender, getCoreRowModel, getFilteredRowModel, getGroupedRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { useEffect, type ReactNode } from "react";
import { TableProvider, useTableInstance } from "../../providers/table.provider";

export interface ITableProps{
    data: any[],
    columns: ColumnDef<any>[],
    children: ReactNode,
}

export function Table({data, columns, children}: ITableProps) {

    return (
        <TableProvider>
            <TableContainer data={data} columns={columns}>
                {children}
            </TableContainer>
        </TableProvider>
    );
}

function TableContainer({data, columns, children}: ITableProps){

    const {table: tableState, setTable} = useTableInstance();
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getGroupedRowModel: getGroupedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
    });

    useEffect(()=> {
        setTable(table);
    }, [table])

    return (
        <table className="w-full overflow-auto">
            {children}
        </table>
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
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
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