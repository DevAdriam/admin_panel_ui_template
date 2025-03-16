import Tablebody from "@/components/custom/table-body";
import Tableheader from "@/components/custom/table-header";
import TablePagination from "@/components/custom/table-pagination";
import TableSearch from "@/components/custom/table-search";
import { useFetchBrand } from "@/store/server/brand/queries";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";
import { columns } from "../brand-data";
import { BrandCreateDialog } from "./brand-create-dialog";
import { Table } from "@/components/ui/table";

export default function BrandTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const { data: brandList } = useFetchBrand();

  const table = useReactTable({
    data: brandList || [],
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      <h1 className="font-bold text-xl mb-4">Brand List</h1>
      <div className="flex justify-between items-center w-full">
        <TableSearch table={table} />
        <BrandCreateDialog />
      </div>
      <div className="rounded-md border overflow-hidden">
        <Table className="w-full text-sm">
          <Tableheader table={table} />
          <Tablebody table={table} />
        </Table>
      </div>
      <TablePagination table={table} />
    </div>
  );
}
