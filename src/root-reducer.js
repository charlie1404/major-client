import { combineReducers } from 'redux';

function retrieved(state = null, action) {
  switch (action.type) {
    case 'BOOK_SHOW_SUCCESS':
    case 'BOOK_SHOW_MERCURE_MESSAGE':
      return action.retrieved;

    case 'BOOK_SHOW_RESET':
      return null;

    default:
      return state;
  }
}

export default combineReducers({
  retrieved,
});
