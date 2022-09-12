import {
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_EDIT_FAIL,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from "../Constants/ProductConstants";
import axios from "axios";
import { logout } from "./userActions";

export const listProducts = (keyword = " ", pageNumber = " ") => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();
    var data;

    await axios.get(
      `/api/product?keyword=${keyword}&pageNumber=${pageNumber}`, 
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        baseURL: 'https://smart-fooding.herokuapp.com'
      }).then(res=> data = res.data);

    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: message,
    });
  }
};

// DELETE PRODUCT
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    await axios.delete(
      `/api/product/${id}`, 
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        baseURL: 'https://smart-fooding.herokuapp.com'
      });

    dispatch({ type: PRODUCT_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: message,
    });
  }
};

// CREATE PRODUCT
export const createProduct =
  (name, categories_id, price, description, image, unit, menu_id) =>
    async (dispatch, getState) => {
      try {
        dispatch({ type: PRODUCT_CREATE_REQUEST });

        const {
          userLogin: { userInfo },
        } = getState();

        var productData = {
          name: name,
          image: image,
          categories_id: categories_id,
          menu_id: menu_id,
          description: description,
          price: price,
          unit: unit
        };
        var data;

        await axios.post(
          `/api/product`,
          productData,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            baseURL: 'https://smart-fooding.herokuapp.com'
          }
        ).then(res=> data = res.data);

        dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        if (message === "Not authorized, token failed") {
          dispatch(logout());
        }
        dispatch({
          type: PRODUCT_CREATE_FAIL,
          payload: message,
        });
      }
    };

// EDIT PRODUCT
export const editProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_EDIT_REQUEST });
    var data;
    await axios.get(
      `/api/product/${id}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        baseURL: 'https://smart-fooding.herokuapp.com'
      }).then(res=>data = res.data);
    dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE PRODUCT
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    var data;

    await axios.put(
      `/api/product/${product._id}`,
      product,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        baseURL: 'https://smart-fooding.herokuapp.com'
      }
    ).then(res=>data = res.data);

    dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: message,
    });
  }
};
