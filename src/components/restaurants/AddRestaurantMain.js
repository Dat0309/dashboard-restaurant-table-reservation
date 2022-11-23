import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RESTAURANT_CREATE_RESET } from "../../Redux/Constants/RestaurantConstants";
import { createRestaurant } from "../../Redux/Actions/RestaurantActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { listUser } from "../../Redux/Actions/userActions";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddRestaurantMain = () => {
  const [owner, setOwner] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [street, setStreet] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState("");
  const [thumb, setThumb] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const [images, setImages] = useState([]);
  const [thumbs, setThumbs] = useState([]);

  const dispatch = useDispatch();

  const restaurantCreate = useSelector((state) => state.restaurantCreate);
  const { loading, error, restaurant } = restaurantCreate;

  const owners = useSelector((state) => state.userList);
  const { loading: loadingUser, error: errorUser, users } = owners;

  useEffect(() => {
    dispatch(listUser());
    if (restaurant) {
      toast.success("Thêm nhà hàng thành công", ToastObjects);
      dispatch({ type: RESTAURANT_CREATE_RESET });
      setOwner("");
      setName("");
      setDescription("");
      setProvince("");
      setDistrict("");
      setWard("");
      setStreet("");
      setContact("");
      setImage("");
      setThumb("");
      setLongitude("");
      setLatitude("");
    }
  }, [restaurant, dispatch, thumbs]);

  function handleOpenWidget() {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "devdaz",
        uploadPreset: "mm9z4p5u",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImages((prev) => [
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

  function handleOpenWidgetThumb() {
    var list = "";
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "devdaz",
        uploadPreset: "mm9z4p5u",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setThumbs((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
          list += result.info.url + ", ";
          setThumb(list);
        }
      }
    );
    //open widget
    myWidget.open();
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createRestaurant(
        owner,
        name,
        description,
        province,
        district,
        ward,
        street,
        contact,
        image,
        thumb,
        longitude,
        latitude
      )
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/restaurants" className="btn btn-danger text-white">
              Quay lại trang quản lý
            </Link>
            <h2 className="content-title">Thêm nhà hàng</h2>
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
                    <label htmlFor="restaurant_owner" className="form-label">
                      Tài khoản quản lý
                    </label>
                    <select
                      className="form-select"
                      onChange={(e) => setOwner(e.target.value)}
                      value={owner}
                      id="restaurant_owner"
                    >
                      {loadingUser ? (
                        <div className="mb-5">
                          <Loading />
                        </div>
                      ) : errorUser ? (
                        <Message variant="alert-danger">{error}</Message>
                      ) : users ? (
                        <>
                          <option>Chọn tài khoản</option>
                          {users.users.map((user) => (
                            <option value={user._id}>{user.username}</option>
                          ))}
                        </>
                      ) : (
                        <Message variant="alert-danger">
                          Đã xảy ra lỗi, vui lòng tải lại trang
                        </Message>
                      )}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="restaurant_title" className="form-label">
                      Tên nhà hàng
                    </label>
                    <input
                      type="text"
                      placeholder="Tên nhà hàng"
                      className="form-control"
                      id="restaurant_title"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Mô tả</label>
                    <textarea
                      placeholder="Thêm mô tả"
                      className="form-control"
                      rows="7"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="restaurant_province" className="form-label">
                      Tỉnh
                    </label>
                    <input
                      type="text"
                      placeholder="Tỉnh"
                      className="form-control"
                      id="restaurant_province"
                      required
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="restaurant_district" className="form-label">
                      Quận/Huyện/Thành phố
                    </label>
                    <input
                      type="text"
                      placeholder="Quận/Huyện/Thành phố"
                      className="form-control"
                      id="restaurant_district"
                      required
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="restaurant_ward" className="form-label">
                      Xã/Phường/Thị trấn
                    </label>
                    <input
                      type="text"
                      placeholder="Xã/Phường/Thị trấn"
                      className="form-control"
                      id="restaurant_ward"
                      required
                      value={ward}
                      onChange={(e) => setWard(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="restaurant_street" className="form-label">
                      Đường
                    </label>
                    <input
                      type="text"
                      placeholder="Đường"
                      className="form-control"
                      id="restaurant_street"
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="restaurant_phone" className="form-label">
                      Liên lạc
                    </label>
                    <input
                      type="text"
                      placeholder="Đường"
                      className="form-control"
                      id="restaurant_phone"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
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
                      Chọn hình ảnh
                    </button>
                    <div className="card card-product-grid shadow-sm">
                      {images.map((img) => (
                        <div>
                          <img
                            alt="avatar"
                            src={img.url}
                            height={300}
                            width={300}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Ảnh bìa</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="URL Hình ảnh"
                      value={thumb}
                      required
                      onChange={(e) => setThumb(e.target.value)}
                    />
                    <button
                      id="upload_widget"
                      className="btn btn-primary"
                      onClick={() => handleOpenWidgetThumb()}
                    >
                      Chọn ảnh bìa
                    </button>
                    <div className="card card-product-grid shadow-sm">
                      {thumbs.map((img) => (
                        <div>
                          <img
                            alt="thumb"
                            src={img.url}
                            height={300}
                            width={600}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="restaurant_longitude"
                      className="form-label"
                    >
                      Kinh độ
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập kinh độ"
                      className="form-control"
                      id="restaurant_longitude"
                      required
                      value={longitude}
                      onChange={(e) => setLongitude(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="restaurant_latitude" className="form-label">
                      Vĩ độ
                    </label>
                    <input
                      type="text"
                      placeholder="Nhập vĩ độ"
                      className="form-control"
                      id="restaurant_latitude"
                      required
                      value={latitude}
                      onChange={(e) => setLatitude(e.target.value)}
                    />
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

export default AddRestaurantMain;
