import { put, call, select, takeEvery, takeLatest } from 'redux-saga/effects';

import { reset, resetUsers } from './slice';

function* resetSaga() {
    try {
        yield put(resetUsers());
    } catch (error) {}
}
export default function* usersSaga() {
    yield takeLatest(reset.type, resetSaga);
}
