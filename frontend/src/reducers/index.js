import {combineReducers} from 'redux'
import UserReducer from './user'
import TaskReducer from './tasks'

export default combineReducers({
  UserReducer, TaskReducer
})