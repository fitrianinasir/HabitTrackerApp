import { LANES, UPDATE_LANE } from "../../action/taskAction";

const initialState = {
  getLaneList: false,
  getLanesLoading: false,
  getLanesError: false,
  updateLaneList: false,
  updateLanesLoading: false,
  updateLanesError: false,
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

    case UPDATE_LANE:return {
      ...state,
      updateLaneList: action.payload.data,
      updateLanesLoading: action.payload.loading,
      updateLanesError: action.payload.errorMessage,
    };

    default:
      return state;
  }
};

export default lane;
