import axios from "axios";
import { BASE_URL } from "../BASE_URL";

export const LANES = "LANES";
export const CREATE_LANE = "CREATE_LANE";
export const UPDATE_LANE = "UPDATE_LANE";

export const getLanes = () => {
  return (dispatch) => {
    // loading
    dispatch({
      type: LANES,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // getAPI
    axios({
      method: "GET",
      url: `${BASE_URL}/lanes`,
      timeout: 10000,
    })
      .then((res) => {
        dispatch({
          type: LANES,
          payload: {
            loading: false,
            data: { lanes: res.data },
            errorMessage: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: LANES,
          payload: {
            loading: false,
            data: false,
            errorMessage: err,
          },
        });
      });
  };
};

export const createLane = (data) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: CREATE_LANE,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // getAPI
    axios
      .post(`${BASE_URL}/lane`, data)
      .then((res) => {
        return
        // dispatch(getLanes());
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateLane = (id, data) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: UPDATE_LANE,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // getAPI
    axios
    .put(`${BASE_URL}/lane/${id}`, data)
    .then((res) => {
      return
      
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_LANE,
        payload: {
          loading: false,
          data: false,
          errorMessage: err,
        },
      });
    });
  };
};

export const deleteLane = (id) => {
  return async (dispatch) => {
    // getAPI
    await axios
      .delete(`${BASE_URL}/lane/${id}`)
      .then((res) => {
        // dispatch(getLanes());
        return
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
