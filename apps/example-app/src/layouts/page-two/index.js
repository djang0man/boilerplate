// libs
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// actions

// components
import { Container, Item } from '@boilerplate/shared/components';

// helpers
import {
  buildAction,
  immerHistory,
  useCustomSelector,
} from '@boilerplate/shared/util';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const PageTwo = (props) => {
  const {} = props;

  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <>
      <Container alignItems='center' className={classes.root}>
        <Item xs='auto'>
          <Container>
            <Typography variant='h6'>{'Page Two'}</Typography>
            <Item></Item>
          </Container>
        </Item>
      </Container>
    </>
  );
};

export default PageTwo;
