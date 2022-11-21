import React from "react";
import { Link } from "react-router-dom";

const BookingDetailProducts = (props) => {
  const { booking, loading } = props;

  if (!loading) {
    // Calculate Price
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    booking.itemsPrice = addDecimals(
      booking.bookingItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  return (
    <table className="table border table-lg">
      <thead>
        <tr>
          <th style={{ width: "40%" }}>Món ăn</th>
          <th style={{ width: "20%" }}>Đơn giá</th>
          <th style={{ width: "20%" }}>Số lượng</th>
          <th style={{ width: "20%" }} className="text-end">
            Tổng tiền
          </th>
        </tr>
      </thead>
      <tbody>
        {booking.bookingItems.map((item, index) => (
          <tr key={index}>
            <td>
              <Link className="itemside" to="#">
                <div className="left">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "40px", height: "40px" }}
                    className="img-xs"
                  />
                </div>
                <div className="info">{item.name}</div>
              </Link>
            </td>
            <td>{item.price}Đ</td>
            <td>{item.qty} </td>
            <td className="text-end"> {item.qty * item.price}Đ</td>
          </tr>
        ))}

        <tr>
          <td colSpan="4">
            <article className="float-end">
              <dl className="dlist">
                <dt>Thành tiền:</dt>
                <dd>
                  <b className="h5">{booking.total_price}Đ</b>
                </dd>
              </dl>
              <dl className="dlist">
                <dt className="text-muted">Tình trạng:</dt>
                <dd>
                  {booking.isPaid ? (
                    <span className="badge rounded-pill alert alert-success text-success">
                      Đã thanh toán
                    </span>
                  ) : (
                    <span className="badge rounded-pill alert alert-danger text-danger">
                      Chưa thanh toán
                    </span>
                  )}
                </dd>
              </dl>
            </article>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default BookingDetailProducts;
