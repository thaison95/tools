import React from "react";
import FloatButton from "./FloatButton";
import { ArrowDownToLine } from "lucide-react";
import usePWAInstallation from "@/hooks/usePWAInstallation";

const InstallApp = () => {
  const [installable, install] = usePWAInstallation();

  return (
    <FloatButton
      shape="circle"
      className={`right-6 bottom-6 ${installable ? "" : "hidden"}`}
      icon={<ArrowDownToLine />}
      onClick={install}
    ></FloatButton>
  );
};

export default InstallApp;
