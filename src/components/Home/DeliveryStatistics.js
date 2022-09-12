import React from "react";

const DeliveryStatistics = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Thống kê tình hình giao hàng</h5>
          <iframe
            title="delivery-statitics"
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
              width: "100%",
              height: "350px",
            }}
            src="https://charts.mongodb.com/charts-food-delivery-pwifd/embed/charts?id=631f07c3-baed-47ff-8820-8902b6b77e26&maxDataAge=3600&theme=light&autoRefresh=true">
          </iframe>
        </article>
      </div>
    </div>
  );
};

export default DeliveryStatistics;
