import { all } from 'redux-saga/effects';
import {
  loginWatcherSaga,
} from './sagas';

export default function* rootSaga() {
  yield all([
    loginWatcherSaga(),
    // add other watchers to the array
  ]);
}
