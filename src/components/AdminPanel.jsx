/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { UserCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import shuffle from "@/utils/shuffle";
import { sha256 } from "@/utils/encrypt";
import { login } from "../utils/api";
import Numpads from "./Numpads";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import PaymentManagement from "./PaymentManagement";
import MenuManagement from "./MenuManagement";
import HistoryManagement from "./HistoryManagement";

const numbers = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
const hashed_key =
  "d54123de468bd42ea00dafbd777f85fe5fa1ff6404d9838c007953c25c92a1c5";

const AdminPanel = ({ orders, fetchOrders }) => {
  const [key, setKey] = useState(localStorage.getItem("key") ?? "");
  const [isUnlocked, setIsUnlocked] = useState(false);

  const onClickNumPad = (number) => {
    setKey(key + number);
  };

  const loginFirebase = useCallback(async (key) => {
    await login(key);
  }, []);

  useEffect(() => {
    if (key.length) {
      sha256(key).then(function (digest) {
        if (digest === hashed_key) {
          localStorage.setItem("key", key);
          setIsUnlocked(true);
          loginFirebase(key);
        }
      });
    }
  }, [key, loginFirebase]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon">
          <UserCircle />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] overflow-auto">
        {!isUnlocked && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center">
                Từ từ đã bạn hiền
              </DialogTitle>
              <DialogDescription className="text-center">
                Vui lòng đọc password
              </DialogDescription>
            </DialogHeader>

            <Numpads numbers={numbers} onClick={onClickNumPad} />
          </>
        )}

        {isUnlocked && (
          <>
            <DialogHeader>
              <DialogTitle className="text-center">
                Admin in your area
              </DialogTitle>
            </DialogHeader>

            <Tabs
              defaultValue="payment"
              className="sm:max-w-[425px] h-auto overflow-auto w-full flex flex-col"
            >
              <TabsList className="ml-auto mr-auto">
                <TabsTrigger value="payment">Tài chánh</TabsTrigger>
                <TabsTrigger value="menu">Thực đơn</TabsTrigger>
                <TabsTrigger value="history">Siết nợ</TabsTrigger>
              </TabsList>
              <TabsContent value="payment" className="mt-3">
                <PaymentManagement orders={orders} fetchOrders={fetchOrders} />
              </TabsContent>
              <TabsContent value="menu" className="mt-3">
                <MenuManagement />
              </TabsContent>
              <TabsContent value="history" className="mt-3">
                <HistoryManagement />
              </TabsContent>
            </Tabs>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;
