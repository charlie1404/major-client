import { push } from 'connected-react-router';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
} from '../constants/actions';
import { LOGIN_ROUTE, LOGOUT_ROUTE } from '../constants/endpoints';
import apiHandler from './helpers/api-handler';

export const login = (email, password) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  return apiHandler(LOGIN_ROUTE.route, LOGIN_ROUTE.method, { email, password })
    .then((data) => {
      dispatch({ type: LOGIN_SUCCESS });
      dispatch(push({ pathname: '/app' }));
    })
    .catch(() => {
      dispatch({ type: LOGIN_FAILED });
    });
};

export const logout = () => (dispatch) => {
  return apiHandler(LOGOUT_ROUTE.route, LOGOUT_ROUTE.method)
    .then(() => {
      dispatch(push({ pathname: '/login' }));
    })
    .catch(() => {
      dispatch(push({ pathname: '/login' }));
    });
};

export const register = (email, password) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  const data = await apiHandler('user/login', 'post', { email, password });
  return dispatch({ type: REGISTER_SUCCESS, payload: data });
};
