import { combineReducers } from 'redux'
import recentSearch from './recentSearch'
import banner from './banner'
import componentState from './componentState'
import auth from './auth'

const rootReducer = combineReducers({
    recentSearch,
    banner,
    componentState,
    auth
})

export default rootReducer