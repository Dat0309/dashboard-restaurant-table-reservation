import React from "react";

const BookingDetailInfo = (props) => {
  const { booking } = props;
  return (
    <div className="row mb-5 order-info-wrap">
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-user"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Khách hàng</h6>
            <p className="mb-1">
              <a href={`${booking.booking.user_name}`}>
                {booking.booking.user_name}
              </a>
            </p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-truck-moving"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Thông tin đặt bàn</h6>
            <p className="mb-1">
              <br /> Phương thức thanh toán: {booking.booking.payment_method}
            </p>
          </div>
        </article>
      </div>
      <div className="col-md-6 col-lg-4">
        <article className="icontext align-items-start">
          <span className="icon icon-sm rounded-circle alert-success">
            <i className="text-success fas fa-map-marker-alt"></i>
          </span>
          <div className="text">
            <h6 className="mb-1">Thời gian</h6>
            <p className="mb-1">
              {booking.booking.time + ", " + booking.booking.date + ", "}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BookingDetailInfo;
