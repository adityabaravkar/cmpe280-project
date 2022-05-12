import { ACTION_UPDATE_FIELD_PROPERTY_DETAIL, ACTION_PROPERTY_DETAIL_UNLOADED, ACTION_PROPERTY_DETAIL_SET } from "../actions";

const defaultState = { searchData: {}, searchResult: {}, pager: {} }

export default (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_UPDATE_FIELD_PROPERTY_DETAIL:
      return {
        ...state,
        [action.key]: action.value
      };
    case ACTION_PROPERTY_DETAIL_SET:
      return {
        ...state,
        propertyDetail: action.value
      };
    case ACTION_PROPERTY_DETAIL_UNLOADED:
      return {};
    default:
      return state;
  }
};