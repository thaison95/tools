import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

const key = "passio:woman-day-sale"

const WomanDaySaleDialog = () => {
  const [open, setOpen] = useState(
    !localStorage.getItem(key)
  );
  const currentDate = new Date();

  const onClosePermanent = () => {
    setOpen(false);
    localStorage.setItem(key, 'true')
  }

  const onClose = () => {
    setOpen(false);
  }

  if (currentDate.getDate() !== 8 || currentDate.getMonth() !== 2) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle className="text-center">Khuyến mãi hôm nay</DialogTitle>
        <DialogDescription>
          <img
            src="https://raw.githubusercontent.com/toan-trieu-ts/image-upload/main/woman-day-sales.jpeg"
            width="462"
            height="462"
            loading="eager"
          />
          <div className="flex justify-end mt-2">
          <Button variant="destructive"  onClick={onClosePermanent}>
              Đóng và không mở lại
            </Button>
            <Button className="ml-2" onClick={onClose}>
              Đóng
            </Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default WomanDaySaleDialog;
