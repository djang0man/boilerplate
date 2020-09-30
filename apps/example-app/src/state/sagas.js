import { all, put, select, takeLatest } from "redux-saga/effects";
import { v4 as uuidv4 } from "uuid";

// helpers
import { buildAction } from "@boilerplate/shared/util";

// actions
import { ExampleAppActions } from "@boilerplate/example-app/state/actions";

// services
import svc from "@boilerplate/example-app/service";

// sagas
export function* createExample() {
  const exampleUUID = uuidv4();

  const example = {
    exampleUUID,
    name: "",
    description: "",
    updatedAt: null,
  };

  yield put(buildAction(ExampleAppActions.CREATE_EXAMPLE, example));
}

export function* postExample({ payload }) {
  const name = payload?.name;
  const description = payload?.description;

  const res = yield svc.postExample({ name, description });

  if (res?.data) {
    yield put(buildAction(ExampleAppActions.POST_EXAMPLE_SUCCESS, res?.data));
  } else {
    const message = res;
    console.error(message);
    yield put(
      buildAction(ExampleAppActions.POST_EXAMPLE_FAIL, {
        message,
      })
    );
  }
}

export function* fetchExample() {
  const res = yield svc.fetchPosts();

  if (res?.data) {
    yield put(buildAction(ExampleAppActions.FETCH_EXAMPLE_SUCCESS));
    yield put(buildAction(ExampleAppActions.SET_FETCH_EXAMPLE_DATA, res.data));
  } else {
    const message = res;
    console.error(message);
    yield put(
      buildAction(ExampleAppActions.FETCH_EXAMPLE_FAIL, {
        message,
      })
    );
  }
}

export function* updateExample({ payload }) {
  const { example } = payload;

  const res = yield svc.updateExample({ example });

  if (res?.data) {
    yield put(buildAction(ExampleAppActions.UPDATE_EXAMPLE_SUCCESS, res?.data));
  } else {
    const message = res;
    console.error(message);
    yield put(
      buildAction(ExampleAppActions.UPDATE_EXAMPLE_FAIL, {
        message,
      })
    );
  }
}

export function* deleteExample({ payload }) {
  const id = payload?.id;

  const res = yield svc.deleteExample({ id });

  if (res?.data) {
    yield put(buildAction(ExampleAppActions.DELETE_EXAMPLE_SUCCESS, res?.data));
  } else {
    const message = res;
    console.error(message);
    yield put(
      buildAction(ExampleAppActions.DELETE_EXAMPLE_FAIL, {
        message,
      })
    );
  }
}

export default function* watchAll() {
  yield all([
    takeLatest(ExampleAppActions.POST_EXAMPLE, postExample),
    takeLatest(ExampleAppActions.FETCH_EXAMPLE, fetchExample),
    takeLatest(ExampleAppActions.UPDATE_EXAMPLE, updateExample),
    takeLatest(ExampleAppActions.DELETE_EXAMPLE, deleteExample),
    takeLatest(ExampleAppActions.CREATE_EXAMPLE, createExample),
  ]);
}
