import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { listTableByRestaurant } from "../../Redux/Actions/TableAction";
import Table from "./Table";

const MainTables = (props) => {
  const dispatch = useDispatch();

  const tableList = useSelector((state) => state.tableByRestaurantId);
  const { loading, error, tables } = tableList;

  const tableDelete = useSelector((state) => state.tableDelete);
  const { error: errorDelete, success: successDelete } = tableDelete;

  const myRestaurant = useSelector((state) => state.restaurantOfOwners);
  const { restaurant } = myRestaurant;

  //   const submitHandler = (e) => {
  //     e.preventDefault();
  //     if (keywordSearch.trim()) {
  //       history.push(`/search/${keywordSearch}`);
  //     } else {
  //       history.push("/search/");
  //     }
  //   };

  useEffect(() => {
    dispatch(listTableByRestaurant(restaurant[0]._id));
  }, [dispatch, successDelete, restaurant]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">QUẢN LÝ BÀN ĂN: {restaurant[0].name}</h2>
        <div>
          <Link to="/addtable" className="btn btn-primary">
            Tạo mới
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3"></div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : tables ? (
            <div className="row">
              {/* Tabless */}
              {tables.map((table) => (
                <Table table={table} key={table._id} />
              ))}
            </div>
          ) : (
            <Message variant="alert-danger">
              Đã xảy ra lỗi, xin hãy tải lại trang
            </Message>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainTables;
