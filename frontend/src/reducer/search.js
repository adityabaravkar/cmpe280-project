import { ACTION_SUBMIT_HOME, ACTION_UPDATE_FIELD_SEARCH, ACTION_SEARCH_UNLOADED, ACTION_SUBMIT_SEARCH } from "../actions";

const defaultState = { searchData: {}, searchResult: {}, pager: {} }

export default (state = defaultState, action) => {
  switch (action.type) {
    case ACTION_SUBMIT_HOME:
      return {
        ...state,
        searchData: action.value
      };
    case ACTION_UPDATE_FIELD_SEARCH:
    const searchDataNew = {
      ...state.searchData,
      [action.key]: action.value
    }
    return {
        ...state,
        searchData : searchDataNew
      };
    case ACTION_SUBMIT_SEARCH:
      return {
        ...state,
        pager: action.payload.pager,
        searchResult: action.payload.payLoad
      }
    case ACTION_SEARCH_UNLOADED:
      return {};
    default:
      return state;
  }
};