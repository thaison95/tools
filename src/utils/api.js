import {
  collection,
  getDoc,
  doc,
  getDocs,
  updateDoc,
  setDoc,
} from "firebase/firestore/lite";
import { signInWithEmailAndPassword } from "firebase/auth";

import { groupBy, omit } from "lodash";

import { db, auth } from "../firebase-config";
import { COLLECTIONS } from "./constants";
import { SIZE } from "@/constants";

const getTodayStr = () => {
  const todayTime = new Date();
  return (
    todayTime.getDate() +
    "." +
    (todayTime.getMonth() + 1) +
    "." +
    todayTime.getFullYear()
  );
};

export const passioMembers = async () => {
  const mem = await getDocs(collection(db, COLLECTIONS.PASSIO_MEMBERS));
  return mem.docs.map((m) => m.data());
};

export const getMenu = async () => {
  const menu = await getDocs(collection(db, COLLECTIONS.PASSIO_MENU));
  return menu.docs.map((m) => m.data());
};

export const getOrders = async (date = getTodayStr()) => {
  const docRef = doc(db, COLLECTIONS.PASSIO_ORDERS, date);
  const docSnapRes = await getDoc(docRef);
  const ordersDocument = omit(docSnapRes.data(), "path");
  const ordersInArr = Object.values(ordersDocument);
  const ordersWithHash = ordersInArr.map((order) => ({
    ...order,
    hash: [order.name, order.size ?? SIZE.S, order.note].filter(Boolean).join("-")
  }));
  const groupedOrdersByHash = groupBy(ordersWithHash, "hash");

  return { grOrder: groupedOrdersByHash, orders: ordersInArr };
};

export const addItem = async (data) => {
  const todayOrderRef = doc(db, COLLECTIONS.PASSIO_ORDERS, getTodayStr());
  return setDoc(
    todayOrderRef,
    {
      path: data.belong,
      [data.belong]: data,
    },
    { merge: true }
  );
};

export const updatePaidStatus = async (memName, date = getTodayStr()) => {
  const todayOrderRef = doc(db, COLLECTIONS.PASSIO_ORDERS, date);
  const fieldToUpdate = `${memName}.status`;

  await updateDoc(todayOrderRef, {
    path: memName,
    [fieldToUpdate]: true,
  });
};

export const login = async (key) => {
  await auth.operations;
  let user = auth.currentUser;

  if (user === null) {
    try {
      await signInWithEmailAndPassword(
        auth,
        "passio@trustingsocial.com",
        "ts" + key
      );
      console.log("logged user");
    } catch (error) {
      //
      console.log("e", error);
    }
  }
};
