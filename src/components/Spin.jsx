import React from "react";
import { Loader2 } from "lucide-react";

const Spin = ({ spinning }) => {
  return (
    spinning && (
      <div className="absolute bg-white opacity-50 w-full h-full grid place-items-center">
        <Loader2 className="animate-spin" />
      </div>
    )
  );
};

export default Spin;
