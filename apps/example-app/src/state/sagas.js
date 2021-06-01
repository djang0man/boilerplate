import { all, put, select, takeLatest } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';

// helpers
import { buildAction } from '@boilerplate/shared/util';

// actions
import { ExampleAppActions } from '@boilerplate/example-app/state/actions';

// services
import svc from '@boilerplate/example-app/service';

// sagas
export function* fetchExample() {
  yield put(
    buildAction(ExampleAppActions.SET_FETCH_EXAMPLE_IS_LOADING, {
      isLoading: true,
    })
  );

  const res = yield svc.fetchCat();

  if (res?.data) {
    yield put(buildAction(ExampleAppActions.FETCH_EXAMPLE_SUCCESS));
    yield put(
      buildAction(ExampleAppActions.SET_FETCH_EXAMPLE_DATA, res.data[0])
    );
  } else {
    const message = res;
    console.error(message);
    yield put(
      buildAction(ExampleAppActions.FETCH_EXAMPLE_FAIL, {
        message,
      })
    );
  }

  yield put(
    buildAction(ExampleAppActions.SET_FETCH_EXAMPLE_IS_LOADING, {
      isLoading: false,
    })
  );
}

export default function* watchAll() {
  yield all([takeLatest(ExampleAppActions.FETCH_EXAMPLE, fetchExample)]);
}
