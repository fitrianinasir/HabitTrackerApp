import axios from 'axios';
import { BASE_URL } from '../BASE_URL';

export const REGISTER = "REGISTER"
export const LOGIN = "LOGIN"
export const GET_LIST_USER = "GET LIST USER"

export const getListUser = () => {
  console.log("2. Successfully get register action")
  return(dispatch) => {
    dispatch({
      // loading
      type: GET_LIST_USER,
      payload: {
        loading: true,
        data: false,
        errorMessage: false
      }
    })

    // getAPI
    axios({
      method:"GET",
      url: `${BASE_URL}/users`,
      timeout:10000
    }).then(res => {
      dispatch({
        type: GET_LIST_USER,
        payload: {
          loading: false,
          data: res.data,
          errorMessage: false
        }
      })
    }).catch(err => {
      dispatch({
        type: GET_LIST_USER,
        payload: {
          loading: false,
          data: false,
          errorMessage: err
        }
      })
    })
  }
}