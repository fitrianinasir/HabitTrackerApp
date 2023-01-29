import axios from "axios";
import { BASE_URL } from "../BASE_URL";
import Swal from "sweetalert2";

export const BOARDS = "BOARDS";
export const CREATE_BOARD = "CREATE_BOARD";
export const REORDER_BOARD = "REORDER_BOARD"
export const getBoards = () => {
  return (dispatch) => {
    // loading
    dispatch({
      type: BOARDS,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // getAPI
    axios({
      method: "GET",
      url: `${BASE_URL}/boards`,
      timeout: 10000,
    })
      .then((res) => {
        dispatch({
          type: BOARDS,
          payload: {
            loading: false,
            data: res.data.boards,
            errorMessage: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: BOARDS,
          payload: {
            loading: false,
            data: false,
            errorMessage: err,
          },
        });
      });
  };
};

export const createBoard = (data) => {
  return (dispatch) => {
    dispatch({
      type: CREATE_BOARD,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // API
    axios
      .post(`${BASE_URL}/board`, data)
      .then((res) => {
        Swal.fire("Success!", "Data submitted sucessfully", "success").then(
          (move) => {
            dispatch(getBoards());
          }
        );
        console.log(res);
        
      })
      .catch((err) => {
        dispatch({
          type: CREATE_BOARD,
          payload: {
            loading: false,
            data: false,
            errorMessage: err.message,
          },
        });
      });
  };
};

export const reorderBoard = (data) => {
  return(dispatch => {
    dispatch({
      type: REORDER_BOARD,
      payload:{
        loading: true,
        data: false,
        errorMessage: false
      }
    })

    // API CALLED
    axios.put(`${BASE_URL}/reorder`, {data: data}).then(res => {
      console.log(res)
      dispatch(getBoards());
    }).catch(err => {
      dispatch({
        type: REORDER_BOARD,
        payload: {
          loading: false,
          data: false,
          errorMessage: err.message
        }
      })
    })
  })
}