"use client";

import {
  ColumnDef,
  RowPinningState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import * as React from "react";
import { DataTablePagination } from "./data-table-pagination";
import { SidebarItemBtn } from "../sidebar-item-btn";
import { Check, Plus, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { FormCell } from "./form-cell";
import { FormRowControl } from "./form-row-control";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  withForm?: boolean;
  formId?: string;
  label?: string;
  formIsSubmitted?: boolean;
}

function DataTable<TData, TValue>({
  columns,
  data,
  label,
  formId,
  formIsSubmitted,
  withForm,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [rowPinning, setRowPinning] = React.useState<RowPinningState>({
    top: [],
    bottom: [],
  });
  const [isEditing, setIsEditing] = React.useState(false);

  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onRowPinningChange: setRowPinning,
    state: {
      rowSelection,
      rowPinning,
    },
  });

  React.useEffect(() => {
    if (withForm) {
      const rows = table.getRowModel().rows;
      rows[rows.length - 1]?.pin("bottom");
    }
  }, []);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getCenterRows()?.length > 0 &&
            table.getCenterRows().map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={
                      (cell.id.endsWith("actions") && "text-center") || ""
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          {table.getBottomRows()?.length > 0 &&
            table.getBottomRows().map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="relative"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn("invisible", isEditing && "visible")}
                  >
                    {withForm && cell.id.endsWith("actions") ? (
                      <FormRowControl
                        formId={formId}
                        formIsSubmitted={formIsSubmitted}
                        setIsEditing={setIsEditing}
                      />
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}

                {withForm && (
                  <FormCell
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    label={label}
                  />
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <DataTablePagination table={table} />
    </div>
  );
}

export { DataTable };
