import { cn } from "@/lib/utils";
import applyDiscount from "@/utils/applyDiscount";
import React from "react";

const DrinkSizeItem = ({ size, additionalPrice, className }) => {
  return (
    <div className={cn("h-[50px] flex justify-center items-center", className)}>
      <span>Size {size}</span>
      <div className="ml-auto flex flex-col gap-1">
        {additionalPrice !== 0 && (
          <span className="line-through text-gray-400 italic">
            +{new Intl.NumberFormat().format(additionalPrice)} đ
          </span>
        )}
        <span className="text-green-500">
          +{new Intl.NumberFormat().format(applyDiscount(additionalPrice))} đ
        </span>
      </div>
    </div>
  );
};

export default DrinkSizeItem;
