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
import { useCreateBrand } from "@/store/server/brand/mutation";
import { useState } from "react";

export function BrandCreateDialog() {
  const createBrand = useCreateBrand();
  const [brand, setBrand] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleCreateBrand = () => {
    setOpen(!open);
    createBrand.mutate(brand);
    setBrand("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <PrimaryButton text="Create Brand" type="button" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Brand</DialogTitle>
          <DialogDescription>It will create new brand</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={brand}
              onChange={(e) => {
                console.log(e.target.value);
                setBrand(e.target.value);
              }}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <PrimaryButton
            text="Create"
            onClick={handleCreateBrand}
            type="submit"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
