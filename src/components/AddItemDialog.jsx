/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DrinkItem from "./DrinkItem";
import DrinkSizeItem from "./DrinkSizeItem";
import { SIZE } from "@/constants";

function AddItemDialog({ menu, members, onAddItem }) {
  const [open, setOpen] = useState(false);
  const [itemDetail, setItemDetail] = useState({});
  const onSelectItem = (item) => {
    setItemDetail((pre) => ({
      ...pre,
      can_add_note: item.can_add_note,
      available_size: item.available_size,
      name: item.name,
      price: item.price,
      size: SIZE.S,
      note: "",
    }));
  };

  const onSelectSize = (size) => {
    setItemDetail((pre) => ({ ...pre, size }));
  };

  const onChangeNote = (note) => {
    setItemDetail((pre) => ({ ...pre, note }));
  };

  const onOpenChange = (opened) => {
    setOpen(opened);

    if (!opened) {
      setItemDetail({});
    }
  };

  const validateSelectItem = () => {
    const order = {
      name: itemDetail.name,
      price:
        itemDetail.price + itemDetail.available_size?.[itemDetail.size] ?? 0,
      size: itemDetail.size,
      note: itemDetail.note,
      belong: itemDetail.belong,
      status: false,
    };

    onAddItem(order);

    setItemDetail({});
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger
        className="fixed m-auto left-0 right-0 bottom-1 mb-5"
        asChild
      >
        <Button size="icon" className="bg-transparent hover:bg-transparent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Icons"
            viewBox="0 0 60 60"
            width="36"
            height="36"
            className="cursor-pointer"
          >
            <path d="M37.757,5.882a2,2,0,0,0,1.455-2.426l-.484-1.94A2,2,0,0,0,36.3.061L29.272,1.817A3,3,0,0,0,27,4.728V8.269a15.907,15.907,0,0,0-12.822,11.86,2.983,2.983,0,0,0,.4,5.829l3.365,29.606A5,5,0,0,0,22.915,60h14.17a5,5,0,0,0,4.967-4.436l3.365-29.606a2.983,2.983,0,0,0,.405-5.829A15.907,15.907,0,0,0,33,8.269V7.07ZM27,10.314V20H16.261A13.93,13.93,0,0,1,27,10.314ZM29,20V10.042c.331-.022.663-.042,1-.042s.669.02,1,.042V20ZM16.6,26H43.4l-.8,7.035a7.138,7.138,0,0,0-6.812-.262,2.6,2.6,0,0,1-2.62-.146A4.024,4.024,0,0,0,31,32a3.507,3.507,0,0,0-.653.054,3.266,3.266,0,0,1-2.258-.462,3.989,3.989,0,0,0-4.916.581,2.876,2.876,0,0,1-2.4.879A5.134,5.134,0,0,0,20,33a5.958,5.958,0,0,0-2.537.591ZM40.065,55.338A3,3,0,0,1,37.085,58H22.915a3,3,0,0,1-2.98-2.662L17.708,35.744A3.98,3.98,0,0,1,20,35a3.375,3.375,0,0,1,.5.032,4.926,4.926,0,0,0,4.1-1.451,2.014,2.014,0,0,1,2.444-.287,5.267,5.267,0,0,0,3.657.728,1.99,1.99,0,0,1,1.389.286,4.6,4.6,0,0,0,4.617.245,5.091,5.091,0,0,1,5.64.76ZM45,24H15a1,1,0,0,1,0-2H45a1,1,0,0,1,0,2Zm-1.261-4H33V10.314A13.93,13.93,0,0,1,43.739,20ZM30,8c-.337,0-.668.023-1,.043V4.728a1,1,0,0,1,.757-.971L36.787,2l.485,1.941L31.758,5.319a1,1,0,0,0-.758.97V8.043C30.668,8.023,30.337,8,30,8Z" />
            <path d="M23,39a1,1,0,0,0,0,2,2,2,0,0,1,2,2,1,1,0,0,0,2,0A4,4,0,0,0,23,39Z" />
            <path d="M30,49a1,1,0,0,0,0,2,2,2,0,0,1,2,2,1,1,0,0,0,2,0A4,4,0,0,0,30,49Z" />
            <path d="M37,40a4,4,0,0,0-4,4,1,1,0,0,0,2,0,2,2,0,0,1,2-2,1,1,0,0,0,0-2Z" />
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm rounded-md">
        <DialogHeader>
          <DialogTitle>Chọn món</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Select
              onValueChange={(val) => {
                setItemDetail((pre) => ({ ...pre, belong: val }));
              }}
              value={itemDetail.belong}
            >
              <SelectTrigger className="col-span-4 h-[60px]">
                <SelectValue placeholder="Danh tính" />
              </SelectTrigger>
              <SelectContent>
                {members?.map(({ name: mem }) => (
                  <SelectItem key={mem} value={mem} className="cursor-pointer">
                    {mem}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Select onValueChange={(val) => onSelectItem(val)}>
              <SelectTrigger className="col-span-4 h-[60px]">
                <SelectValue placeholder="Uống gì?" />
              </SelectTrigger>
              <SelectContent>
                {menu
                  .filter((item) => item.is_active)
                  .map((item) => (
                    <SelectItem
                      key={item.name}
                      value={item}
                      className="cursor-pointer w-full"
                    >
                      <DrinkItem item={item} className="w-[17rem]" />
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Select
              onValueChange={(val) => onSelectSize(val)}
              disabled={!itemDetail.available_size}
              defaultValue={SIZE.S}
            >
              <SelectTrigger className="col-span-4 h-[60px]">
                <SelectValue placeholder="Size gì?" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(itemDetail.available_size ?? { S: 0 })
                  .sort((a, b) => a[1] - b[1])
                  .map(([size, sizePrice]) => (
                    <SelectItem
                      key={size}
                      value={size}
                      className="cursor-pointer w-full"
                    >
                      <DrinkSizeItem
                        key={size}
                        size={size}
                        additionalPrice={sizePrice}
                        className="w-[17rem]"
                      />
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {itemDetail.can_add_note && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Input
                type="text"
                onChange={(e) => {
                  onChangeNote(e.target.value);
                }}
                placeholder="Note"
                className="col-span-4 h-[60px]"
                value={itemDetail.note}
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={validateSelectItem}
            disabled={!itemDetail.belong || !itemDetail.name}
          >
            Chốt!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddItemDialog;
