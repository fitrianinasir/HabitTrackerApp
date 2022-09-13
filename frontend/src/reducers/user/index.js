import {GET_LIST_USER} from '../../action/userAction'


const initialState = {
  getUserList : false,
  getUserListLoading: false,
  getUserListError: false,
  createUser : false,
  createUserLoading: false,
  createUserError: false,
}

const user = (state = initialState, action) => {
  console.log("3. Successfully load reducers")
  switch(action.type){
    case GET_LIST_USER:
      return{
        ...state,
        getUserList : action.payload.data,
        getUserListLoading: action.payload.loading,
        getUserListError: action.payload.errorMessage,
      }
    default:
      return state
  }
}

export default user