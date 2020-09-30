// libs
import { useSelector } from "react-redux";

const useCustomSelector = (selectorToUse, selectorParams) => {
  return selectorParams
    ? useSelector(selectorToUse(selectorParams))
    : useSelector(selectorToUse);
};

export default useCustomSelector;
