// libs
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// actions
import { ExampleAppActions } from '@boilerplate/example-app/state/actions';

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

const PageOne = (props) => {
  const {} = props;

  const classes = useStyles();
  const dispatch = useDispatch();

  dispatch(buildAction(ExampleAppActions.FETCH_EXAMPLE));

  return (
    <>
      <Container alignItems='center' className={classes.root}>
        <Item xs='auto'>
          <Container>
            <Typography variant='h6'>{'Page One'}</Typography>
            <Item></Item>
          </Container>
        </Item>
      </Container>
    </>
  );
};

export default PageOne;
