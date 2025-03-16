import IconButton from "@/components/custom/icon-button";
import PrimaryButton from "@/components/custom/PrimaryButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateBrand } from "@/store/server/brand/mutation";
import { Edit } from "lucide-react";
import { useState } from "react";

export function BrandUpdateDialog({ id, name }: { id: string; name: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const [newBrand, setNewBrand] = useState<string>(name);
  const updateBrand = useUpdateBrand();

  const handleUpdateBrand = () => {
    setOpen(!open);
    updateBrand.mutate({ id, name: newBrand });
    setNewBrand("");
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <IconButton icon={Edit} iconClassName="text-blue-500" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Brand</DialogTitle>
          <DialogDescription>
            Make changes to your brand here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={newBrand}
              onChange={(e) => {
                setNewBrand(e.target.value);
              }}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <PrimaryButton
            text="update"
            type="button"
            onClick={handleUpdateBrand}
            variant="outline"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
