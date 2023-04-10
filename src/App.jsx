import { useEffect, useState, useRef } from 'react';

import './App.css';

import AddItemModal from "./components/AddItemModal";
import {getMenu, getOrders, passioMembers, addItem, updatePaidStatus} from "./utils/api";

function App() {
  const inputRef = useRef('');
  const [contentH, setContentH] = useState(0);
  const [members, setMembers] = useState(null);
  const [menu, setMenu] = useState([]);
  const [orders, setOrders] = useState([]);
  const [inputData, setInputData] = useState('');

  const fetchData = async () => {
    const [members, menu] = await Promise.all([passioMembers(), getMenu()]);
    setMembers(members);
    setMenu(menu);
  };

  const fetchOrders = async () => {
    const ordersList = await getOrders();
    setOrders(ordersList);
    console.log(orders);
  }


  useEffect(() => {}, []);

  useEffect(() => {
    setContentH(window.innerHeight - 50);
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

  return (
    <>
      <div
        className='container py-4 mx-auto max-content'
        style={{ height: `${contentH > 0 ? contentH + 'px' : 'auto'}` }}>
        {/*summary*/}
        <div id='summary-panel' className='flex justify-center w-full mb-5'>
          <div className='stats shadow'>
            <div className='stat p-2'>
              <div className='stat-title'>Total {members?.length || 0} items</div>
              <div className='stat-value text-primary'>123k</div>
              <div className='stat-desc'>10% discount applied</div>
            </div>

            <div className='stat p-2'>
              <div className='stat-value'>86%</div>
              <div className='stat-desc text-error'>
                {[].filter((m) => m.status).length} remaining
              </div>
            </div>
          </div>
        </div>

        {Object.keys(orders).map((key) => {
          return (
            <div key={key}>
              <div className="divider">{key}</div>
              {orders[key].length && orders[key].map(item => {
                return (
                  <div className='flex justify-center w-full mb-3' key={item.belong}>
                    <div className='stats shadow w-72 grid-cols-5 items-center'>
                      <div className='stat p-2 col-span-3'>
                        <div className='stat-value text-neutral text-lg pl-4'>
                          {item.belong}
                          <span className="text-primary ml-3">{item.price - 0.1 * item.price}</span>
                        </div>
                      </div>
                      <PaidStatus status={item.status} onPaid={() => onPaid(item.belong)} />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div className='text-center bottom-0 sticky'>
        <ul className='inline-flex flex-row bg-base-100 rounded-box'>
          <li>
           <AddItemModal menu={menu} mems={members} onAddItem={onAddItem} />
          </li>

          {/*<li>*/}
          {/*  /!*add member btn*!/*/}
          {/*  <a className=''>*/}
          {/*    /!* The button to open modal *!/*/}
          {/*    <label htmlFor='my-modal'>*/}
          {/*      <svg*/}
          {/*        id='Слой_1'*/}
          {/*        enableBackground='new 0 0 512 512'*/}
          {/*        height='40'*/}
          {/*        viewBox='0 0 512 512'*/}
          {/*        width='40'*/}
          {/*        xmlns='http://www.w3.org/2000/svg'>*/}
          {/*        <g>*/}
          {/*          <g>*/}
          {/*            <circle cx='222.609' cy='111.304' r='111.304' />*/}
          {/*            <path d='m351.758 295.081c-23.557 10.231-40.106 33.931-40.106 61.093-36.728 0-66.783 30.054-66.783 66.783 0 7.793 1.337 15.359 4.005 22.261h-137.57c-34.963 0-65.174-26.948-66.677-61.878-2.738-63.664 48.132-116.21 111.199-116.21h133.565c23.558 0 45.535 7.394 63.574 20.147 2.891 2.044 2.04 6.394-1.207 7.804z' />*/}
          {/*          </g>*/}
          {/*          <g>*/}
          {/*            <path d='m467.478 422.957c0 12.239-10.016 22.261-22.261 22.261h-44.522v44.522c0 12.239-10.016 22.261-22.261 22.261s-22.261-10.022-22.261-22.261v-44.522h-44.522c-12.245 0-22.261-10.022-22.261-22.261s10.016-22.261 22.261-22.261h44.522v-44.522c0-12.239 10.016-22.261 22.261-22.261s22.261 10.022 22.261 22.261v44.522h44.522c12.245 0 22.261 10.021 22.261 22.261z' />*/}
          {/*          </g>*/}
          {/*        </g>*/}
          {/*      </svg>*/}
          {/*    </label>*/}

          {/*    /!* Put this part before </body> tag *!/*/}
          {/*    <input type='checkbox' id='my-modal' className='modal-toggle' />*/}
          {/*    <div className='modal'>*/}
          {/*      <div className='modal-box relative'>*/}
          {/*        <label*/}
          {/*          htmlFor='my-modal'*/}
          {/*          className='btn btn-sm btn-circle absolute right-2 top-2'>*/}
          {/*          ✕*/}
          {/*        </label>*/}
          {/*        <h3 className='font-bold text-lg'>Members</h3>*/}
          {/*        <div className='modal-action justify-around'>*/}
          {/*          <input*/}
          {/*            type='text'*/}
          {/*            placeholder='Name'*/}
          {/*            className='input input-bordered input-primary w-full max-w-xs'*/}
          {/*            ref={inputRef}*/}
          {/*            // onChange={onChangeData}*/}
          {/*          />*/}
          {/*          <label*/}
          {/*            htmlFor='my-modal'*/}
          {/*            className='btn'>*/}
          {/*            add*/}
          {/*          </label>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </a>*/}
          {/*</li>*/}
        </ul>
      </div>
    </>
  );
}

export default App;

const PaidStatus = ({ status, onPaid }) =>
  status ? (
    <div className='badge badge-success gap-2 p-4 font-bold'>Paid</div>
  ) : (
    <div className='badge badge-error gap-2 items-center p-4 font-bold' onClick={onPaid}>
      Unpaid
    </div>
  );
