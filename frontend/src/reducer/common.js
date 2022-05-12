import { ACTION_REDIRECT, ACTION_LOGIN, ACTION_REGISTER, ACTION_SUBMIT_HOME } from "../actions";
import { Authentication } from "../services";
import { TRAVELER_DASHBOARD, OWNER_DASHBOARD, TRAVELER_PROPERTY_SEARCH } from "../data";

export default (state = {}, action) => {
  switch (action.type) {
    //   case APP_LOAD:
    //     return {
    //       ...state,
    //       token: action.token || null,
    //       appLoaded: true,
    //       currentUser: action.payload ? action.payload.user : null
    //     };
    case ACTION_REDIRECT:
      return { ...state, redirectTo: null };
    case ACTION_SUBMIT_HOME:
    const redirectUrl = TRAVELER_PROPERTY_SEARCH;
      return { ...state, redirectTo: redirectUrl};
    case ACTION_LOGIN:
    case ACTION_REGISTER:
      console.log(Authentication.isUserLoggedIntoTravelerMode())
      return {
        ...state,
        redirectTo: action.error ? null : (Authentication.isUserLoggedIntoTravelerMode() ? TRAVELER_DASHBOARD : OWNER_DASHBOARD)
      };
    default:
      return state;
  }
};
