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
import AdminPanel from "./AdminPanel";
import Voucher from "./Voucher";

function TableSumarize({ total, grOrder, orders, fetchOrders }) {
  return (
    <div className="rounded-md border mt-4 relative">
      <Table>
        <TableCaption className='border-b pb-4'>
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
            <AdminPanel orders={orders} fetchOrders={fetchOrders} />
          </div>
        </TableCaption>
        <TableBody>
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
        </TableBody>
      </Table>
    </div>
  );
}

export default TableSumarize;
