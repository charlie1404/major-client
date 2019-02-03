import axios from 'axios';
import { takeLatest, call, put } from 'redux-saga/effects';

export function loginWatcher(authParams) {
  return { type: 'LOGIN_WATCHER', payload: authParams };
}
export function updateProfile(profile) {
  return { type: 'UPDATE_PROFILE', payload: profile };
}

/** function that returns an axios call */
function loginApi(authParams) {
  return axios.request({
    method: 'post',
    url: '/oauth/app',
    data: authParams
  });
}
/** saga worker that is responsible for the side effects */
function* loginEffectSaga(action) {
  try {
    // data is obtained after axios call is resolved
    const { data } = yield call(loginApi, action.payload);

    // store data to localStorage
    Object.keys(data.session).forEach((key) => {
      localStorage.setItem(key, data[key]);
    });
    // dispatch action to change redux state
    yield put(updateProfile(data.profile));
    // redirect to home route after successful login
    console.log('test');
  } catch (e) {
    // catch error on a bad axios call
    // alert using an alert library
  }
}
/**
 * saga watcher that is triggered when dispatching action of type
 * 'LOGIN_WATCHER'
 */
export function* loginWatcherSaga() {
  yield takeLatest('LOGIN_WATCHER', loginEffectSaga);
}
