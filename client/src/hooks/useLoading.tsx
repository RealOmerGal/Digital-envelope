import { useState } from "react";

const useLoading = (func?: any) => {
  const [loading, setLoading] = useState(false);
  const activateFunc = (...args: any) => {
    setLoading(true);
    return func(...args).finally(() => setLoading(false));
  };
  return { activateFunc, loading };
};

export default useLoading;
