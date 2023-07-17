import React, { useEffect, useState } from "react";

import "./App.css";

import AddItemModal from "./components/AddItemModal";
import {
  getMenu,
  getOrders,
  passioMembers,
  addItem,
  updatePaidStatus,
} from "./utils/api";
import Paid from "./components/Paid";

function App() {
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

  const onPaid = async (memName) => {
    await updatePaidStatus(memName);
    fetchOrders();
  };

  const sum = orderInArr.reduce((rs, cur) => (rs += cur.price), 0);
  const sumToShow = sum ? (sum - sum * 0.1) / 1000 : 0;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container py-4 mx-auto max-content">
        {/*summary*/}
        <div id="summary-panel" className="flex justify-center w-full mb-5">
          <div className="stats shadow">
            <div className="stat p-2">
              <div className="stat-title">{new Date().toDateString()}</div>
              <div className="stat-value text-primary">{sumToShow + "k"}</div>
              <div className="stat-desc">10% discount applied</div>
            </div>
            <div className="stat p-2">
              <div className="stat-value">
                {orderInArr.length
                  ? (
                      ((orderInArr.length -
                        orderInArr.filter((m) => !m.status).length) /
                        orderInArr.length) *
                      100
                    ).toFixed(2)
                  : 0}
                %
              </div>
              <div className="stat-title">{orderInArr.length} items</div>
              <div className="stat-desc text-error">
                {orderInArr.filter((m) => !m.status).length} remaining
              </div>
            </div>
          </div>
        </div>

        {Object.keys(grOrder).map((key) => {
          return (
            <div key={key}>
              <div className="divider">
                {key + " (" + grOrder[key]?.length + ")"}
              </div>
              {grOrder[key].length &&
                grOrder[key].map((item) => {
                  return (
                    <div
                      className="flex justify-center w-full mb-3"
                      key={item.belong}
                    >
                      <div className="stats shadow w-72 grid-cols-8 items-center">
                        <div className="stat p-2 col-span-5">
                          <div className="stat-value text-neutral text-lg pl-4">
                            {item.belong}
                            <span className="text-primary ml-3">
                              {item.price - 0.1 * item.price}
                            </span>
                          </div>
                        </div>
                        <Paid
                          memName={item.belong}
                          status={item.status}
                          onPaid={() => onPaid(item.belong)}
                        />
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
      </div>

      <div className="mt-auto ml-auto mr-auto sticky bottom-0">
        <AddItemModal menu={menu} mems={members} onAddItem={onAddItem} />
      </div>
    </div>
  );
}

export default App;
