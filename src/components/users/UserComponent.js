import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listUser } from "../../Redux/Actions/userActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const UserComponent = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">QUẢN LÝ NGƯỜI DÙNG</h2>
        <div>
          <Link to="/adduser" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Tạo mới
          </Link>
        </div>
      </div>

      <div className="card mb-4">
        <header className="card-header">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Tìm kiếm người dùng, người yêu, siêu em gái..."
                className="form-control"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Hiển thị 20</option>
                <option>Hiển thị 30</option>
                <option>Hiển thị 40</option>
                <option>Hiển thị tất cả</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Tình trạng: Tất cả</option>
                <option>Đã kích hoạt</option>
                <option>Đã ngừng kích hoạt</option>
              </select>
            </div>
          </div>
        </header>

        {/* Card */}
        <div className="card-body">
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : users.users ? (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4">
              {users.users.map((user) => (
                <div className="col" key={user._id} >
                  <Link
                    to={`/user/${user._id}/edit`}>

                    <div className="card card-user shadow-sm">
                      <div className="card-header">
                        <img
                          className="img-md img-avatar"
                          src={user.avatar}
                          alt="User pic"
                        />
                      </div>
                      <div className="card-body">
                        <h5 className="card-title mt-5">{user.name}</h5>
                        <div className="card-text text-muted">
                          {user.role === "admin" ? (
                            <p className="m-0">Quyền: Quản trị</p>
                          ) : (user.role === "owners" ? (
                            <p className="m-0">Quyền: Khách hàng</p>
                          ) :
                            (
                              <p className="m-0">Quyền: Người dùng</p>
                            )
                          )}

                          <p className="m-0">
                            {user.last_name + ' ' + user.first_name}
                          </p>

                          <p>
                            <a href={`mailto:${user.email}`}>{user.email}</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <Message variant="alert-danger">Đã xảy ra lỗi, vui lòng làm mới lại trang</Message>
          )}

          {/* nav */}
          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Trước
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Sau
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default UserComponent;
