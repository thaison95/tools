import React from "react";
import { Button } from "./ui/button";
import { RefreshCw } from "lucide-react";

const RefreshOrders = ({ fetchOrders, fetchingOrders }) => {
  return (
    <Button variant="outline" size="icon" onClick={fetchOrders} disabled={fetchingOrders}>
      <RefreshCw className={`${fetchingOrders ? 'animate-spin' : ''}`}/>
    </Button>
  );
};

export default RefreshOrders;
