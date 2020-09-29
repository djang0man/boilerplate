// libs
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ErrorHandler } from '@boilerplate/shared/components';
import { ConnectedRouter } from 'connected-react-router/immutable';

// material-ui
import { MuiThemeProvider } from '@material-ui/core/styles';

const Frame = (props) => {
  const { children, theme, store, history } = props;

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Provider store={store}>
          <ErrorHandler>
            <ConnectedRouter history={history}>{children}</ConnectedRouter>
          </ErrorHandler>
        </Provider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

export default Frame;
