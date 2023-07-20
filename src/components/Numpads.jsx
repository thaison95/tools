import React from "react";

const Numpad = ({ onClick, number }) => (
  <button
    className="grid text-[24px] place-items-center bg-slate-200 w-[70px] h-[70px] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
    onClick={() => onClick(number)}
  >
    {number}
  </button>
);

const Numpads = ({ numbers, onClick }) => (
  <div className="ml-auto mr-auto grid gap-4 grid-rows-4 grid-cols-3 place-items-center">
    <Numpad onClick={onClick} number={numbers[0]} />
    <Numpad onClick={onClick} number={numbers[1]} />
    <Numpad onClick={onClick} number={numbers[2]} />
    <Numpad onClick={onClick} number={numbers[3]} />
    <Numpad onClick={onClick} number={numbers[4]} />
    <Numpad onClick={onClick} number={numbers[5]} />
    <Numpad onClick={onClick} number={numbers[6]} />
    <Numpad onClick={onClick} number={numbers[7]} />
    <Numpad onClick={onClick} number={numbers[8]} />
    <div className="w-[70px] h-[70px]"></div>
    <Numpad onClick={onClick} number={numbers[9]} />
    <div className="w-[70px] h-[70px]"></div>
  </div>
);

export default Numpads;
