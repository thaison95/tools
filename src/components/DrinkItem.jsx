import applyDiscount from "@/utils/applyDiscount";
import React from "react";

const DrinkItem = ({ item }) => {
  return (
    <div className="h-[50px] flex flex-row items-center gap-2 w-[300px] mr-2">
      <img src={item.image} width="40" height="40" />
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
