import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authentication from './authentication'
import home from './home'
import common from './common'
import search from './search'
import property from './property'

export default combineReducers({
    authentication,
    home,
    search,
    property,
    common,
    router: routerReducer
})