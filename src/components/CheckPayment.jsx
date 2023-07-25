import React, { useState } from "react";
import { Button } from "./ui/button";
import { Loader2 } from 'lucide-react'

const CheckPayment = ({ order, onClick, disabled }) => {
  const [loading, setLoading] = useState(false);

  const self_onClick = async () => {
    try {
        setLoading(true);
        await onClick(order);
    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="flex justify-between items-center gap-8">
      <div className="text-right">{order.belong}</div>
      <Button
        onClick={() => self_onClick()}
        className="p-2 h-8"
        variant={order.status ? "success" : "error"}
        disabled={loading || order.status || disabled}
      >
        {loading && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
        {order.status ? "Đã nộp" : "Chưa nộp"}
      </Button>
    </div>
  );
};

export default CheckPayment;
