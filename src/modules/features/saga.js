import { put, call, select, takeEvery, takeLatest } from 'redux-saga/effects';

import { reset, resetFeatures } from './slice';

function* resetSaga() {
  try {
    yield put(resetFeatures());
  } catch (error) {}
}
export default function* featuresSaga() {
  yield takeLatest(reset.type, resetSaga);
}
