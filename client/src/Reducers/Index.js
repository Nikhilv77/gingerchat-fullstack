import {combineReducers} from 'redux'
import {AuthReducer} from './AuthReducer'
import {PostReducer} from './PostReducer'
import { GetAllPostsReducer } from './PostReducer'
import { UserReducer, friendRequest } from './UserReducer'


const reducers = combineReducers({AuthReducer,PostReducer,GetAllPostsReducer,UserReducer})
export default reducers