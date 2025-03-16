import IconButton from "@/components/custom/icon-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteBrand } from "@/store/server/brand/mutation";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export function BrandDeleteDialog({ id }: { id: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const deleteBrand = useDeleteBrand();
  const handleDeleteBrand = () => {
    setOpen(!open);
    deleteBrand.mutate(id);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <IconButton icon={Trash2} iconClassName="text-red-500" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-red-500">Delete Brand</DialogTitle>
          <DialogDescription>
            Are you sure to delete this brand?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleDeleteBrand}
            className="bg-red-500 cursor-pointer hover:bg-red-400"
          >
            delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
