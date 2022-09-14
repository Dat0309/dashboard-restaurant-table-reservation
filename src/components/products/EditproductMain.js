import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editProduct,
  updateProduct,
} from "./../../Redux/Actions/ProductActions";
import { PRODUCT_UPDATE_RESET } from "../../Redux/Constants/ProductConstants";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { categoryDetails, listCategories } from "../../Redux/Actions/CategoryActions";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditProductMain = (props) => {
  const { productId } = props;

  const [name, setName] = useState("");
  const [categories_id, setCategoryID] = useState("");
  const [menu_id, setMenu_id] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");

  const dispatch = useDispatch();

  const productEdit = useSelector((state) => state.productEdit);
  const { loading, error, product } = productEdit;

  const categoriesList = useSelector((state) => state.categoriesList);
  const { loadingCate, errorCate, categories } = categoriesList;

  const categoryDetail = useSelector((state) => state.categoryDetail);
  const { loadingCateDetail, errorCateDetail, category } = categoryDetail;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    dispatch(listCategories());

    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      toast.success("Cập nhật món ăn thành công", ToastObjects);
    } else {
      if (!product.name || product._id !== productId) {
        console.log("cant get product");
        dispatch(editProduct(productId));
      } else {
        setName(product.name);
        setCategoryID(product.categories_id);
        setDescription(product.description);
        setMenu_id(product.menu_id);
        setImage(product.image);
        setPrice(product.price);
        setUnit(product.unit);
      }
      dispatch(categoryDetails(categories_id));
    }
  }, [product, dispatch, productId, successUpdate, categories_id, menu_id]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name: name,
        categories_id: categories_id,
        image: image,
        menu_id: menu_id,
        description: description,
        price: price,
        unit: unit,
      })
    );
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
                        <label htmlFor="product_title" className="form-label">
                          Tên món ăn
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_title"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_category" className="form-label">
                          Loại món ăn
                        </label>
                        <select className="form-select"
                          onChange={(e) => setCategoryID(e.target.value)}
                          value={category.name}
                          id="product_category">
                          {(loadingCate && loadingCateDetail) ? (
                            <div className='mb-5'>
                              <Loading />
                            </div>
                          ) : (errorCate || errorCateDetail) ? (
                            <Message variant="alert-danger">{error}</Message>
                          ) : (
                            <>
                              <option>{category.name}</option>
                              {categories.map((categoryState) => (
                                <option value={categoryState._id}>
                                  {categoryState.name}
                                </option>
                              ))}
                            </>
                          )}
                        </select>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="product_price" className="form-label">
                          Giá
                        </label>
                        <input
                          type="number"
                          placeholder="Type here"
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
                          placeholder="Type here"
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
                          placeholder="Type here"
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
                        <input className="form-control mt-3" type="file"/>
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

export default EditProductMain;
