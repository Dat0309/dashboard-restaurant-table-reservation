import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteAd } from "../../Redux/Actions/AdAction";

const Ad = (props) => {
  const { ad } = props;
  const dispatch = useDispatch();

  const deletehandler = (id) => {
    if (window.confirm("Bà có chắc chưa??")) {
      dispatch(deleteAd(id));
    }
  };

  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          <Link to="#" className="img-wrap">
            <img src={ad.image} alt="Ad" />
          </Link>
          <div className="info-wrap">
            <Link to="#" className="title text-truncate">
              {ad.name}
            </Link>
            <div className="price mb-2">{ad.description}</div>
            <div className="row">
              <Link
                to={`/ad/${ad._id}/edit`}
                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
              >
                <i className="fas fa-pen"></i>
              </Link>
              <Link
                to="#"
                onClick={() => deletehandler(ad._id)}
                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
              >
                <i className="fas fa-trash-alt"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ad;
