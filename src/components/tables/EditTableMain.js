import React, { useState, useEffect } from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { TABLE_UPDATE_RESET } from "../../Redux/Constants/TableConstants";
import { editTable, updateTable } from "../../Redux/Actions/TableAction";

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};

const EditTableMain = (props) => {
  const { tableId } = props;

  const [code, setCode] = useState("");
  const [capacity, setCapacity] = useState(0);

  const dispatch = useDispatch();

  const myRestaurant = useSelector((state) => state.restaurantOfOwners);
  const { restaurant } = myRestaurant;

  const [restaurantId, setRestaurantId] = useState(restaurant._id);

  const tableEdit = useSelector((state) => state.tableEdit);
  const { loading, error, table } = tableEdit;

  const tableUpdate = useSelector((state) => state.tableUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = tableUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: TABLE_UPDATE_RESET });
      toast.success("Cập nhật bàn ăn thành công", ToastObjects);
    } else {
      if (!table.code || table._id !== tableId) {
        console.log("cant get table");
        dispatch(editTable(tableId));
      } else {
        setCode(table.code);
        setCapacity(table.capacity);
      }
    }
  }, [table, dispatch, tableId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateTable({
        _id: tableId,
        code: code,
        capacity: capacity,
        restaurant_id: restaurantId,
      })
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/tables" className="btn btn-danger text-white">
              Quay lại trang quản lý
            </Link>
            <h2 className="content-title">Chỉnh sửa bàn ăn</h2>
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
                        <label htmlFor="table_title" className="form-label">
                          Mã bàn ăn
                        </label>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="table_title"
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

export default EditTableMain;
