global.__config__ = {};

// init app
function init() {
  // import the app after we have set configs on global window
  import(/* webpackChunkName: "example-app-src" */ "./src/app");
}

// ready to init
init();
