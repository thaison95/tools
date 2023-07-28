import React, { useState } from "react";
import { Button } from "./ui/button";
import { Camera, Check } from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogFooter,
} from "./ui/dialog";

const Screenshot = () => {
  const [processing, setProcessing] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [copied, setCopied] = useState(false);

  const onScreenshot = async () => {
    try {
      setProcessing(true);
      const toPng = (await import("html-to-image")).toPng;

      const node = document.getElementById("order-list");
      const dataUrl = await toPng(node, { quality: 1 });
      setImgUrl(dataUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setProcessing(false);
    }
  };

  const onOpenChange = (open) => {
    if (!open) {
      setImgUrl(null);
    } else {
      onScreenshot();
    }
  };

  const onCopy = async () => {
    try {
      const data = await fetch(imgUrl);
      const blob = await data.blob();

      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 3000)
    } catch (err) {
      console.error(err.name, err.message);
    }
  };

  return (
    <Dialog open={imgUrl} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="icon" disabled={processing}>
          <Camera />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] h-auto overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-center mb-4">Hình chụp</DialogTitle>
          <img src={imgUrl} alt="screenshot" width="100%" />
        </DialogHeader>

        <DialogFooter>
          <Button variant="outline" onClick={onCopy}>
            {copied && <Check className="text-green-300 mr-1" />}
            {copied ? "Đã copy" : "Copy"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Screenshot;
