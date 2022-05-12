import { ACTION_LOGIN } from "../actions";
import { Authentication } from "../services";

const promiseMiddleware = store => next => action => {
    if (isPromise(action.payload)) {
        action.payload.then(
            res => {
                action.payload = res;
                store.dispatch(action);
            },
            error => {
                action.error = true;
                action.payload = {};
                action.errorMessage = error;
                store.dispatch(action);
            }
        );
        return;
    }
    next(action);
};

function isPromise(v) {
    return v && typeof v.then === 'function';
}

const authenticationMiddleware = store => next => action => {
    if (action.type === ACTION_LOGIN) {
        if (!action.error) {
            // console.log(action.payload)
            const token = action.payload.token
            const userId = action.payload.user.id
            console.log(action.payload.user.role)
            const type = action.payload.user.role ? action.payload.user.role.toUpperCase() : 'TRAVELER';
            Authentication.setAuthData(userId, token, type);
            Authentication.setUserDetails(action.payload.user)
        }
    }
    next(action);
};

export {
    promiseMiddleware,
    authenticationMiddleware
}