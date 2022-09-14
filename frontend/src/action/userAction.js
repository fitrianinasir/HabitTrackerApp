import axios from "axios";
import { BASE_URL } from "../BASE_URL";
import Swal from "sweetalert2";

export const REGISTER = "REGISTER";
export const LOGIN = "LOGIN";
export const GET_LIST_USER = "GET LIST USER";
export const UPDATE_USER = "UPDATE USER";
export const DELETE_USER = "DELETE USER";
export const MASS_DELETE_USER = "MASS_DELETE_USER";

export const getListUser = () => {
  return (dispatch) => {
    // loading
    dispatch({
      type: GET_LIST_USER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // getAPI
    axios({
      method: "GET",
      url: `${BASE_URL}/users`,
      timeout: 10000,
    })
      .then((res) => {
        dispatch({
          type: GET_LIST_USER,
          payload: {
            loading: false,
            data: res.data,
            errorMessage: false,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: GET_LIST_USER,
          payload: {
            loading: false,
            data: false,
            errorMessage: err,
          },
        });
      });
  };
};

export const register = (data) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: REGISTER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // getAPI
    axios({
      method: "POST",
      url: `${BASE_URL}/register`,
      data: data,
      timeout: 10000,
    })
      .then((res) => {
        Swal.fire("Success!", "Data submitted sucessfully", "success").then(
          (move) => {
            dispatch({
              type: REGISTER,
              payload: {
                loading: false,
                data: res.data,
                errorMessage: false,
              },
            });
            dispatch(getListUser());
          }
        );
      })
      .catch((err) => {
        dispatch({
          type: REGISTER,
          payload: {
            loading: false,
            data: false,
            errorMessage: err,
          },
        });
      });
  };
};

export const deleteUser = (id) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: DELETE_USER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // getAPI
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      await axios
        .delete(`${BASE_URL}/user/${id}`)
        .then((res) => {
          if (result.isConfirmed) {
            Swal.fire(
              "Deleted!",
              "Your file has been deleted.",
              "success"
            ).then((move) => {
              dispatch(getListUser());
              dispatch({
                type: DELETE_USER,
                payload: {
                  loading: false,
                  data: res.data,
                  errorMessage: false,
                },
              });
            });
          }
        })
        .catch((err) => {
          dispatch({
            type: DELETE_USER,
            payload: {
              loading: false,
              data: false,
              errorMessage: err,
            },
          });
        });
    });
  };
};

export const updateUser = (id, data) => {
  console.log(id, data);
  return (dispatch) => {
    // loading
    dispatch({
      type: UPDATE_USER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // getAPI
    axios
      .put(`${BASE_URL}/user/${id}`, data)
      .then((res) => {
        console.log(res.data);
        Swal.fire("Success!", "Data updated sucessfully", "success").then(
          (move) => {
            dispatch({
              type: UPDATE_USER,
              payload: {
                loading: false,
                data: res.data,
                errorMessage: false,
              },
            });

            // dispatch(getListUser());
          }
        );
      })
      .catch((err) => {
        dispatch({
          type: UPDATE_USER,
          payload: {
            loading: false,
            data: false,
            errorMessage: err,
          },
        });
      });
  };
};

export const massDeleteUser = (IDs) => {
  return (dispatch) => {
    // loading
    dispatch({
      type: MASS_DELETE_USER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false,
      },
    });

    // getAPI
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      await axios
        .post(`${BASE_URL}/delete-users`, IDs)
        .then((res) => {
          if (result.isConfirmed) {
            Swal.fire(
              "Deleted!",
              "Your data has been deleted.",
              "success"
            ).then((move) => {
              dispatch(getListUser());
              dispatch({
                type: MASS_DELETE_USER,
                payload: {
                  loading: false,
                  data: res.data,
                  errorMessage: false,
                },
              });
            });
          }
        })
        .catch((err) => {
          dispatch({
            type: MASS_DELETE_USER,
            payload: {
              loading: false,
              data: false,
              errorMessage: err,
            },
          });
        });
    });
  };
};
