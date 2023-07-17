/* eslint-disable react/prop-types */
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CircleDollarSign } from "lucide-react";

function TableSumarize({ sumToShow, grOrder }) {
  return (
    <div className="rounded-md border mt-4 relative">
      <Table>
        <TableCaption>
          {new Date().toDateString()} - 12ly - <b>{sumToShow}k</b>
          <Button className="absolute right-1 top-1" size="icon">
            <CircleDollarSign />
          </Button>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]"></TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.keys(grOrder).map((key) => (
            <TableRow key={key}>
            <TableCell>
              <b>{key}</b> - {grOrder[key].length} <br /> <i>{new Intl.NumberFormat().format(grOrder[key][0].price - 0.1 * grOrder[key][0].price)}&#273;</i>
            </TableCell>
            <TableCell className="space-x-1 space-y-1">
              {grOrder[key].length && grOrder[key].map((mem) => (
                <Badge key={mem.belong} variant={mem.status ? '' : 'destructive'}>{mem.belong}</Badge>
              ))}
            </TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableSumarize;
