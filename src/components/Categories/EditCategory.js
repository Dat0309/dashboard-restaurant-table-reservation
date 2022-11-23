import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  editCategory,
  updateCategory,
} from "../../Redux/Actions/CategoryActions";
import { CATEGORY_UPDATE_RESET } from "../../Redux/Constants/CategoryConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditCategory = (props) => {
  const { categoryId } = props;

  const [name, setCategoryName] = useState("");
  const [image, setThumb] = useState("");

  const dispatch = useDispatch();

  const categoryEdit = useSelector((state) => state.categoryEdit);
  const { loading, error, category } = categoryEdit;

  const categoryUpdate = useSelector((state) => state.categoryUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = categoryUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: CATEGORY_UPDATE_RESET });
      toast.success("Category Updated", ToastObjects);
    } else {
      if (!category.name || category._id !== categoryId) {
        dispatch(editCategory(categoryId));
      } else {
        setCategoryName(category.name);
        setThumb(category.image);
      }
    }
  }, [category, dispatch, categoryId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateCategory({
        _id: categoryId,
        name: name,
        image: image,
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
          setThumb((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
          setThumb(result.info.url);
        }
      }
    );
    //open widget
    myWidget.open();
  }

  return (
    <>
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/categories" className="btn btn-danger text-white">
              Quay lại trang quản lý
            </Link>
            <h2 className="content-title">Chỉnh sửa Danh mục</h2>
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
                          Tên Danh mục
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_title"
                          required
                          value={name}
                          onChange={(e) => setCategoryName(e.target.value)}
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
                          onChange={(e) => setThumb(e.target.value)}
                        />
                        <button
                          id="upload_widget"
                          className="btn btn-primary"
                          onClick={() => handleOpenWidget()}
                        >
                          Sửa ảnh
                        </button>
                        <div className="card card-product-grid shadow-sm">
                          <div>
                            <img
                              alt="thumb"
                              src={image}
                              height={300}
                              width={600}
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

export default EditCategory;
