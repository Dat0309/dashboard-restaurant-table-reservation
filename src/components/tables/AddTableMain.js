import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { TABLE_CREATE_RESET } from "../../Redux/Constants/TableConstants";
import { createTable } from "../../Redux/Actions/TableAction";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddTableMain = () => {
  const [code, setCode] = useState("");
  const [capacity, setCapacity] = useState(0);

  const dispatch = useDispatch();

  const myRestaurant = useSelector((state) => state.restaurantOfOwners);
  const { restaurant } = myRestaurant;

  const [restaurantId, setRestaurantId] = useState(restaurant[0]._id);

  const tableCreate = useSelector((state) => state.tableCreate);
  const { loading, error, table } = tableCreate;

  useEffect(() => {
    if (table) {
      toast.success("Thêm bàn ăn thành công", ToastObjects);
      dispatch({ type: TABLE_CREATE_RESET });
      setCode(table.code);
      setCapacity(table.capacity);
    }
  }, [table, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createTable(code, capacity, restaurantId));
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
            <h2 className="content-title">Thêm bàn ăn</h2>
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
                      Mã bàn ăn
                    </label>
                    <input
                      type="text"
                      placeholder="Tên mặt hàng"
                      className="form-control"
                      id="product_title"
                      required
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="table_capacity" className="form-label">
                      Số chỗ ngồi
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="table_capacity"
                      required
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
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

export default AddTableMain;
