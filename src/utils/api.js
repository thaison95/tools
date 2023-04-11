import {
  collection,
  getDoc,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore/lite';

import { groupBy, omit } from 'lodash';

import { db } from '../firebase-config';
import { COLLECTIONS } from './constants';

const getTodayStr = () => {
  const todayTime = new Date();
  return todayTime.getDate() + '.' + (todayTime.getMonth() + 1) + '.' + todayTime.getFullYear();
}

export const passioMembers = async () => {
  const mem = await getDocs(
    collection(db, COLLECTIONS.PASSIO_MEMBERS)
  );
  return mem.docs.map((m) => m.data());
}

export const getMenu = async () => {
  const menu = await getDocs(
    collection(db, COLLECTIONS.PASSIO_MENU)
  );
  return menu.docs.map((m) => m.data());
}

export const getOrders = async () => {
  const menu = await getDocs(
    collection(db, COLLECTIONS.PASSIO_ORDERS)
  );
  return groupBy(omit(menu.docs[0].data(), 'list'), 'name');
}

export const addItem = async (data) => {
  const todayOrderRef = doc(db, COLLECTIONS.PASSIO_ORDERS, getTodayStr());
  return updateDoc(todayOrderRef, {
    [data.belong]: data
  });
}

export const updatePaidStatus = async (memName) => {
  const todayOrderRef = doc(db, COLLECTIONS.PASSIO_ORDERS, getTodayStr());
  const fieldToUpdate = `${memName}.status`;

  await updateDoc(todayOrderRef, {
    [fieldToUpdate]: true
  });

}