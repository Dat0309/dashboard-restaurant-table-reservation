import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import { createProduct } from "./../../Redux/Actions/ProductActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { listCategories } from "../../Redux/Actions/CategoryActions";
import { listRestaurant } from "../../Redux/Actions/RestaurantActions";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddProductMain = () => {
  const [name, setName] = useState("");
  const [categories_id, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");
  const [menu_id, setRestaurat] = useState("")

  const dispatch = useDispatch();

  const categoriesList = useSelector((state) => state.categoriesList);
  const { loadingCate, errorCate, categories } = categoriesList;

  const restaurantList = useSelector((state) => state.restaurantList);
  const { loadingRestaurant, errorRestaurant, restaurants } = restaurantList;

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate;

  useEffect(() => {
    dispatch(listCategories());
    dispatch(listRestaurant());
    if (product) {
      toast.success("Thêm sản phẩm thành công", ToastObjects);
      dispatch({ type: PRODUCT_CREATE_RESET });
      setName("");
      setCategory("");
      setDescription("");
      setUnit("");
      setImage("");
      setRestaurat("");
      setPrice(0);
    }
  }, [product, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createProduct(name, categories_id, price, description, image, unit, menu_id));
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Quay lại trang quản lý
            </Link>
            <h2 className="content-title">Thêm mặt hàng</h2>
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
                    <label htmlFor="product_title" className="form-label">
                      Tên món ăn
                    </label>
                    <input
                      type="text"
                      placeholder="Tên mặt hàng"
                      className="form-control"
                      id="product_title"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_category" className="form-label">
                      Loại mặt hàng
                    </label>
                    <select className="form-select"
                      onChange={(e) => setCategory(e.target.value)}
                      value={categories_id}
                      id="product_category">
                      {loadingCate ? (
                        <div className='mb-5'>
                          <Loading />
                        </div>
                      ) : errorCate ? (
                        <Message variant="alert-danger">{error}</Message>
                      ) : categories ? (
                        <>
                          <option>Chọn loại mặt hàng</option>
                          {categories.map((category) => (
                            <option value={category._id}>
                              {category.name}
                            </option>
                          ))}
                        </>
                      ) : (
                        <Message variant="alert-danger">Đã xảy ra lỗi, vui lòng tải lại trang</Message>
                      )}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_restaurant" className="form-label">
                      Nhà hàng
                    </label>
                    <select className="form-select"
                      onChange={(e) => setRestaurat(e.target.value)}
                      value={menu_id}
                      id="product_restaurant">
                      {loadingRestaurant ? (
                        <div className='mb-5'>
                          <Loading />
                        </div>
                      ) : errorRestaurant ? (
                        <Message variant="alert-danger">{error}</Message>
                      ) : restaurants.restaurant ? (
                        <>
                          <option>Chọn tên nhà hàng</option>
                          {restaurants.restaurant.map((restaurant) => (
                            <option value={restaurant._id}>
                              {restaurant.name}
                            </option>
                          ))}
                        </>
                      ) : (
                        <Message variant="alert-danger">Đã xảy ra lỗi, vui lòng tải lại trang</Message>
                      )}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Giá
                    </label>
                    <input
                      type="number"
                      placeholder="Thêm giá"
                      className="form-control"
                      id="product_price"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_unit" className="form-label">
                      Đơn vị tính
                    </label>
                    <input
                      type="text"
                      placeholder="Đơn vị tính (vd: Đĩa, chén, nồi, xoong,...)"
                      className="form-control"
                      id="product_unit"
                      required
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
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
                    <label className="form-label">Hình ảnh</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="URL Hình ảnh"
                      value={image}
                      required
                      onChange={(e) => setImage(e.target.value)}
                    />
                    <input className="form-control mt-3" type="file" />
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

export default AddProductMain;
