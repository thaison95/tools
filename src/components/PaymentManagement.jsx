import React, { useState } from "react";
import { Button } from "./ui/button";
import CheckPayment from "./CheckPayment";
import { updatePaidStatus } from "@/utils/api";

const PaymentManagement = ({ orders, fetchOrders }) => {
  const [loading, setLoading] = useState(false);

  const onCheckedChange = async (order) => {
    await updatePaidStatus(order.belong);
    await fetchOrders();
  };

  const onPaidAll = async () => {
    try {
      setLoading(true);
      await Promise.all(orders.map((order) => updatePaidStatus(order.belong)));
      await fetchOrders();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <Button onClick={onPaidAll} variant="success" className="w-[300px]">
        Tất cả đã nộp
      </Button>

      <div className="flex gap-5 flex-col justify-start overflow-auto h-[400px] relative">
        {orders
          .filter((order) => !order.status)
          .sort((a, b) => a.belong.localeCompare(b.belong))
          .map((order) => (
            <CheckPayment
              key={order.belong}
              order={order}
              onClick={onCheckedChange}
              disabled={loading}
            />
          ))}
      </div>
    </div>
  );
};

export default PaymentManagement;
