import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {},
  typography: {},
  breakpoints: {
    values: {},
  },
  overrides: {
    MuiAppBar: {
      colorDefault: {},
    },
    MuiTypography: {
      h1: {},
      h2: {},
      h3: {},
      h5: {},
      h6: {},
      subtitle1: {},
      subtitle2: {},
      body1: {},
      body2: {},
      caption: {},
      colorError: {},
      overline: {},
    },
    MuiButton: {
      contained: {},
      containedPrimary: {},
    },
    MuiBottomNavigation: {
      root: {},
    },
    MuiBottomNavigationAction: {
      root: {},
    },
  },
});

export default theme;
