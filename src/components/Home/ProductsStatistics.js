import React from "react";

const ProductsStatistics = () => {
  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Thống kê mặt hàng</h5>
          <iframe
            title="product-statitics"
            style={{
              background: "#FFFFFF",
              border: "none",
              borderRadius: "2px",
              boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2);",
              width: "100%",
              height: "350px",
            }}
            src="https://charts.mongodb.com/charts-food-delivery-pwifd/embed/charts?id=631f0507-7cad-4832-8d6f-130087abf2ac&maxDataAge=3600&theme=light&autoRefresh=true">
          </iframe>
        </article>
      </div>
    </div>
  );
};

export default ProductsStatistics;
