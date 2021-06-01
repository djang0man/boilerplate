// libs
import React from 'react';

// material-ui
import { makeStyles } from '@material-ui/core';

// components
import { Container, Item } from '@boilerplate/shared/components';
import { SimpleMenu } from '@boilerplate/example-app/components';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  mainContentWrapper: {
    width: '100%',
  },
  mainContent: {
    margin: '0 auto',
    maxWidth: theme.breakpoints.values.lg,
    padding: '2em',
    [theme.breakpoints.up('md')]: {
      padding: '32px 80px',
    },
  },
}));

const MainLayout = props => {
  const { children } = props;
  let componentToLoad = children;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <Item xs>
          <SimpleMenu />
        </Item>
      </Container>
      <Container>
        <Item className={classes.mainContentWrapper} xs>
          <div className={classes.mainContent}>{componentToLoad}</div>
        </Item>
      </Container>
    </div>
  );
};

export default MainLayout;
