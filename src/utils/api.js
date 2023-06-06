import {
  collection,
  getDoc,
  doc,
  getDocs,
  updateDoc,
  setDoc
} from 'firebase/firestore/lite';

import {groupBy} from 'lodash';

import {db, auth} from '../firebase-config';
import {COLLECTIONS} from './constants';

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
  const docRef = doc(db, COLLECTIONS.PASSIO_ORDERS, getTodayStr());
  const docSnap = await getDoc(docRef);
  const ordersInArr = Object.entries(docSnap.data()).map(item => item[1]);
  return {grOrder: groupBy(docSnap.data(), 'name'), orders: ordersInArr};
}

export const addItem = async (data) => {
  const todayOrderRef = doc(db, COLLECTIONS.PASSIO_ORDERS, getTodayStr());
  return setDoc(todayOrderRef, {
    [data.belong]: data
  }, { merge: true });
}

export const updatePaidStatus = async (memName) => {
  const todayOrderRef = doc(db, COLLECTIONS.PASSIO_ORDERS, getTodayStr());
  const fieldToUpdate = `${memName}.status`;

  await updateDoc(todayOrderRef, {
    [fieldToUpdate]: true,
  });

}

export const login = async (key) => {
  await auth.operations;
  let user = auth.currentUser;
  
  if (user === null) {
    try {
      await signInWithEmailAndPassword(auth, 'passio@trustingsocial.com', 'ts' + key);
      console.log('logged user',);
    } catch (error) {
      //
    }
  }
}
