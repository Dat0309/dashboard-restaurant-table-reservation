import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCategories } from "../../Redux/Actions/CategoryActions";
import { listProducts } from "../../Redux/Actions/ProductActions";
import DeliveryStatistics from "./DeliveryStatistics";
import LatestOrder from "./LatestOrder";
import PaidStatistics from "./PaidStatistics";
import ProductsStatistics from "./ProductsStatistics";
import SaleStatistics from "./SalesStatistics";
import TopTotal from "./TopTotal";

const Main = () => {
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  return (
    <>
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title"> Dashboard </h2>
      </div>
      {/* Top Total */}
      <TopTotal orders={orders} products={products} />

      <div className="row">
        {/* STATICS */}
        <SaleStatistics />
        <ProductsStatistics />
      </div>
      <div className="row">
        {/* STATICS */}
        <PaidStatistics />
        <DeliveryStatistics />
      </div>

      {/* LATEST ORDER */}
      <div className="card mb-4 shadow-sm">
        <LatestOrder orders={orders} loading={loading} error={error} />
      </div>
    </section>
  </>
  );
};

export default Main;
