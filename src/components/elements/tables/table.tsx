import { flexRender, getCoreRowModel, getExpandedRowModel, getFilteredRowModel, getGroupedRowModel, getSortedRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { type ReactNode } from "react";
import { TableProvider } from "../../providers/table.provider";
import { ChevronDown, ChevronRight, ChevronsUpDown, ChevronUp, Group, Menu, Ungroup } from "lucide-react";
import { Button } from "../buttons";
import type { ITableStyles } from "../../../scripts/types";
import { useTableInstance } from "../../../scripts/contexts/tableContext";
import { DropdownMenu } from "radix-ui";

export interface ITableProps{
    data: unknown[],
    columns: ColumnDef<unknown>[],
    children: ReactNode,
    styles?: ITableStyles,
    tableStates?: Record<string, Object>,
}

export function Table({data, columns, children, styles, tableStates}: ITableProps) {

  const table = useReactTable({
    data,
    columns,
    state: {
      columnPinning:  (tableStates && tableStates.columnPinning) ? tableStates.columnPinning : undefined,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <TableProvider table={table} styles={styles}>
      <table className="w-full border-spacing-0" style={{borderCollapse: "unset"}}>
        {children}
      </table>
    </TableProvider>
  );
}


export function TableHead() {
  const ddItemsStyle =
    "flex justify-between items-center gap-2 cursor-pointer hover:bg-stone-200 dark:hover:bg-stone-700 p-2";
  const iconSize = 18;
  const buttonStyles = "px-1 py-1";
  const { table, styles } = useTableInstance();

  return (
    <thead className={styles?.head.container}>
      {table &&
        table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className={styles?.head.row}>
            {headerGroup.headers.map(
              (
                header, // map over the headerGroup headers array
              ) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className={
                    styles?.head.cell +
                    " " +
                    (header.column.getIsPinned() ? "sticky z-1 border-l" : "") +
                    " " +
                    (header.column.getIsPinned() === "left" ? "left-0" : "") +
                    " " +
                    (header.column.getIsPinned() === "right" ? "right-0" : "")
                  }
                >
                  <div className={"flex items-center justify-between gap-2"}>
                    <span>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </span>
                    {header.column.getCanSort() &&
                      header.column.getCanGroup() && (
                        <DropdownMenu.Root>
                          <DropdownMenu.Trigger asChild>
                            <Button
                              title="Ordenar Columna"
                              variant="transparent"
                              className={buttonStyles}
                            >
                              <Menu size={iconSize} />
                            </Button>
                          </DropdownMenu.Trigger>
                          <DropdownMenu.Content
                            className={
                              "shadow-md shadow-gray-300 rounded-md bg-white dark:bg-stone-800 p-2"
                            }
                          >
                            <DropdownMenu.Sub>
                              <DropdownMenu.SubTrigger
                                className={
                                  ddItemsStyle +
                                  " " +
                                  (header.column.getIsSorted()
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "")
                                }
                              >
                                <span>Ordenar Columna</span>
                                <ChevronRight size={iconSize} />
                              </DropdownMenu.SubTrigger>
                              <DropdownMenu.SubContent
                                className={
                                  "shadow-md shadow-gray-300 rounded-md bg-white dark:bg-stone-800 p-2"
                                }
                              >
                                <DropdownMenu.Item
                                  className={
                                    ddItemsStyle +
                                    " " +
                                    (header.column.getIsSorted() === "asc"
                                      ? "text-blue-600"
                                      : "")
                                  }
                                  onSelect={() => {
                                    if (header.column.getIsSorted() === "asc")
                                      header.column.clearSorting();
                                    else header.column.toggleSorting(false);
                                  }}
                                >
                                  <span>Ascendente</span>
                                  <ChevronUp size={iconSize} />
                                </DropdownMenu.Item>
                                <DropdownMenu.Item
                                  className={
                                    ddItemsStyle +
                                    " " +
                                    (header.column.getIsSorted() === "desc"
                                      ? "text-blue-600"
                                      : "")
                                  }
                                  onSelect={() => {
                                    if (header.column.getIsSorted() === "desc")
                                      header.column.clearSorting();
                                    else header.column.toggleSorting(true);
                                  }}
                                >
                                  <span>Descendente</span>
                                  <ChevronDown size={iconSize} />
                                </DropdownMenu.Item>
                              </DropdownMenu.SubContent>
                            </DropdownMenu.Sub>
                            {header.column.getIsGrouped() ? (
                              <DropdownMenu.Item
                                className={ddItemsStyle}
                                onSelect={() => header.column.toggleGrouping()}
                              >
                                <span>Desagrupar</span>
                                <Ungroup size={iconSize} />
                              </DropdownMenu.Item>
                            ) : (
                              <DropdownMenu.Item
                                className={ddItemsStyle}
                                onSelect={() => header.column.toggleGrouping()}
                              >
                                <span>Agrupar</span>
                                <Group size={iconSize} />
                              </DropdownMenu.Item>
                            )}
                          </DropdownMenu.Content>
                        </DropdownMenu.Root>
                      )}
                  </div>
                </th>
              ),
            )}
          </tr>
        ))}
    </thead>
  );
}

export function TableBody() {
  const { table, styles } = useTableInstance();

  return (
    <tbody className={styles?.body.container}>
      {table &&
        table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className={
              styles?.body.row +
              (row.getCanExpand() ? "cursor-pointer active:opacity-80" : "")
            }
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className={
                  styles?.body.cell +
                  " " +
                  (cell.column.getIsPinned()
                    ? "sticky z-1 bg-white dark:bg-stone-700 border-b border-gray-200"
                    : "") +
                  " " +
                  (cell.column.getIsPinned() === "left"
                    ? "left-0 border-r"
                    : "") +
                  " " +
                  (cell.column.getIsPinned() === "right"
                    ? "right-0 border-l"
                    : "")
                }
                onClick={row.getToggleExpandedHandler()}
              >
                <div className="flex gap-2">
                  <span>
                    {cell.getIsAggregated()
                      ? null
                      : cell.getIsPlaceholder()
                        ? null
                        : flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                  </span>
                  {cell.getIsGrouped() && (
                    <span className="flex items-center text-sm">
                      ({row.getLeafRows().length})
                    </span>
                  )}
                </div>
              </td>
            ))}
          </tr>
        ))}
    </tbody>
  );
}
