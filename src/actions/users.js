import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
} from '../constants/actions';
import { LOGIN_ROUTE } from '../constants/endpoints';
import apiHandler from './helpers/api-handler';

export const login = (email, password) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  return apiHandler(LOGIN_ROUTE.route, LOGIN_ROUTE.method, { email, password })
    .then((data) => {
      dispatch({ type: LOGIN_SUCCESS });
    })
    .catch(() => {
      setTimeout(() => {
        dispatch({ type: LOGIN_FAILED });
      }, 200);
    });
};

export const register = (email, password) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  const data = await apiHandler('user/login', 'post', { email, password });
  return dispatch({ type: REGISTER_SUCCESS, payload: data });
};
