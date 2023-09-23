import { cn } from "@/lib/utils";
import applyDiscount from "@/utils/applyDiscount";
import React from "react";

const DrinkItem = ({ item, className }) => {
  return (
    <div
      className={cn(
        "h-[50px] flex flex-row items-center gap-1 mr-2",
        className
      )}
    >
      <img src={item.image} width="35" height="35" />
      <span>{item.name}</span>

      <div className="ml-auto flex flex-col gap-1">
        <span className="line-through text-gray-400 italic">
          {new Intl.NumberFormat().format(item.price)} đ
        </span>
        <span className="text-green-500">
          {new Intl.NumberFormat().format(applyDiscount(item.price))} đ
        </span>
      </div>
    </div>
  );
};

export default DrinkItem;
