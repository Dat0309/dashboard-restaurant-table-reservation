import axios from "axios";
import {
  BOOKING_DETAILS_FAIL,
  BOOKING_DETAILS_REQUEST,
  BOOKING_DETAILS_SUCCESS,
  BOOKING_LIST_FAIL,
  BOOKING_LIST_REQUEST,
  BOOKING_LIST_SUCCESS,
} from "../Constants/BookingConstants";
import { logout } from "./userActions";

export const listBookings = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOKING_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    var data;

    await axios
      .get(`/api/bookings/restaurant-id/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        baseURL: "https://smart-fooding.herokuapp.com",
      })
      .then((res) => (data = res.data));

    dispatch({ type: BOOKING_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BOOKING_LIST_FAIL,
      payload: message,
    });
  }
};

export const getBookingDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: BOOKING_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    var data;

    await axios
      .get(`/api/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        baseURL: "https://smart-fooding.herokuapp.com",
      })
      .then((res) => (data = res.data));

    dispatch({ type: BOOKING_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: BOOKING_DETAILS_FAIL,
      payload: message,
    });
  }
};
