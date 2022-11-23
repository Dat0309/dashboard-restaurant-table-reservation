import {
  TABLE_CREATE_FAIL,
  TABLE_CREATE_REQUEST,
  TABLE_CREATE_RESET,
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
  TABLE_UPDATE_RESET,
  TABLE_UPDATE_SUCCESS,
} from "../Constants/TableConstants";

// ALL TABLES
export const tableListReducer = (state = { tables: [] }, action) => {
  switch (action.type) {
    case TABLE_LIST_REQUEST:
      return { loading: true, tables: [] };
    case TABLE_LIST_SUCCESS:
      return { loading: false, tables: action.payload };
    case TABLE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const tableListByRestaurantIdReducer = (
  state = { tables: [] },
  action
) => {
  switch (action.type) {
    case TABLE_LIST_REQUEST:
      return { loading: true, tables: [] };
    case TABLE_LIST_SUCCESS:
      return {
        loading: false,
        pages: action.payload.pages,
        page: action.payload.page,
        tables: action.payload.tables,
      };
    case TABLE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// DELETE TABLE
export const tableDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TABLE_DELETE_REQUEST:
      return { loading: true };
    case TABLE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TABLE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// TABLE BY CATEGORY ID
export const tableListByCategoryIdReducer = (
  state = { tables: [] },
  action
) => {
  switch (action.type) {
    case TABLE_LIST_REQUEST:
      return { loading: true, tables: [] };
    case TABLE_LIST_SUCCESS:
      return {
        loading: false,
        pages: action.payload.pages,
        page: action.payload.page,
        tables: action.payload.tables,
      };
    case TABLE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// CREATE TABLE
export const tableCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TABLE_CREATE_REQUEST:
      return { loading: true };
    case TABLE_CREATE_SUCCESS:
      return { loading: false, success: true, table: action.payload };
    case TABLE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TABLE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// EDIT TABLE
export const tableEditReducer = (
  state = { table: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case TABLE_EDIT_REQUEST:
      return { ...state, loading: true };
    case TABLE_EDIT_SUCCESS:
      return { loading: false, table: action.payload };
    case TABLE_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPDATE TABLE
export const tableUpdateReducer = (state = { table: {} }, action) => {
  switch (action.type) {
    case TABLE_UPDATE_REQUEST:
      return { loading: true };
    case TABLE_UPDATE_SUCCESS:
      return { loading: false, success: true, table: action.payload };
    case TABLE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TABLE_UPDATE_RESET:
      return { table: {} };
    default:
      return state;
  }
};
