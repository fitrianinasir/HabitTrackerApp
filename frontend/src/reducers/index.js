import {combineReducers} from 'redux'
import UserReducer from './user'
import TaskReducer from './tasks'
import BoardReducer from './boards'
export default combineReducers({
  UserReducer, TaskReducer, BoardReducer
})