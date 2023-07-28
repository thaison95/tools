import React from "react";
import { Button } from "./ui/button";
import { AlignJustify } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import AdminPanel from "./AdminPanel";
import Screenshot from "./Screenshot";

const ActionMenu = ({ orders, fetchOrders }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon">
          <AlignJustify />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-row items-center justify-center">
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <AdminPanel orders={orders} fetchOrders={fetchOrders} />
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Screenshot />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionMenu;
