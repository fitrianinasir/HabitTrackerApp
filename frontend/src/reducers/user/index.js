import { GET_LIST_USER, REGISTER, DELETE_USER } from "../../action/userAction";

const initialState = {
  getUserList: false,
  getUserListLoading: false,
  getUserListError: false,
  createUser: false,
  createUserLoading: false,
  createUserError: false,
  deleteUser: false,
  deleteUserLoading: false,
  deleteUserError: false,
};

const user = (state = initialState, action) => {
  console.log("3. Successfully load reducers");
  switch (action.type) {
    case GET_LIST_USER:
      return {
        ...state,
        getUserList: action.payload.data,
        getUserListLoading: action.payload.loading,
        getUserListError: action.payload.errorMessage,
      };

    case REGISTER:
      return {
        ...state,
        createUser: action.payload.data,
        createUserLoading: action.payload.loading,
        createUserError: action.payload.errorMessage,
      };

    case DELETE_USER:
      return {
        ...state,
        deleteUser: action.payload.data,
        deleteUserLoading: action.payload.loading,
        deleteUserError: action.payload.errorMessage,
      };

    default:
      return state;
  }
};

export default user;
