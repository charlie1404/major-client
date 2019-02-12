import { combineReducers } from 'redux';

function loading(state = false, action) {
  switch (action.type) {
    case 'BOOK_CREATE_LOADING':
      return action.loading;

    default:
      return state;
  }
}


export default combineReducers({ loading });
