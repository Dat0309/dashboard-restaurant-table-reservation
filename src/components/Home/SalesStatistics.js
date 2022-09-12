import React from "react";

const SaleStatistics = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Thống kê doanh thu</h5>
          <iframe
            title="sale-statistics"
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
              width: "100%",
              height: "350px"
            }}
            src="https://charts.mongodb.com/charts-food-delivery-pwifd/embed/charts?id=631f0616-baed-4f3b-8804-8902b6b61336&maxDataAge=3600&theme=light&autoRefresh=true">
          </iframe>
        </article>
      </div>
    </div>
  );
};

export default SaleStatistics;
