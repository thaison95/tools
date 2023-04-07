import { useEffect, useState, useRef } from 'react';
import {
  collection,
  getDoc,
  doc,
  addDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore/lite';
import './App.css';
import { db } from './firebase-config';
import { COLLECTIONS } from './utils/constants';
const memberLists = [
  'An',
  'Nhựt',
  'Quang',
  'Hải',
  'Thư',
  'Bảo',
  'Trung D',
  'Trung Ng',
  'Khải',
  'Thịnh',
  'Luân',
  'Quân',
  'Sơn',
];

function App() {
  const inputRef = useRef('');
  const [contentH, setContentH] = useState(0);
  const [members, setMembers] = useState(null);
  const [inputData, setInputData] = useState('');

  const onFetchMembers = async () => {
    const passioMembers = await getDocs(
      collection(db, COLLECTIONS.PASSIO_MEMBERS)
    );
    setMembers(passioMembers);
    // passioMembers.forEach((doc) => {
    //   console.log(doc.id, ' => ', doc.data());
    // });
  };

  const onGetDoc = async () => {
    const passioMembers = await getDocs(
      collection(db, COLLECTIONS.PASSIO_MEMBERS)
    );
    passioMembers.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
    });
  };

  const onGetCollection = async (collectionName) =>
    await getDocs(collection(db, collectionName));

  const onAddMember = async (e) => {
    const data = inputRef.current;
    if (data && data.value) {
      console.log('data: ', data.value);
    }
    // const member = { name: 'An-2', paid: false };
    // const passioRef = collection(db, PASSIO);
    // const docRef = await addDoc(passioRef, member);
    // console.log('Document written with ID: ', docRef);
    // onFetchMembers();
    e.preventDefault();
  };

  useEffect(() => {}, []);

  useEffect(() => {
    setContentH(window.innerHeight - 50);
    onFetchMembers();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     const docRef = doc(
  //       db,
  //       COLLECTIONS.PASSIO_MEMBERS,
  //       'hijIIcj02ku1cMrLXtdY'
  //     );
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       console.log('Document data:', docSnap.data());
  //     } else {
  //       // docSnap.data() will be undefined in this case
  //       console.log('No such document!');
  //     }
  //   })();
  // }, []);

  return (
    <>
      <div
        className='container py-4 mx-auto max-content'
        style={{ height: `${contentH > 0 ? contentH + 'px' : 'auto'}` }}>
        {/*summary*/}
        <div id='summary-panel' className='flex justify-center w-full mb-5'>
          <div className='stats shadow'>
            <div className='stat p-2'>
              <div className='stat-title'>Total {members?.size || 0} items</div>
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

        {/*list mem*/}
        {members?.docs?.map((mem) => {
          const { name, status = null } = mem.data();
          return (
            <div className='flex justify-center w-full mb-3' key={mem.id}>
              <div className='stats shadow w-72 grid-cols-5 items-center'>
                <div className='stat p-2 col-span-3'>
                  <div className='stat-value text-neutral text-lg pl-4'>
                    {name}
                  </div>
                </div>
                <PaidStatus status={status} />
                {/* <div
                  className='stat p-2 place-items-center col-span-2'
                  onClick={() => onChangeStaus(!info.status, info.name)}>
                  <div
                    className={`stat-value ${
                      !info.status ? 'text-neutral' : 'text-error'
                    } text-lg`}>
                    x
                  </div>
                </div> */}
              </div>
            </div>
          );
        })}
      </div>

      <div className='text-center bottom-0 sticky'>
        <ul className='inline-flex flex-row bg-base-100 rounded-box'>
          <li>
            {/*add record btn*/}
            <a className=''>
              {/* The button to open modal */}
              <label htmlFor='my-modal-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  id='Icons'
                  viewBox='0 0 60 60'
                  width='36'
                  height='36'>
                  <path d='M37.757,5.882a2,2,0,0,0,1.455-2.426l-.484-1.94A2,2,0,0,0,36.3.061L29.272,1.817A3,3,0,0,0,27,4.728V8.269a15.907,15.907,0,0,0-12.822,11.86,2.983,2.983,0,0,0,.4,5.829l3.365,29.606A5,5,0,0,0,22.915,60h14.17a5,5,0,0,0,4.967-4.436l3.365-29.606a2.983,2.983,0,0,0,.405-5.829A15.907,15.907,0,0,0,33,8.269V7.07ZM27,10.314V20H16.261A13.93,13.93,0,0,1,27,10.314ZM29,20V10.042c.331-.022.663-.042,1-.042s.669.02,1,.042V20ZM16.6,26H43.4l-.8,7.035a7.138,7.138,0,0,0-6.812-.262,2.6,2.6,0,0,1-2.62-.146A4.024,4.024,0,0,0,31,32a3.507,3.507,0,0,0-.653.054,3.266,3.266,0,0,1-2.258-.462,3.989,3.989,0,0,0-4.916.581,2.876,2.876,0,0,1-2.4.879A5.134,5.134,0,0,0,20,33a5.958,5.958,0,0,0-2.537.591ZM40.065,55.338A3,3,0,0,1,37.085,58H22.915a3,3,0,0,1-2.98-2.662L17.708,35.744A3.98,3.98,0,0,1,20,35a3.375,3.375,0,0,1,.5.032,4.926,4.926,0,0,0,4.1-1.451,2.014,2.014,0,0,1,2.444-.287,5.267,5.267,0,0,0,3.657.728,1.99,1.99,0,0,1,1.389.286,4.6,4.6,0,0,0,4.617.245,5.091,5.091,0,0,1,5.64.76ZM45,24H15a1,1,0,0,1,0-2H45a1,1,0,0,1,0,2Zm-1.261-4H33V10.314A13.93,13.93,0,0,1,43.739,20ZM30,8c-.337,0-.668.023-1,.043V4.728a1,1,0,0,1,.757-.971L36.787,2l.485,1.941L31.758,5.319a1,1,0,0,0-.758.97V8.043C30.668,8.023,30.337,8,30,8Z' />
                  <path d='M23,39a1,1,0,0,0,0,2,2,2,0,0,1,2,2,1,1,0,0,0,2,0A4,4,0,0,0,23,39Z' />
                  <path d='M30,49a1,1,0,0,0,0,2,2,2,0,0,1,2,2,1,1,0,0,0,2,0A4,4,0,0,0,30,49Z' />
                  <path d='M37,40a4,4,0,0,0-4,4,1,1,0,0,0,2,0,2,2,0,0,1,2-2,1,1,0,0,0,0-2Z' />
                </svg>
              </label>

              {/* Put this part before </body> tag */}
              <input type='checkbox' id='my-modal-1' className='modal-toggle' />
              <div className='modal'>
                <div className='modal-box'>
                  <h3 className='font-bold text-lg'>Add items</h3>
                  <div className='modal-action'>
                    <label htmlFor='my-modal-1' className='btn'>
                      Yay!
                    </label>
                  </div>
                </div>
              </div>
            </a>
          </li>

          <li>
            {/*add member btn*/}
            <a className=''>
              {/* The button to open modal */}
              <label htmlFor='my-modal'>
                <svg
                  id='Слой_1'
                  enableBackground='new 0 0 512 512'
                  height='40'
                  viewBox='0 0 512 512'
                  width='40'
                  xmlns='http://www.w3.org/2000/svg'>
                  <g>
                    <g>
                      <circle cx='222.609' cy='111.304' r='111.304' />
                      <path d='m351.758 295.081c-23.557 10.231-40.106 33.931-40.106 61.093-36.728 0-66.783 30.054-66.783 66.783 0 7.793 1.337 15.359 4.005 22.261h-137.57c-34.963 0-65.174-26.948-66.677-61.878-2.738-63.664 48.132-116.21 111.199-116.21h133.565c23.558 0 45.535 7.394 63.574 20.147 2.891 2.044 2.04 6.394-1.207 7.804z' />
                    </g>
                    <g>
                      <path d='m467.478 422.957c0 12.239-10.016 22.261-22.261 22.261h-44.522v44.522c0 12.239-10.016 22.261-22.261 22.261s-22.261-10.022-22.261-22.261v-44.522h-44.522c-12.245 0-22.261-10.022-22.261-22.261s10.016-22.261 22.261-22.261h44.522v-44.522c0-12.239 10.016-22.261 22.261-22.261s22.261 10.022 22.261 22.261v44.522h44.522c12.245 0 22.261 10.021 22.261 22.261z' />
                    </g>
                  </g>
                </svg>
              </label>

              {/* Put this part before </body> tag */}
              <input type='checkbox' id='my-modal' className='modal-toggle' />
              <div className='modal'>
                <div className='modal-box relative'>
                  <label
                    htmlFor='my-modal'
                    className='btn btn-sm btn-circle absolute right-2 top-2'>
                    ✕
                  </label>
                  <h3 className='font-bold text-lg'>Members</h3>
                  <div className='modal-action justify-around'>
                    <input
                      type='text'
                      placeholder='Name'
                      className='input input-bordered input-primary w-full max-w-xs'
                      ref={inputRef}
                      // onChange={onChangeData}
                    />
                    <label
                      htmlFor='my-modal'
                      className='btn'
                      onClick={onAddMember}>
                      add
                    </label>
                  </div>
                </div>
              </div>
            </a>
          </li>
          <li className='d-flex'>
            <button
              type='button'
              className='btn btn-success ml-5'
              onClick={onGetDoc}>
              Get Doc
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default App;

const PaidStatus = ({ status }) =>
  status ? (
    <div className='badge badge-success gap-2 p-4 font-bold'>Paid</div>
  ) : (
    <div className='badge badge-error gap-2 items-center p-4 font-bold'>
      Unpaid
    </div>
  );
