// libs
import { handleActions } from 'redux-actions';

// actions
import * as APP from '@boilerplate/example-app/state/app/actions';

// routes
import { getTabIndex } from '@boilerplate/example-app/routing';

// utils
import { immerHistory } from '@boilerplate/shared/util';

export const initialState = {
  currentTabIndex: getTabIndex(immerHistory?.location?.pathname),
};

const reducer = handleActions(
  {
    [APP.UPDATE_SELECTED_TAB_INDEX]: (state, action) => {
      state.currentTabIndex = action.payload.selectedTabIndex;
      return state;
    },
  },
  initialState
);

export default reducer;
