import {
  AD_CREATE_FAIL,
  AD_CREATE_REQUEST,
  AD_CREATE_RESET,
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
  AD_UPDATE_RESET,
  AD_UPDATE_SUCCESS,
} from "../Constants/AdConstants";

// ALL ADS
export const adListReducer = (state = { ads: [] }, action) => {
  switch (action.type) {
    case AD_LIST_REQUEST:
      return { loading: true, ads: [] };
    case AD_LIST_SUCCESS:
      return { loading: false, ads: action.payload };
    case AD_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// DELETE AD
export const adDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case AD_DELETE_REQUEST:
      return { loading: true };
    case AD_DELETE_SUCCESS:
      return { loading: false, success: true };
    case AD_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// CREATE AD
export const adCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case AD_CREATE_REQUEST:
      return { loading: true };
    case AD_CREATE_SUCCESS:
      return { loading: false, success: true, ad: action.payload };
    case AD_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case AD_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// EDIT AD
export const adEditReducer = (state = { ad: { reviews: [] } }, action) => {
  switch (action.type) {
    case AD_EDIT_REQUEST:
      return { ...state, loading: true };
    case AD_EDIT_SUCCESS:
      return { loading: false, ad: action.payload };
    case AD_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPDATE AD
export const adUpdateReducer = (state = { ad: {} }, action) => {
  switch (action.type) {
    case AD_UPDATE_REQUEST:
      return { loading: true };
    case AD_UPDATE_SUCCESS:
      return { loading: false, success: true, ad: action.payload };
    case AD_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case AD_UPDATE_RESET:
      return { ad: {} };
    default:
      return state;
  }
};
