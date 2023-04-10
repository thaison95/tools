import React, {useRef, useState} from 'react';

function AddItemModal({menu, mems, onAddItem}) {
  const closeRef = useRef();
  const [itemDetail, setItemDetail] = useState({});
  const onSelectItem = (itemName) => {
    const item = menu.filter(m => m.name === itemName)[0];
    setItemDetail(pre => ({...pre, ...item, status: false}))
  };
  const validateSelectItem = () => {
    if (!itemDetail.belong || !itemDetail.name) return;
    closeRef.current.click();
    onAddItem(itemDetail);
  }
  return (
    <>
      {/*add record btn*/}
      {/* The button to open modal */}
      <label htmlFor='my-modal-1'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          id='Icons'
          viewBox='0 0 60 60'
          width='36'
          height='36'>
          <path
            d='M37.757,5.882a2,2,0,0,0,1.455-2.426l-.484-1.94A2,2,0,0,0,36.3.061L29.272,1.817A3,3,0,0,0,27,4.728V8.269a15.907,15.907,0,0,0-12.822,11.86,2.983,2.983,0,0,0,.4,5.829l3.365,29.606A5,5,0,0,0,22.915,60h14.17a5,5,0,0,0,4.967-4.436l3.365-29.606a2.983,2.983,0,0,0,.405-5.829A15.907,15.907,0,0,0,33,8.269V7.07ZM27,10.314V20H16.261A13.93,13.93,0,0,1,27,10.314ZM29,20V10.042c.331-.022.663-.042,1-.042s.669.02,1,.042V20ZM16.6,26H43.4l-.8,7.035a7.138,7.138,0,0,0-6.812-.262,2.6,2.6,0,0,1-2.62-.146A4.024,4.024,0,0,0,31,32a3.507,3.507,0,0,0-.653.054,3.266,3.266,0,0,1-2.258-.462,3.989,3.989,0,0,0-4.916.581,2.876,2.876,0,0,1-2.4.879A5.134,5.134,0,0,0,20,33a5.958,5.958,0,0,0-2.537.591ZM40.065,55.338A3,3,0,0,1,37.085,58H22.915a3,3,0,0,1-2.98-2.662L17.708,35.744A3.98,3.98,0,0,1,20,35a3.375,3.375,0,0,1,.5.032,4.926,4.926,0,0,0,4.1-1.451,2.014,2.014,0,0,1,2.444-.287,5.267,5.267,0,0,0,3.657.728,1.99,1.99,0,0,1,1.389.286,4.6,4.6,0,0,0,4.617.245,5.091,5.091,0,0,1,5.64.76ZM45,24H15a1,1,0,0,1,0-2H45a1,1,0,0,1,0,2Zm-1.261-4H33V10.314A13.93,13.93,0,0,1,43.739,20ZM30,8c-.337,0-.668.023-1,.043V4.728a1,1,0,0,1,.757-.971L36.787,2l.485,1.941L31.758,5.319a1,1,0,0,0-.758.97V8.043C30.668,8.023,30.337,8,30,8Z'/>
          <path d='M23,39a1,1,0,0,0,0,2,2,2,0,0,1,2,2,1,1,0,0,0,2,0A4,4,0,0,0,23,39Z'/>
          <path d='M30,49a1,1,0,0,0,0,2,2,2,0,0,1,2,2,1,1,0,0,0,2,0A4,4,0,0,0,30,49Z'/>
          <path d='M37,40a4,4,0,0,0-4,4,1,1,0,0,0,2,0,2,2,0,0,1,2-2,1,1,0,0,0,0-2Z'/>
        </svg>
      </label>

      {/* Put this part before </body> tag */}
      <input type='checkbox' id='my-modal-1' className='modal-toggle'/>
      <div className='modal'>
        <div className='modal-box relative'>
          <label ref={closeRef} htmlFor="my-modal-1" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className='font-bold text-lg'>Chọn món</h3>

          <select className="mt-2 select select-bordered w-full max-w-xs"
                  onChange={(e) => setItemDetail((pre) => ({...pre, belong: e.target.value}))}>
            <option disabled selected>Danh tính?</option>
            {mems && mems.length && mems.map((m) => (
              <option key={m.name}>{m.name}</option>
            ))}
          </select>

          <select className="mt-2 select select-bordered w-full max-w-xs"
                  onChange={(e) => onSelectItem(e.target.value)}>
            <option disabled selected>Uống gì?</option>
            {menu && menu.length && menu.map((m) => (
              <option key={m.name}>{m.name}</option>
            ))}
          </select>

          <div className='modal-action'>
            <label className='btn' onClick={validateSelectItem}>
              Chốt!
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddItemModal;