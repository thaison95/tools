import { useEffect, useState } from "react";

const usePreloadAssets = (assetUrls) => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const promises = assetUrls.map((url) => {
      return new Promise((resolve, reject) => {
        const asset = new Image();
        asset.src = url;
        asset.onload = resolve;
        asset.onerror = reject;
      });
    });

    Promise.all(promises)
      .then(() => setLoaded(true))
      .catch(() => setHasError(true));
  }, [assetUrls]);

  return [loaded, hasError];
};

export default usePreloadAssets;
