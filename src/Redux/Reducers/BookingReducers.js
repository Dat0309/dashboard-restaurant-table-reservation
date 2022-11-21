import {
  BOOKING_DETAILS_FAIL,
  BOOKING_DETAILS_REQUEST,
  BOOKING_DETAILS_SUCCESS,
  BOOKING_LIST_FAIL,
  BOOKING_LIST_REQUEST,
  BOOKING_LIST_SUCCESS,
  BOOKING_PAID_FAIL,
  BOOKING_PAID_REQUEST,
  BOOKING_PAID_RESET,
  BOOKING_PAID_SUCCESS,
} from "../Constants/BookingConstants";

export const bookingListReducer = (state = { bookings: [] }, action) => {
  switch (action.type) {
    case BOOKING_LIST_REQUEST:
      return { loading: true };
    case BOOKING_LIST_SUCCESS:
      return { loading: false, bookings: action.payload };
    case BOOKING_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bookingDetailReducer = (
  state = { loading: true, bookingItems: [] },
  action
) => {
  switch (action.type) {
    case BOOKING_DETAILS_REQUEST:
      return { ...state, loading: true };
    case BOOKING_DETAILS_SUCCESS:
      return { loading: false, booking: action.payload };
    case BOOKING_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bookingPaidReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKING_PAID_REQUEST:
      return { loading: true };
    case BOOKING_PAID_SUCCESS:
      return { loading: false, success: true };
    case BOOKING_PAID_FAIL:
      return { loading: false, error: action.payload };
    case BOOKING_PAID_RESET:
      return {};
    default:
      return state;
  }
};
