import {
  GET_LIST_USER,
  REGISTER,
  LOGIN,
  DELETE_USER,
  UPDATE_USER,
  MASS_DELETE_USER,
} from "../../action/userAction";

const initialState = {
  getUserList: false,
  getUserListLoading: false,
  getUserListError: false,
  createUser: false,
  createUserLoading: false,
  createUserError: false,
  loginUser: false,
  loginUserLoading: false,
  loginUserError: false,
  updateUser: false,
  updateUserLoading: false,
  updateUserError: false,
  deleteUser: false,
  deleteUserLoading: false,
  deleteUserError: false,
  deleteMassUser: false,
  deleteMassUserLoading: false,
  deleteMassUserError: false,
};

const user = (state = initialState, action) => {
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

    case LOGIN:
      return {
        ...state,
        loginUser: action.payload.data,
        loginUserLoading: action.payload.loading,
        loginUserError: action.payload.errorMessage,
      };

    case UPDATE_USER:
      return {
        ...state,
        updateUser: action.payload.data,
        updateUserLoading: action.payload.loading,
        updateUserError: action.payload.errorMessage,
      };

    case DELETE_USER:
      return {
        ...state,
        deleteUser: action.payload.data,
        deleteUserLoading: action.payload.loading,
        deleteUserError: action.payload.errorMessage,
      };

    case MASS_DELETE_USER:
      return {
        ...state,
        deleteMassUser: action.payload.data,
        deleteMassUserLoading: action.payload.loading,
        deleteMassUserError: action.payload.errorMessage,
      };

    default:
      return state;
  }
};

export default user;
