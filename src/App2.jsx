import React, { useEffect, useState } from 'react'
import TableSumarize from '@/components/TableSumarize'
import AddItemDialog from '@/components/AddItemDialog'
import {
  getMenu,
  getOrders,
  passioMembers,
  addItem,
  updatePaidStatus,
} from "./utils/api";

function App2() {
  const [members, setMembers] = useState(null);
  const [menu, setMenu] = useState([]);
  const [grOrder, setGrOrder] = useState({});
  const [orderInArr, setOrderInArr] = useState([]);

  const fetchData = async () => {
    const [members, menu] = await Promise.all([passioMembers(), getMenu()]);
    setMembers(members);
    setMenu(menu);
  };

  const fetchOrders = async () => {
    const { orders, grOrder } = await getOrders();
    
    setOrderInArr(orders);
    setGrOrder(grOrder);
  };
  useEffect(() => {
    fetchData();
    fetchOrders();
  }, []);

  const onAddItem = async (itemDetail) => {
    await addItem(itemDetail);
    fetchOrders();
  };

  const sum = orderInArr.reduce((rs, cur) => (rs += cur.price), 0);
  const sumToShow = sum ? (sum - sum * 0.1) / 1000 : 0;

  return (
    <>
    <div className='mx-auto max-w-lg px-4'>
      <TableSumarize sumToShow={sumToShow} grOrder={grOrder} totalItem={orderInArr.length}  />
      <AddItemDialog menu={menu} members={members} onAddItem={onAddItem} />
    </div>
    
    </>
  )
}

export default App2