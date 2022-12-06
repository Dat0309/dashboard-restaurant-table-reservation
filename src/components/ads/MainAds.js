import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import Ad from "./Ad";
import { listAds } from "../../Redux/Actions/AdAction";

const MainAds = (props) => {
  const dispatch = useDispatch();

  const adList = useSelector((state) => state.adList);
  const { loading, error, ads } = adList;

  const adDelete = useSelector((state) => state.adDelete);
  const { error: errorDelete, success: successDelete } = adDelete;

  useEffect(() => {
    dispatch(listAds());
  }, [dispatch, successDelete, ads]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">QUẢN LÝ QUẢNG CÁO</h2>
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
          ) : ads ? (
            <div className="row">
              {/* Tabless */}
              {ads.map((ad) => (
                <Ad ad={ad} key={ad._id} />
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

export default MainAds;
