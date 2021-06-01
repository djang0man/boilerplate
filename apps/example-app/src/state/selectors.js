// libs
import { createSelector } from 'reselect';

const exampleAppStateSelector = state => state?.EXAMPLE;
const exampleAppStateApisHandlers = state => state?.EXAMPLE?.apisHandlers;

export const selectExampleAppCat = createSelector(
  exampleAppStateSelector,
  state => state?.cat
);

export const selectExampleAppCats = createSelector(
  exampleAppStateSelector,
  state => state?.cats
);

export const selectCatFetchIsLoading = createSelector(
  exampleAppStateApisHandlers,
  state => state?.catFetch?.isLoading
);
