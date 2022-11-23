import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import moment from "moment";
import {
  getBookingDetails,
  paidBooking,
} from "../../Redux/Actions/BookingAction";
import BookingDetailInfo from "./BookingDetailInfo";
import BookingDetailProducts from "./BookingDetailProducts";
import { paidTable } from "../../Redux/Actions/TableAction";

const BookingDetailmain = (props) => {
  const { bookingId } = props;
  const dispatch = useDispatch();

  const bookingDetail = useSelector((state) => state.bookingDetails);
  const { loading, error, booking } = bookingDetail;

  const isPaid = useSelector((state) => state.bookingPaid);
  const { loading: loadingPaid, success: successPaid } = isPaid;

  useEffect(() => {
    dispatch(getBookingDetails(bookingId));
  }, [dispatch, bookingId, successPaid]);

  const paidHandler = () => {
    dispatch(paidBooking(booking.booking));
    dispatch(paidTable(booking.booking.table_id));
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <Link to="/bookings" className="btn btn-dark text-white">
          Quay lại danh sách đặt bàn
        </Link>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : booking ? (
        <div className="card">
          <header className="card-header p-3 Header-green">
            <div className="row align-items-center ">
              <div className="col-lg-6 col-md-6">
                <span>
                  <i className="far fa-calendar-alt mx-2"></i>
                  <b className="text-white">
                    {moment(booking.createdAt).format("llll")}
                  </b>
                </span>
                <br />
                <small className="text-white mx-3 ">
                  ID Đặt hàng: {booking._id}
                </small>
              </div>
              <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                <Link className="btn btn-success ms-2" to="#">
                  <i className="fas fa-print"></i>
                </Link>
              </div>
            </div>
          </header>
          <div className="card-body">
            {/* Booking info */}
            <BookingDetailInfo booking={booking} />

            <div className="row">
              <div className="col-lg-9">
                <div className="table-responsive">
                  <BookingDetailProducts
                    booking={booking}
                    loading={loading}
                    error={error}
                  />
                </div>
              </div>
              {/* Payment Info */}
              <div className="col-lg-3">
                <div className="box shadow-sm bg-light">
                  {booking.booking.is_paid ? (
                    <button className="btn btn-success col-12">
                      Đã Thanh Toán
                    </button>
                  ) : (
                    <>
                      {loadingPaid && <Loading />}
                      <button
                        className="btn btn-dark col-12"
                        onClick={paidHandler}
                      >
                        ĐÁNH DẤU ĐÃ THANH TOÁN
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export default BookingDetailmain;
