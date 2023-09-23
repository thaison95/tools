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

function TableSumarize({
  total,
  grOrder,
  orders,
  fetchOrders,
  fetchingOrders,
}) {
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

        {/* id and style for screenshot */}
        <TableBody id="order-list" className="bg-white">
          {Object.keys(grOrder)
            .sort((a, b) => a.localeCompare(b))
            .map((key) => (
              <TableRow key={key}>
                <TableCell>
                  <b className="break-all">{key}</b>
                  <br />
                  <span className="text-muted-foreground">
                    {new Intl.NumberFormat().format(
                      applyDiscount(grOrder[key][0].price)
                    )}{" "}
                    &#273;
                  </span>
                </TableCell>
                <TableCell className="text-left">
                  {grOrder[key].length}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 flex-wrap">
                    {grOrder[key]?.map((mem) => (
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
            ))}

          {Object.keys(grOrder).length === 0 && (
            <TableRow className="h-[400px] grid place-items-center text-slate-400">
              <TableCell colSpan={3}>Hãy là người mở hàng</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableSumarize;
