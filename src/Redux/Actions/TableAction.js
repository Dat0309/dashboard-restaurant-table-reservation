import axios from "axios";
import {
  TABLE_CREATE_FAIL,
  TABLE_CREATE_REQUEST,
  TABLE_CREATE_SUCCESS,
  TABLE_DELETE_FAIL,
  TABLE_DELETE_REQUEST,
  TABLE_DELETE_SUCCESS,
  TABLE_EDIT_FAIL,
  TABLE_EDIT_REQUEST,
  TABLE_EDIT_SUCCESS,
  TABLE_LIST_FAIL,
  TABLE_LIST_REQUEST,
  TABLE_LIST_SUCCESS,
  TABLE_UPDATE_FAIL,
  TABLE_UPDATE_REQUEST,
  TABLE_UPDATE_SUCCESS,
} from "../Constants/TableConstants";
import { logout } from "./userActions";

export const listTables = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TABLE_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    var data;

    await axios
      .get(`/api/tables`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        baseURL: "https://smart-fooding.herokuapp.com",
      })
      .then((res) => (data = res.data));

    dispatch({ type: TABLE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: TABLE_LIST_FAIL,
      payload: message,
    });
  }
};

export const listTableByRestaurant = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TABLE_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    var data;

    await axios
      .get(`/api/tables/restaurant-id/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        baseURL: "https://smart-fooding.herokuapp.com",
      })
      .then((res) => (data = res.data));

    dispatch({ type: TABLE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: TABLE_LIST_FAIL,
      payload: message,
    });
  }
};

export const deleteTable = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TABLE_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    await axios.delete(`/api/tables/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      baseURL: "https://smart-fooding.herokuapp.com",
    });

    dispatch({ type: TABLE_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: TABLE_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createTable =
  (code, capacity, restaurant_id) => async (dispatch, getState) => {
    try {
      dispatch({ type: TABLE_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      var tableData = {
        code: code,
        capacity: capacity,
        restaurant_id: restaurant_id,
      };
      var data;

      await axios
        .post(`/api/tables`, tableData, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          baseURL: "https://smart-fooding.herokuapp.com",
        })
        .then((res) => (data = res.data));

      dispatch({ type: TABLE_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: TABLE_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const editTable = (id) => async (dispatch) => {
  try {
    dispatch({ type: TABLE_EDIT_REQUEST });
    var data;
    await axios
      .get(`/api/tables/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        baseURL: "https://smart-fooding.herokuapp.com",
      })
      .then((res) => (data = res.data));

    dispatch({ type: TABLE_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: TABLE_EDIT_FAIL,
      payload: message,
    });
  }
};

export const updateTable = (table) => async (dispatch, getState) => {
  try {
    dispatch({ type: TABLE_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    var data;

    await axios
      .put(`/api/tables/${table._id}`, table, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        baseURL: "https://smart-fooding.herokuapp.com",
      })
      .then((res) => (data = res.data));

    dispatch({ type: TABLE_UPDATE_SUCCESS, payload: data });
    dispatch({ type: TABLE_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: TABLE_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const paidTable = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    await axios.put(
      `/api/tables/paid/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        baseURL: "https://smart-fooding.herokuapp.com",
      }
    );
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: TABLE_UPDATE_FAIL,
      payload: message,
    });
  }
};
