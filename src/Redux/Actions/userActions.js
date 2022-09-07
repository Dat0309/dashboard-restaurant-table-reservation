import {
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../Constants/UserContants";
import axios from "axios";
import { toast } from "react-toastify";

// LOGIN
export const login = (username, password) => async (dispatch) => {
  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };

  var loginInfo = {
    username: username,
    password: password
  }

  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    var data;

    await axios.post('/api/users/login',
      loginInfo,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        baseURL: 'https://smart-fooding.herokuapp.com'
      }
    ).then(res => {
      data = res.data
    }).catch(error => false);

    console.log(data)

    if (data.role !== undefined) {
      if (data.role === "admin") {
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      }
      else {
        toast.error("Bạn không có quyền ADMIN", ToastObjects);
        dispatch({
          type: USER_LOGIN_FAIL,
        });
      }
    }


    localStorage.setItem("userInfo", JSON.stringify(data));

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: message,
    });
  }
};

// LOGOUT
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_LIST_RESET });
};

// ALL USER
export const listUser = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      baseURL: 'https://smart-fooding.herokuapp.com'
    };

    const { data } = await axios.get(`/api/users`, config).then(res => console.log(res.data));
    console.log(data)

    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_LIST_FAIL,
      payload: message,
    });
  }
};
