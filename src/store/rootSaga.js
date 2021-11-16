import { all, fork } from 'redux-saga/effects';
import usersSage from '@modules/users/saga';
import featuresSage from '@modules/features/saga';

/**
 * Root saga
 * @returns {IterableIterator<AllEffect | GenericAllEffect<any> | *>}
 */
export default function* rootSaga() {
  yield all([fork(usersSage), fork(featuresSage)]);
}
