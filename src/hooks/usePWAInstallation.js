import { useEffect, useRef, useState } from "react";

const usePWAInstallation = () => {
  const [installable, setInstallable] = useState(false);
  const defferedPrompt = useRef(null);

  const onInstall = () => {
    if (!defferedPrompt.current) return;
    defferedPrompt.current.prompt();
    defferedPrompt.current.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        setInstallable(false);
      }
    });
  };

  useEffect(() => {
    const onBeforeInstallPrompt = (e) => {
      e.preventDefault();
      defferedPrompt.current = e;
      setInstallable(true);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    };
  }, []);

  useEffect(() => {
    const onAppInstalled = () => {
      setInstallable(false);
      defferedPrompt.current = null;
    };
    window.addEventListener("appinstalled", onAppInstalled);

    return () => {
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  });

  return [installable, onInstall];
};

export default usePWAInstallation;
