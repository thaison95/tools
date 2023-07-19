import React, { useCallback, useEffect, useRef, useState } from "react";
import { login } from "../utils/api";
import { sha256 } from "@/utils/encrypt";

const keys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const hashed_key =
  "d54123de468bd42ea00dafbd777f85fe5fa1ff6404d9838c007953c25c92a1c5";

// eslint-disable-next-line react/prop-types
function Paid({ status, onPaid, memName }) {
  const paidClass = status ? "badge-success" : "badge-error";
  const [key, setKey] = useState("");
  const openModalRef = useRef();
  const closeModalRef = useRef();
  const modalId = useRef("modal-" + memName);

  const loginNPay = useCallback(
    async (key) => {
      await login(key);
      onPaid();
    },
    [onPaid]
  );

  const onPaidClick = () => {
    const savedKey = localStorage.getItem("key");
    if (savedKey) {
      sha256(savedKey).then(function (digest) {
        if (digest === hashed_key) {
          loginNPay(savedKey);
        }
      });
    } else {
      openModalRef.current.click();
    }
  };

  useEffect(() => {
    if (key.length) {
      sha256(key).then(function (digest) {
        if (digest === hashed_key) {
          localStorage.setItem("key", key);
          loginNPay(key);
          closeModalRef.current.click();
        }
      });
    }
  }, [key]);

  return (
    <>
      <div
        className={`badge gap-2 items-center p-4 font-bold ${paidClass}`}
        onClick={onPaidClick}
      >
        {status ? "Paid" : "Unpaid"}
      </div>
      {/*The button to open modal */}
      <label ref={openModalRef} htmlFor={modalId.current}></label>

      {/* Put this part before </body> tag */}
      <input
        ref={closeModalRef}
        type="checkbox"
        id={modalId.current}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <label
            htmlFor={modalId.current}
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold mb-4">
            Muốn làm bậy? Phải phá được khóa
          </h3>

          {keys.map((k) => (
            <kbd
              key={k}
              className={`kbd ${key.includes(k) ? "border-error" : ""}`}
              onClick={() => setKey((prev) => prev + k)}
            >
              {k}
            </kbd>
          ))}
        </div>
      </div>
    </>
  );
}

export default Paid;
