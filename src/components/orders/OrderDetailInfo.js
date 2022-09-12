import React from "react";

const OrderDetailInfo = (props) => {
  const { order } = props;
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
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
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
            <h6 className="mb-1">Thông tin mua hàng</h6>
            <p className="mb-1">
              Giao hàng: {order.shipping_address.address.street + ", " + order.shipping_address.address.ward + ", " + order.shipping_address.address.district + ", " + order.shipping_address.address.province}
              <br /> Phương thức thanh toán:{" "}
              {order.payment_method}
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
            <h6 className="mb-1">Địa chỉ giao hàng</h6>
            <p className="mb-1">
              {order.shipping_address.address.street + ", " + order.shipping_address.address.ward + ", " + order.shipping_address.address.district + ", " + order.shipping_address.address.province}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default OrderDetailInfo;
