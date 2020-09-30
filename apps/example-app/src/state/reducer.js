// libs
import { handleActions } from "redux-actions";

// actions
import { ExampleAppActions } from "@boilerplate/example-app/state/actions";

export const initialExampleAppState = {};

export const initialState = {
  posts: [],
  apisHandlers: {
    exampleFetch: {
      errorMessage: "",
      isLoading: false,
    },
  },
};

const reducer = handleActions(
  {
    [ExampleAppActions.INIT_EXAMPLE_APP]: (state, action) => {
      state.exampleApp.isLoading = true;
      return state;
    },
    [ExampleAppActions.SET_FETCH_EXAMPLE_DATA]: (state, action) => {
      state.posts = action.payload;
      return state;
    },
  },
  initialState
);

export default reducer;
