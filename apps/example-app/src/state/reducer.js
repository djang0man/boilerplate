// libs
import { handleActions } from 'redux-actions';

// actions
import { ExampleAppActions } from '@boilerplate/example-app/state/actions';

export const initialExampleAppState = {};

export const initialState = {
  cat: {},
  cats: [],
  apisHandlers: {
    catFetch: {
      errorMessage: '',
      isLoading: false,
    },
  },
};

const reducer = handleActions(
  {
    [ExampleAppActions.SET_FETCH_EXAMPLE_DATA]: (state, action) => {
      state.cat = action.payload;
      state.cats.push(action.payload);
      return state;
    },
    [ExampleAppActions.SET_FETCH_EXAMPLE_IS_LOADING]: (state, action) => {
      state.apisHandlers.catFetch.isLoading = action.payload.isLoading;
      return state;
    },
  },
  initialState
);

export default reducer;
