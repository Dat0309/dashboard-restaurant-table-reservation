import React, { useEffect } from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Login from "./screens/LoginScreen";
import UsersScreen from "./screens/UsersScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import { useDispatch, useSelector } from "react-redux";
import ProductScreen from "./screens/productScreen";
import AddProduct from "./screens/AddProduct";
import CategoriesScreen from "./screens/CategoriesScreen";
import CategoryEditScreen from "./screens/CategoryEditScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderScreen from "./screens/OrderScreen";
import OrderDetailScreen from "./screens/OrderDetailScreen";
import UserEditScreen from "./screens/UserEditScreen";
import AddUser from "./screens/AddUser";
import RestaurantScreen from "./screens/RestaurantScreen";
import RestaurantEditScreen from "./screens/RestaurantEditScreen";
import AddRestaurant from "./screens/AddRestaurant";
import BookingScreen from "./screens/BookingScreen";
import BookingDetailScreen from "./screens/BookingDetailScreen";
function App() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <Router>
        <Switch>
          <Route path="/search/:keyword" component={ProductScreen} exact />
          <Route path="/page/:pagenumber" component={ProductScreen} exact />
          <PrivateRouter path="/products" component={ProductScreen} />
          <PrivateRouter
            path="/product/:id/edit"
            component={ProductEditScreen}
          />
          <Route
            path="/search-restaurant/:keyword"
            component={RestaurantScreen}
            exact
          />
          <Route
            path="/page-restaurant/:pagenumber"
            component={RestaurantScreen}
            exact
          />
          <PrivateRouter path="/restaurants" component={RestaurantScreen} />
          <PrivateRouter
            path="/restaurant/:id/edit"
            component={RestaurantEditScreen}
          />
          <PrivateRouter path="/categories" component={CategoriesScreen} />
          <PrivateRouter
            path="/category/:id/edit"
            component={CategoryEditScreen}
          />
          <PrivateRouter path="/addproduct" component={AddProduct} />
          <PrivateRouter path="/addrestaurant" component={AddRestaurant} />
          <PrivateRouter path="/orders" component={OrderScreen} />
          <PrivateRouter path="/order/:id" component={OrderDetailScreen} />
          <PrivateRouter path="/bookings" component={BookingScreen} />
          <PrivateRouter path="/booking/:id" component={BookingDetailScreen} />
          <PrivateRouter path="/" component={HomeScreen} exact />
          <PrivateRouter path="/users" component={UsersScreen} />
          <PrivateRouter path="/user/:id/edit" component={UserEditScreen} />
          <PrivateRouter path="/adduser" component={AddUser} />
          <Route path="/login" component={Login} />
          <PrivateRouter path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
