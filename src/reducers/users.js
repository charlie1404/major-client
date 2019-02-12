import { Map } from 'immutable';

import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from '../constants/actions';

const initialState = Map({
  isLoading: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return state
        .set('isLoading', true);
    }

    case LOGIN_FAILED: {
      return state
        .set('isLoading', false);
    }

    case LOGIN_SUCCESS: {
      return state
        .set('isLoading', false);
    }

    default: {
      return state;
    }
  }
};
