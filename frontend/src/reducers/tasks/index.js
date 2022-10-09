import { LANES } from "../../action/taskAction";

const initialState = {
  getLaneList: false,
  getLanesLoading: false,
  getLanesError: false,
};

const lane = (state = initialState, action) => {
  switch (action.type) {
    case LANES:
      return {
        ...state,
        getLaneList: action.payload.data,
        getLanesLoading: action.payload.loading,
        getLanesError: action.payload.errorMessage,
      };

    default:
      return state;
  }
};

export default lane;
