import {
  RESTAURANT_BY_OWNERS_FAIL,
  RESTAURANT_BY_OWNERS_REQUEST,
  RESTAURANT_BY_OWNERS_SUCCESS,
  RESTAURANT_CREATE_FAIL,
  RESTAURANT_CREATE_REQUEST,
  RESTAURANT_CREATE_RESET,
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
  RESTAURANT_UPDATE_RESET,
  RESTAURANT_UPDATE_SUCCESS,
} from "../Constants/RestaurantConstants";

// ALL RESTAURANTS
export const restaurantListReducer = (state = { restaurants: [] }, action) => {
  switch (action.type) {
    case RESTAURANT_LIST_REQUEST:
      return { loading: true, restaurants: [] };
    case RESTAURANT_LIST_SUCCESS:
      return { loading: false, restaurants: action.payload };
    case RESTAURANT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const restaurantByOwners = (state = { restaurant: [] }, action) => {
  switch (action.type) {
    case RESTAURANT_BY_OWNERS_REQUEST:
      return { loading: true, restaurant: [] };
    case RESTAURANT_BY_OWNERS_SUCCESS:
      return { loading: false, restaurant: action.payload };
    case RESTAURANT_BY_OWNERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// DELETE RESTAURANT
export const restaurantDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case RESTAURANT_DELETE_REQUEST:
      return { loading: true };
    case RESTAURANT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case RESTAURANT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// RESTAURANT BY CATEGORY ID
export const restaurantListByCategoryIdReducer = (
  state = { restaurants: [] },
  action
) => {
  switch (action.type) {
    case RESTAURANT_LIST_REQUEST:
      return { loading: true, restaurants: [] };
    case RESTAURANT_LIST_SUCCESS:
      return {
        loading: false,
        pages: action.payload.pages,
        page: action.payload.page,
        restaurants: action.payload.restaurants,
      };
    case RESTAURANT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// DELETE RESTAURANT
export const restaurantCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case RESTAURANT_CREATE_REQUEST:
      return { loading: true };
    case RESTAURANT_CREATE_SUCCESS:
      return { loading: false, success: true, restaurant: action.payload };
    case RESTAURANT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case RESTAURANT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// EDIT RESTAURANT
export const restaurantEditReducer = (
  state = { restaurant: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case RESTAURANT_EDIT_REQUEST:
      return { ...state, loading: true };
    case RESTAURANT_EDIT_SUCCESS:
      return { loading: false, restaurant: action.payload };
    case RESTAURANT_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPDATE RESTAURANT
export const restaurantUpdateReducer = (state = { restaurant: {} }, action) => {
  switch (action.type) {
    case RESTAURANT_UPDATE_REQUEST:
      return { loading: true };
    case RESTAURANT_UPDATE_SUCCESS:
      return { loading: false, success: true, restaurant: action.payload };
    case RESTAURANT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case RESTAURANT_UPDATE_RESET:
      return { restaurant: {} };
    default:
      return state;
  }
};
