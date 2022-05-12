import { applyMiddleware, createStore} from 'redux'
import reducer from '../reducer'

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { routerMiddleware } from 'react-router-redux'
import { promiseMiddleware, authenticationMiddleware } from '../middleware';
import createHistory from 'history/createBrowserHistory'

export const history = createHistory();

const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => {return applyMiddleware(myRouterMiddleware, promiseMiddleware, authenticationMiddleware)}

export const store = createStore(reducer, composeWithDevTools(getMiddleware()));
