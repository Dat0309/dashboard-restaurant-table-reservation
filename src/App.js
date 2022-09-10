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
          <PrivateRouter path="/addproduct" component={AddProduct} />
          <PrivateRouter path="/" component={HomeScreen} exact />
          <PrivateRouter path="/users" component={UsersScreen} />
          <Route path="/login" component={Login} />
          <PrivateRouter path="*" component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
