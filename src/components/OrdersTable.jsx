/* eslint-disable react/prop-types */
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import applyDiscount from "@/utils/applyDiscount";
import Voucher from "./Voucher";
import RefreshOrders from "./RefreshOrders";
import Spin from "./Spin";
import ActionMenu from "./ActionMenu";
import { SIZE } from "@/constants";

function OrdersTable({ total, grOrder, orders, fetchOrders, fetchingOrders }) {
  return (
    <div className="rounded-md border mt-4 relative">
      <Spin spinning={fetchingOrders} />
      <Table>
        <TableCaption className="relative border-b pb-4 mt-0 pt-4 caption-top">
          {new Date().toLocaleDateString("vi-VN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
          <br />
          <span>{orders.length} ly</span> -{" "}
          <b>{new Intl.NumberFormat().format(applyDiscount(total))} &#273;</b>
          <br />
          <div className="mt-2">
            <Voucher />
          </div>
          <div className="absolute right-1 top-1">
            <ActionMenu orders={orders} fetchOrders={fetchOrders} />
          </div>
          <div className="absolute bottom-1 right-1">
            <RefreshOrders
              fetchOrders={fetchOrders}
              fetchingOrders={fetchingOrders}
            />
          </div>
        </TableCaption>

        <colgroup>
          <col className="w-[175px]" />
          <col className="w-[20px]" />
          <col />
        </colgroup>

        {/* id and style for screenshot */}
        <TableBody id="order-list" className="bg-white">
          {Object.keys(grOrder)
            .sort((a, b) => a.localeCompare(b))
            .map((key) => {
              const order = grOrder[key];
              const drink = order[0].name;
              const note = order[0].note ?? "";
              const size = order[0].size ?? SIZE.S;
              const price = order[0].price ?? 0;

              return (
                <TableRow key={key}>
                  <TableCell>
                    <b className="break-all">
                      {drink}
                      {note ? ` (${note})` : ""}
                    </b>
                    <br />
                    <span className="text-muted-foreground">
                      {size}{' - '}
                      {new Intl.NumberFormat().format(applyDiscount(price))}{" "}
                      &#273;
                    </span>
                  </TableCell>
                  <TableCell className="text-left">{order.length}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 flex-wrap">
                      {order?.map((mem) => (
                        <Badge
                          key={mem.belong}
                          variant={mem.status ? "success" : "destructive"}
                        >
                          {mem.belong}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}

          {Object.keys(grOrder).length === 0 && (
            <TableRow className="h-[400px] text-slate-400">
              <TableCell className="text-center" colSpan={3}>
                Hãy là người mở hàng
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default OrdersTable;
