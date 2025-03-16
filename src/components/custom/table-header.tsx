/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";

export default function Tableheader({ table }: any) {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup: any) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header: any) => (
            <TableHead key={header.id}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}
