import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TableSearch({ table }: any) {
  return (
    <div className="flex justify-between py-4">
      <div className="relative w-fit">
        <Input
          placeholder="Search brand..."
          value={table.getColumn("name")?.getFilterValue() || ""}
          onChange={(e) =>
            table.getColumn("name")?.setFilterValue(e.target.value)
          }
          className="max-w-sm px-12"
        />
        <Search
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-600"
          size={20}
        />
      </div>
    </div>
  );
}
