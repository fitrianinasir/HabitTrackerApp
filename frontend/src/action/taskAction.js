import axios from "axios";
import { BASE_URL } from "../BASE_URL";

export const LANES = "LANES";

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
            data: {lanes: res.data},
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
