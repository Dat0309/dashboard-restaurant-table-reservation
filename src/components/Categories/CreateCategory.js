import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createCategory } from "../../Redux/Actions/CategoryActions";
import { CATEGORY_CREATE_RESET } from "../../Redux/Constants/CategoryConstants";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const CreateCategory = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");

  const dispatch = useDispatch();

  const categoryCreate = useSelector((state) => state.categoryCreate);
  const { loading, error, category } = categoryCreate;

  useEffect(() => {
    if (category) {
      toast.success("Thêm Danh mục thành công", ToastObjects);
      dispatch({ type: CATEGORY_CREATE_RESET });
      setName("");
      setImage("");
    }
  }, [category, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createCategory(name, image));
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
      <div className="col-md-12 col-lg-4">
        <form onSubmit={submitHandler}>
          {error && <Message variant="alert-danger">{error}</Message>}
          {loading && <Loading />}
          <div className="mb-4">
            <label htmlFor="product_name" className="form-label">
              Tên Danh mục món ăn
            </label>
            <input
              type="text"
              placeholder="Gõ tên :D"
              className="form-control py-3"
              id="product_name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              Thêm ảnh
            </button>
          </div>

          <div className="d-grid">
            <button className="btn btn-primary py-3">Tạo danh mục</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateCategory;
