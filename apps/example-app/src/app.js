// libs
import React from "react";
import ReactDOM from "react-dom";

// global styles
import theme from "@boilerplate/shared/styles/material-theme";

// helpers
import { immerHistory, buildImmerStore } from "@boilerplate/shared/util";

// routes
import { ApplicationRoutes } from "@boilerplate/example-app/routing/application-routes";

// shared state
import * as APP from "@boilerplate/example-app/state/app";

// application state
import * as EXAMPLE from "@boilerplate/example-app/state";

// components
import { Frame } from "@boilerplate/shared/components";

const store = buildImmerStore({
  customMiddlewares: [],
  reducers: {
    APP: APP.reducer,
    EXAMPLE: EXAMPLE.reducer,
  },
  sagas: [APP.sagas, EXAMPLE.sagas],
});

store.dispatch({ type: "STORE_INITIALIZED" });

function renderApp() {
  // ( ͝° ͜ʖ͡°)
  ReactDOM.render(
    <Frame theme={theme} store={store} history={immerHistory}>
      <ApplicationRoutes />
    </Frame>,
    document.getElementById("example-app")
  );
}

renderApp();
