import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "./ui/dialog";

const Voucher = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Quét voucher</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Voucher</DialogTitle>
        </DialogHeader>

        <img src="/assets/voucher.png" alt="9001184329" width="400" />
      </DialogContent>
    </Dialog>
  );
};

export default Voucher;
