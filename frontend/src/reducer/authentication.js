import {
  ACTION_LOGIN,
  ACTION_REGISTER,
  ACTION_UPDATE_FIELD_AUTH,
  ACTION_LOGIN_PAGE_UNLOADED,
  ACTION_REGISTER_PAGE_UNLOADED
} from '../actions';

export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_LOGIN:
      return {
        ...state,
        authData: action.payload,
        error: 'Invalid Data, Please enter again.'
      }
    case ACTION_REGISTER:
      return {
        ...state,
        errors: action.error ? action.payload.errors : null
      };
    case ACTION_UPDATE_FIELD_AUTH:
      return { ...state,
        error: '',
        [action.key]: action.value
      };
    case ACTION_LOGIN_PAGE_UNLOADED:
    case ACTION_REGISTER_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};