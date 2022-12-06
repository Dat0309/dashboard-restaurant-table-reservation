import React, { useState, useEffect } from "react";
import Toast from "../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { AD_UPDATE_RESET } from "../../Redux/Constants/AdConstants";
import { editAd, updateAd } from "../../Redux/Actions/AdAction";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditAdMain = (props) => {
  const { adId } = props;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const adEdit = useSelector((state) => state.adEdit);
  const { loading, error, ad } = adEdit;

  const adUpdate = useSelector((state) => state.adUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = adUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: AD_UPDATE_RESET });
      toast.success("Cập nhật quảng cáo thành công", ToastObjects);
    } else {
      if (!ad.code || ad._id !== adId) {
        console.log("cant get ad");
        dispatch(editAd(adId));
      } else {
        setName(ad.name);
        setImage(ad.image);
        setDescription(ad.description);
      }
    }
  }, [ad, dispatch, adId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateAd({
        _id: adId,
        name: name,
        image: image,
        description: description,
      })
    );
  };

  function handleOpenWidget() {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "devdaz",
        uploadPreset: "mm9z4p5u",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImage((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
          setImage(result.info.url);
        }
      }
    );
    //open widget
    myWidget.open();
  }

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/tables" className="btn btn-danger text-white">
              Quay lại trang quản lý
            </Link>
            <h2 className="content-title">Chỉnh sửa quảng cáo</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Lưu
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {errorUpdate && (
                    <Message variant="alert-danger">{errorUpdate}</Message>
                  )}
                  {loadingUpdate && <Loading />}
                  {loading ? (
                    <Loading />
                  ) : error ? (
                    <Message variant="alert-danger">{error}</Message>
                  ) : (
                    <>
                      <div className="mb-4">
                        <label htmlFor="ad_title" className="form-label">
                          Tên quảng cáo
                        </label>
                        <input
                          type="text"
                          placeholder="Tên quảng cáo"
                          className="form-control"
                          id="ad_title"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="ad_description" className="form-label">
                          Mô tả
                        </label>
                        <input
                          type="text"
                          placeholder="Tên quảng cáo"
                          className="form-control"
                          id="ad_description"
                          required
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>

                      <div className="mb-4">
                        <label className="form-label">Hình ảnh</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="URL Hình ảnh"
                          value={image}
                          required
                          onChange={(e) => setImage(e.target.value)}
                        />
                        <button
                          id="upload_widget"
                          className="btn btn-primary"
                          onClick={() => handleOpenWidget()}
                        >
                          Upload files
                        </button>
                        <div className="card card-product-grid shadow-sm">
                          <div>
                            <img
                              alt="avatar"
                              src={image.url}
                              height={300}
                              width={300}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditAdMain;
