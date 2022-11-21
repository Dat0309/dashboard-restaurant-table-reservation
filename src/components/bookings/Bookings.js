import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Bookings = (props) => {
  const { bookings } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Khách hàng</th>
          <th scope="col">Bàn</th>
          <th scope="col">Tổng tiền</th>
          <th scope="col">Thanh toán</th>
          <th scope="col">Ngày đặt</th>
          <th scope="col" className="text-end">
            Hành động
          </th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <tr key={booking._id}>
            <td>
              <b>{booking.user_name}</b>
            </td>
            <td>{booking.table_code}</td>
            <td>{booking.total_price}Đ</td>
            <td>
              {booking.is_paid ? (
                <span className="badge rounded-pill alert-success">
                  Đã thanh toán {moment(booking.paid_at).format("MMM Do YY")}
                </span>
              ) : (
                <span className="badge rounded-pill alert-danger">
                  Chưa thanh toán
                </span>
              )}
            </td>
            <td>{moment(booking.createdAt).format("MMM Do YY")}</td>
            <td className="d-flex justify-content-end align-item-center">
              <Link to={`/booking/${booking._id}`} className="text-success">
                <i className="fas fa-eye"></i>
              </Link>
            </td>
          </tr>
        ))}

        {/* Not paid Not delivered */}
        {/* <tr>
          <td>
            <b>Velcro Sneakers For Boys & Girls (Blue)</b>
          </td>
          <td>user@example.com</td>
          <td>$45,789</td>
          <td>
            <span className="badge rounded-pill alert-danger">Not paid</span>
          </td>
          <td>Dec 12 2021</td>
          <td>
            <span className="badge btn-dark">Not Delivered</span>
          </td>
          <td className="d-flex justify-content-end align-item-center">
            <Link to={`/booking`} className="text-success">
              <i className="fas fa-eye"></i>
            </Link>
          </td>
        </tr> */}
      </tbody>
    </table>
  );
};

export default Bookings;
