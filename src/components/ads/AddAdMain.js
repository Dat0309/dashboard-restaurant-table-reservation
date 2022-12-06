import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { AD_CREATE_RESET } from "../../Redux/Constants/AdConstants";
import { createAd } from "../../Redux/Actions/AdAction";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddAdMain = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();

  const adCreate = useSelector((state) => state.adCreate);
  const { loading, error, ad } = adCreate;

  useEffect(() => {
    if (ad) {
      toast.success("Thêm quảng cáo thành công", ToastObjects);
      dispatch({ type: AD_CREATE_RESET });
      setName(ad.code);
      setImage(ad.image);
      setDescription(ad.description);
    }
  }, [ad, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createAd(name, image, description));
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
            <Link to="/products" className="btn btn-danger text-white">
              Quay lại trang quản lý
            </Link>
            <h2 className="content-title">Thêm quảng cáo</h2>
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
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
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
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddAdMain;
