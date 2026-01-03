import {call, put, takeEvery} from 'redux-saga/effects';
import {
  GET_MESSAGE_COUNT,
  setMessageCount,
} from '../actions/auth.action';

// Helper function to get message count
function getMessageCount() {
  return Promise.resolve({ data: { count: 0 } });
}

// LOGIN_USER
function* getMessageCountHandler() {
  try {
    const resp = yield call(getMessageCount);
    console.log(resp, 'response count');
    yield put(setMessageCount(resp?.data?.count || 0));
  } catch (error) {
    console.log(error);
    yield put(setMessageCount(0));
  }
}

// use them in parallel
export default function* authSaga() {
  yield takeEvery(GET_MESSAGE_COUNT, getMessageCountHandler);
}
