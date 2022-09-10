import {
    RESTAURANT_CREATE_FAIL,
    RESTAURANT_CREATE_REQUEST,
    RESTAURANT_CREATE_SUCCESS,
    RESTAURANT_DELETE_FAIL,
    RESTAURANT_DELETE_REQUEST,
    RESTAURANT_DELETE_SUCCESS,
    RESTAURANT_EDIT_FAIL,
    RESTAURANT_EDIT_REQUEST,
    RESTAURANT_EDIT_SUCCESS,
    RESTAURANT_LIST_FAIL,
    RESTAURANT_LIST_REQUEST,
    RESTAURANT_LIST_SUCCESS,
    RESTAURANT_UPDATE_FAIL,
    RESTAURANT_UPDATE_REQUEST,
    RESTAURANT_UPDATE_SUCCESS,
} from "../Constants/RestaurantConstants";
import axios from "axios";
import { logout } from "./userActions";

export const listRestaurant = (keyword = " ", pageNumber = " ") => async (dispatch, getState) => {
    try {
        dispatch({ type: RESTAURANT_LIST_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();
        var data;

        await axios.get(
            `/api/restaurants?keyword=${keyword}&pageNumber=${pageNumber}`,
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                baseURL: 'https://smart-fooding.herokuapp.com'
            }).then(res => data = res.data);

        dispatch({ type: RESTAURANT_LIST_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: RESTAURANT_LIST_FAIL,
            payload: message,
        });
    }
};

// DELETE RESTAURANT
export const deleteRestaurant = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: RESTAURANT_DELETE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        await axios.delete(
            `/api/restaurants/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                baseURL: 'https://smart-fooding.herokuapp.com'
            });

        dispatch({ type: RESTAURANT_DELETE_SUCCESS });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: RESTAURANT_DELETE_FAIL,
            payload: message,
        });
    }
};

// CREATE RESTAURANT
export const createRestaurant =
    (name, description, province, district, ward, street, contact, image, thumb, longitude, latitude) =>
        async (dispatch, getState) => {
            try {
                dispatch({ type: RESTAURANT_CREATE_REQUEST });

                const {
                    userLogin: { userInfo },
                } = getState();
                var data;

                await axios.post(
                    `/api/restaurants/`,
                    { name, description, province, district, ward, street, contact, image, thumb, longitude, latitude },
                    {
                        headers: {
                            Authorization: `Bearer ${userInfo.token}`,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        baseURL: 'https://smart-fooding.herokuapp.com'
                    }
                ).then(res => data = res.data);

                dispatch({ type: RESTAURANT_CREATE_SUCCESS, payload: data });
            } catch (error) {
                const message =
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message;
                if (message === "Not authorized, token failed") {
                    dispatch(logout());
                }
                dispatch({
                    type: RESTAURANT_CREATE_FAIL,
                    payload: message,
                });
            }
        };

// EDIT RESTAURANT
export const editRestaurant = (id) => async (dispatch) => {
    try {
        dispatch({ type: RESTAURANT_EDIT_REQUEST });
        var data;
        await axios.get(
            `/api/restaurants/${id}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                baseURL: 'https://smart-fooding.herokuapp.com'
            }).then(res => res.data);
        dispatch({ type: RESTAURANT_EDIT_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: RESTAURANT_EDIT_FAIL,
            payload: message,
        });
    }
};

// UPDATE RESTAURANT
export const updateRestaurant = (restaurant) => async (dispatch, getState) => {
    try {
        dispatch({ type: RESTAURANT_UPDATE_REQUEST });

        const {
            userLogin: { userInfo },
        } = getState();

        var data;

        await axios.put(
            `/api/restaurants/${restaurant._id}`,
            restaurant,
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                baseURL: 'https://smart-fooding.herokuapp.com'
            }
        ).then(res => data = res.data);

        dispatch({ type: RESTAURANT_UPDATE_SUCCESS, payload: data });
        dispatch({ type: RESTAURANT_EDIT_SUCCESS, payload: data });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        dispatch({
            type: RESTAURANT_UPDATE_FAIL,
            payload: message,
        });
    }
};