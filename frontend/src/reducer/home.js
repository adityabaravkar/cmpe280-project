import { ACTION_UPDATE_FIELD_HOME, ACTION_HOME_UNLOADED } from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_UPDATE_FIELD_HOME:
      return {
        ...state,
        [action.key]: action.value
      };
    case ACTION_HOME_UNLOADED:
      return {};
    default:
      return state;
  }
};