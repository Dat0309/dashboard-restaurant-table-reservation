import React, { useState, useEffect } from "react";
import Toast from "../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editRestaurant,
  updateRestaurant,
} from "../../Redux/Actions/RestaurantActions";
import { RESTAURANT_UPDATE_RESET } from "../../Redux/Constants/RestaurantConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditRestaurantMain = (props) => {
  const { restaurantId } = props;
  console.log(restaurantId);

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

  const restaurantEdit = useSelector((state) => state.restaurantEdit);
  const { loading, error, restaurant } = restaurantEdit;

  const restaurantUpdate = useSelector((state) => state.restaurantUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = restaurantUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: RESTAURANT_UPDATE_RESET });
      toast.success("Cập nhật nhà hàng thành công", ToastObjects);
    } else {
      if (!restaurant || restaurant._id !== restaurantId) {
        console.log("cant get restaurant");
        dispatch(editRestaurant(restaurantId));
      } else {
        setName(restaurant.name);
        setDescription(restaurant.description);
        setProvince(restaurant.province);
        setDistrict(restaurant.district);
        setWard(restaurant.ward);
        setStreet(restaurant.street);
        setContact(restaurant.contact);
        setImage(restaurant.image);
        setThumb(restaurant.thumb);
        setLongitude(restaurant.longitude);
        setLatitude(restaurant.latitude);
      }
    }
  }, [restaurant, dispatch, restaurantId, successUpdate]);

  function handleOpenWidget() {
    var myWidget = window.cloudinary.createUploadWidget({
      cloudName: 'devdaz',
      uploadPreset: 'mm9z4p5u'
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
        setImage(result.info.url);
      }
    });
    //open widget
    myWidget.open();
  }

  function handleOpenWidgetThumb() {
    var myWidget = window.cloudinary.createUploadWidget({
      cloudName: 'devdaz',
      uploadPreset: 'mm9z4p5u'
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        setThumbs((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
        setThumb(result.info.url);
      }
    });
    //open widget
    myWidget.open();
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateRestaurant({
        _id: restaurantId,
        name: name,
        description: description,
        province: province,
        district: district,
        ward: ward,
        street: street,
        contact: contact,
        image: image,
        thumb: thumb,
        longitude: longitude,
        latitude: latitude
      })
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
            <h2 className="content-title">Chỉnh sửa món ăn</h2>
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
                        <label htmlFor="restaurant_title" className="form-label">
                          Tên nhà hàng
                        </label>
                        <input
                          type="text"
                          placeholder="Tên mặt hàng"
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
                        <button id="upload_widget" className="btn btn-primary" onClick={() => handleOpenWidget()}>Upload files</button>
                        <div className="card card-product-grid shadow-sm">
                          <div>
                            <img alt="thumb" src={image} height={300} width={600} />
                          </div>
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
                        <button id="upload_widget" className="btn btn-primary" onClick={() => handleOpenWidgetThumb()}>Upload files</button>
                        <div className="card card-product-grid shadow-sm" style={{display: "flex"}}>
                          {thumb.split(',').map((img) => (
                            <div>
                              <img alt="thumb" src={img} height={300} width={600} />
                            </div>
                          ))}

                        </div>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="user_longitude" className="form-label">
                          Kinh độ
                        </label>
                        <input
                          type="text"
                          placeholder="Nhập kinh độ"
                          className="form-control"
                          id="user_longitude"
                          required
                          value={longitude}
                          onChange={(e) => setLongitude(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="user_latitude" className="form-label">
                          Vĩ độ
                        </label>
                        <input
                          type="text"
                          placeholder="Nhập vĩ độ"
                          className="form-control"
                          id="user_latitude"
                          required
                          value={latitude}
                          onChange={(e) => setLatitude(e.target.value)}
                        />
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

export default EditRestaurantMain;
