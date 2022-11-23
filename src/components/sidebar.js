import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div className="aside-top">
          <Link to="/" className="brand-wrap">
            <img
              src="/images/logo.png"
              style={{ height: "46" }}
              className="logo"
              alt="Ecommerce dashboard template"
            />
          </Link>
          <div>
            <button className="btn btn-icon btn-aside-minimize">
              <i className="text-muted fas fa-stream"></i>
            </button>
          </div>
        </div>
        {userInfo.role === "admin" ? (
          <nav>
            <ul className="menu-aside">
              <li className="menu-item">
                <NavLink
                  activeClassName="active"
                  className="menu-link"
                  to="/"
                  exact={true}
                >
                  <i className="icon fas fa-home"></i>
                  <span className="text">Trang Thống kê</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeClassName="active"
                  className="menu-link"
                  to="/categories"
                >
                  <i className="icon fas fa-list"></i>
                  <span className="text">Quản lý danh mục</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeClassName="active"
                  className="menu-link"
                  to="/orders"
                >
                  <i className="icon fas fa-bags-shopping"></i>
                  <span className="text">Quản lý đơn hàng</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeClassName="active"
                  className="menu-link"
                  to="/users"
                >
                  <i className="icon fas fa-user"></i>
                  <span className="text">Quản lý người dùng</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeClassName="active"
                  className="menu-link"
                  to="/restaurants"
                >
                  <i className="icon fas fa-store-alt"></i>
                  <span className="text">Quản lý nhà hàng</span>
                </NavLink>
              </li>
            </ul>
            <br />
            <br />
          </nav>
        ) : (
          <nav>
            <ul className="menu-aside">
              <li className="menu-item">
                <NavLink
                  activeClassName="active"
                  className="menu-link"
                  to="/products"
                >
                  <i className="icon fas fa-shopping-bag"></i>
                  <span className="text">Quản lý sản phẩm</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeClassName="active"
                  className="menu-link"
                  to="/addproduct"
                >
                  <i className="icon fas fa-cart-plus"></i>
                  <span className="text">Thêm sản phẩm</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeClassName="active"
                  className="menu-link"
                  to="/bookings"
                >
                  <i className="icon fas fa-bags-shopping"></i>
                  <span className="text">Quản lý lịch hẹn</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink
                  activeClassName="active"
                  className="menu-link"
                  to="/tables"
                >
                  <i className="icon fas fa-list"></i>
                  <span className="text">Quản lý bàn ăn</span>
                </NavLink>
              </li>
            </ul>
            <br />
            <br />
          </nav>
        )}
      </aside>
    </div>
  );
};

export default Sidebar;
