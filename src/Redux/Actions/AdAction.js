import axios from "axios";
import {
  AD_CREATE_FAIL,
  AD_CREATE_REQUEST,
  AD_CREATE_SUCCESS,
  AD_DELETE_FAIL,
  AD_DELETE_REQUEST,
  AD_DELETE_SUCCESS,
  AD_EDIT_FAIL,
  AD_EDIT_REQUEST,
  AD_EDIT_SUCCESS,
  AD_LIST_FAIL,
  AD_LIST_REQUEST,
  AD_LIST_SUCCESS,
  AD_UPDATE_FAIL,
  AD_UPDATE_REQUEST,
  AD_UPDATE_SUCCESS,
} from "../Constants/AdConstants";
import { logout } from "./userActions";

export const listAds = () => async (dispatch, getState) => {
  try {
    dispatch({ type: AD_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    var data;

    await axios
      .get(`/api/ad`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        baseURL: "https://backend-foodies-v2-drx1.vercel.app",
      })
      .then((res) => (data = res.data));

    dispatch({ type: AD_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: AD_LIST_FAIL,
      payload: message,
    });
  }
};

export const deleteAd = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: AD_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    await axios.delete(`/api/ad/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      baseURL: "https://backend-foodies-v2-drx1.vercel.app",
    });

    dispatch({ type: AD_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: AD_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createAd =
  (name, image, description) => async (dispatch, getState) => {
    try {
      dispatch({ type: AD_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      var adData = {
        name: name,
        image: image,
        description: description,
      };
      var data;

      await axios
        .post(`/api/ad`, adData, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          baseURL: "https://backend-foodies-v2-drx1.vercel.app",
        })
        .then((res) => (data = res.data));

      dispatch({ type: AD_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: AD_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const editAd = (id) => async (dispatch) => {
  try {
    dispatch({ type: AD_EDIT_REQUEST });
    var data;
    await axios
      .get(`/api/ad/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        baseURL: "https://backend-foodies-v2-drx1.vercel.app",
      })
      .then((res) => (data = res.data));

    dispatch({ type: AD_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: AD_EDIT_FAIL,
      payload: message,
    });
  }
};

export const updateAd = (ad) => async (dispatch, getState) => {
  try {
    dispatch({ type: AD_UPDATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    var data;

    await axios
      .put(`/api/ad/${ad._id}`, ad, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        baseURL: "https://backend-foodies-v2-drx1.vercel.app",
      })
      .then((res) => (data = res.data));

    dispatch({ type: AD_UPDATE_SUCCESS, payload: data });
    dispatch({ type: AD_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: AD_UPDATE_FAIL,
      payload: message,
    });
  }
};
