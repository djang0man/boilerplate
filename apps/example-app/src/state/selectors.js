// libs
import { createSelector } from 'reselect';

const exampleAppStateSelector = (state) => state?.EXAMPLE_APP.exampleApp;

export const selectExampleAppName = createSelector(
  exampleAppStateSelector,
  (state) => state?.name
);

export const selectExampleAppDescription = createSelector(
  exampleAppStateSelector,
  (state) => state?.description
);

export const selectExampleAppPosts = createSelector(
  exampleAppStateSelector,
  (state) => state?.posts
);
