import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { BrandDeleteDialog } from "./components/brand-delete-dialog";
import { BrandUpdateDialog } from "./components/brand-update-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Brand } from "@/store/server/brand/type";

export const columns: ColumnDef<Brand>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "totalPurchaseAmount",
    header: () => <div className="text-right">Total Purchase Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPurchaseAmount"));
      return (
        <div className="text-right font-medium">
          {amount.toLocaleString()} MMK
        </div>
      );
    },
  },
  {
    accessorKey: "totalSellingAmount",
    header: () => <div className="text-right">Total Selling Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalSellingAmount"));
      return (
        <div className="text-right font-medium">
          {amount.toLocaleString()} MMK
        </div>
      );
    },
  },
  {
    accessorKey: "salePercentage",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Sale Percentage
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.getValue("salePercentage") as number;
      const colorClass =
        value > 80
          ? "text-green-400"
          : value < 50
          ? "text-red-400"
          : "text-black";
      return (
        <div className={`px-10 text-right ${colorClass}`}>
          <div className="flex items-center">
            {value > 80 ? (
              <ArrowUp size={20} />
            ) : value < 50 ? (
              <ArrowDown size={20} />
            ) : null}
            {value}%
          </div>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex justify-center gap-4 py-2 text-center ">
        <BrandUpdateDialog id={row.original.id} name={row.original.name} />
        <BrandDeleteDialog id={row.original.id} />
      </div>
    ),
  },
];
