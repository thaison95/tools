/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { CircleDollarSign } from "lucide-react";
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
import { login, updatePaidStatus } from "../utils/api";
import Numpads from "./Numpads";
import CheckPayment from "./CheckPayment";

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

  const onCheckedChange = async (order) => {
    await updatePaidStatus(order.belong);
    await fetchOrders();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon">
          <CircleDollarSign />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-auto">
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
                Đoán xem ai chưa trả nợ
              </DialogTitle>
            </DialogHeader>

            <div className="ml-auto mr-auto flex gap-5 flex-col justify-start">
              {orders
                .sort((a, b) => a.belong.localeCompare(b.belong))
                .map((order) => (
                  <CheckPayment
                    key={order.belong}
                    order={order}
                    onClick={onCheckedChange}
                  />
                ))}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;
