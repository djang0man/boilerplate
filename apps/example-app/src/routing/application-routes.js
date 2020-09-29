import React from 'react';
import { Route, Redirect, Switch } from 'react-router';

import { PageOne, PageTwo, MainLayout } from '@boilerplate/example-app/layouts';

export const ApplicationRoutes = (props) => {
  return (
    <MainLayout>
      <Switch>
        <Route exact id='pageOne' path='/page-one' component={PageOne} />
        <Route exact id='pageTwo' path='/page-two' component={PageTwo} />
        <Route exact path={'/'}>
          <Redirect to='/page-one' />
        </Route>
      </Switch>
    </MainLayout>
  );
};
