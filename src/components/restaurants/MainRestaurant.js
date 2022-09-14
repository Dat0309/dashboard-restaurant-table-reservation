import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listRestaurant } from "../../Redux/Actions/RestaurantActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Restaurant from "./Restaurant";
import PaginationRestaurant from "./paginationRestaurant";

const MainRestaurants = (props) => {
  const { keyword, pagenumber } = props;
  const [keywordSearch, setKeyword] = useState();
  const dispatch = useDispatch();
  let history = useHistory();

  const restaurantList = useSelector((state) => state.restaurantList);
  const { loading, error, restaurants } = restaurantList;

  const restaurantDelete = useSelector((state) => state.restaurantDelete);
  const { error: errorDelete, success: successDelete } = restaurantDelete;

  const submitHandler = (e) => {
    e.preventDefault();
    if (keywordSearch.trim()) {
      history.push(`/search-restaurant/${keywordSearch}`);
    } else {
      history.push("/search-restaurant/");
    }
  };

  useEffect(() => {
    dispatch(listRestaurant(keyword, pagenumber));
  }, [dispatch, successDelete, keyword, pagenumber]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">QUẢN LÝ NHÀ HÀNG</h2>
        <div>
          <Link to="/addrestaurant" className="btn btn-primary">
            Tạo mới
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <form onSubmit={submitHandler} className="input-group">
                <input
                  type="search"
                  placeholder="Tìm kiếm nhà hàng, nguòi yêu, siêu em gái..."
                  className="form-control p-2"
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit" className="search-button">
                  Tìm kiếm
                </button>
              </form>
            </div>
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : restaurants.restaurant ? (
            <div className="row">
              {/* Products */}
              {restaurants.restaurant.map((restaurant) => (
                <Restaurant restaurant={restaurant} key={restaurant._id} />
              ))}
            </div>
          ) : (
            <Message variant="alert-danger">Đã xảy ra lỗi, xin hãy tải lại trang</Message>
          )}

          {/* <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav> */}
          {/* Pagination */}
          <PaginationRestaurant
            pages={restaurants.pages}
            page={restaurants.page}
            keyword={keyword ? keyword : ""}
          />
        </div>
      </div>
    </section>
  );
};

export default MainRestaurants;
