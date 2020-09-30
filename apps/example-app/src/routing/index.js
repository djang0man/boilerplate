// config
import { routeConfig } from "./route-config";

import { pageTwo } from "./routes";

const getTabIndex = (pathname) => {
  switch (pathname) {
    case pageTwo:
      return 1;
    default:
      return 0;
  }
};

export { getTabIndex, routeConfig };
