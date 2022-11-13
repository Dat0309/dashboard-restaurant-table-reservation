import {
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_CREATE_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_EDIT_FAIL,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
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
    password: password,
  };

  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    var data;

    await axios
      .post("/api/users/login", loginInfo, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        baseURL: "https://smart-fooding.herokuapp.com",
      })
      .then((res) => {
        data = res.data;
      })
      .catch((error) => false);

    console.log(data);

    if (data.role !== undefined) {
      if (data.role === "admin" || data.role === "owners") {
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      } else {
        toast.error("Bạn không có quyền truy cập trang quản trị", ToastObjects);
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
export const listUser =
  (limit = 1000, page = 2) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: USER_LIST_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      console.log(userInfo.token);

      var data;

      await axios
        .get(`/api/users?limit=${limit}&page=${page}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          baseURL: "https://smart-fooding.herokuapp.com",
        })
        .then((res) => (data = res.data));
      console.log(data);

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

// CREATE USER
export const createUser =
  (
    first_name,
    last_name,
    email,
    phone_number,
    username,
    avatar,
    thumb,
    province,
    district,
    ward,
    street,
    longitude,
    latitude,
    role
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: USER_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      var userData = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone_number: phone_number,
        username: username,
        password: "123456",
        avatar: avatar,
        thumb: thumb,
        province: province,
        district: district,
        ward: ward,
        street: street,
        longitude: longitude,
        latitude: latitude,
        role: role,
      };
      var data;

      await axios
        .post(`/api/users`, userData, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          baseURL: "https://smart-fooding.herokuapp.com",
        })
        .then((res) => (data = res.data));

      dispatch({ type: USER_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: USER_CREATE_FAIL,
        payload: message,
      });
    }
  };

// EDIT USER
export const editUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_EDIT_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    var data;
    await axios
      .get(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        baseURL: "https://smart-fooding.herokuapp.com",
      })
      .then((res) => (data = res.data));
    dispatch({ type: USER_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE USER
export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    var data;

    await axios
      .put(`/api/users/${user._id}`, user, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        baseURL: "https://smart-fooding.herokuapp.com",
      })
      .then((res) => (data = res.data));

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    dispatch({ type: USER_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message,
    });
  }
};
