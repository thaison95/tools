import React, {useCallback, useEffect, useRef, useState} from 'react';
import { login } from '../utils/api';

function sha256(str) {
  // Get the string as arraybuffer.
  var buffer = new TextEncoder("utf-8").encode(str)
  return crypto.subtle.digest("SHA-256", buffer).then(function (hash) {
    return hex(hash)
  })
}

function hex(buffer) {
  var digest = ''
  var view = new DataView(buffer)
  for (var i = 0; i < view.byteLength; i += 4) {
    // We use getUint32 to reduce the number of iterations (notice the `i += 4`)
    var value = view.getUint32(i)
    // toString(16) will transform the integer into the corresponding hex string
    // but will remove any initial "0"
    var stringValue = value.toString(16)
    // One Uint32 element is 4 bytes or 8 hex chars (it would also work with 4
    // chars for Uint16 and 2 chars for Uint8)
    var padding = '00000000'
    var paddedValue = (padding + stringValue).slice(-padding.length)
    digest += paddedValue
  }

  return digest
}

const keys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const hashed_key = 'd54123de468bd42ea00dafbd777f85fe5fa1ff6404d9838c007953c25c92a1c5';

function Paid({status, onPaid, memName}) {
  const paidClass = status ? 'badge-success' : 'badge-error';
  const [key, setKey] = useState('');
  const openModalRef = useRef();
  const closeModalRef = useRef();
  const modalId = useRef('modal-' + memName);

  const loginNPay = useCallback(async (key) => {
    await login(key);
    onPaid();
  }, [onPaid]);

  const onPaidClick = () => {
    const savedKey = localStorage.getItem('key');
    if (savedKey) {
      sha256(savedKey).then(function (digest) {
        if (digest === hashed_key) {
          loginNPay(savedKey);
        }
      })
    } else {
      openModalRef.current.click();
    }

  };

  useEffect(() => {
    if (key.length) {
      sha256(key).then(function (digest) {
        if (digest === hashed_key) {
          localStorage.setItem('key', key);
          loginNPay(key);
          closeModalRef.current.click();
        }
      })
    }
  }, [key]);

  return (
    <>
      <div className={`badge gap-2 items-center p-4 font-bold ${paidClass}`}
           onClick={onPaidClick}>{status ? 'Paid' : 'Unpaid'}</div>
       {/*The button to open modal */}
      <label ref={openModalRef} htmlFor={modalId.current}></label>

      {/* Put this part before </body> tag */}
      <input ref={closeModalRef} type="checkbox" id={modalId.current} className="modal-toggle"/>
      <div className="modal">
        <div className="modal-box">
          <label htmlFor={modalId.current} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg font-bold mb-4">Muốn làm bậy? Phải phá được khóa</h3>

          {keys.map(k => (<kbd key={k} className={`kbd ${key.includes(k) ? 'border-error' : ''}`}
                               onClick={() => setKey(prev => prev + k)}>{k}</kbd>))}
        </div>
      </div>
    </>

  );
}

export default Paid;