import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userCreateReducer,
  userEditReducer,
  userListReducer,
  userLoginReducer,
  userUpdateReducer,
} from "./Reducers/userReducers";
import {
  productCreateReducer,
  productDeleteReducer,
  productEditReducer,
  productListByCategoryIdReducer,
  productListByRestaurantIdReducer,
  productListReducer,
  productUpdateReducer,
} from "./Reducers/ProductReducers";
import {
  orderDeliveredReducer,
  orderDetailsReducer,
  orderListReducer,
} from "./Reducers/OrderReducres";
import {
  categoryCreateReducer,
  categoryDeleteReducer,
  categoryDetailsReducer,
  categoryEditReducer,
  categoryListReducer,
  categoryUpdateReducer,
} from "./Reducers/CategoryReducers";
import {
  restaurantByOwners,
  restaurantCreateReducer,
  restaurantDeleteReducer,
  restaurantEditReducer,
  restaurantListByCategoryIdReducer,
  restaurantListReducer,
  restaurantUpdateReducer,
} from "./Reducers/RestaurantReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  userCreate: userCreateReducer,
  userEdit: userEditReducer,
  userUpdate: userUpdateReducer,
  productList: productListReducer,
  productByCategortId: productListByCategoryIdReducer,
  productByRestaurantId: productListByRestaurantIdReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  productUpdate: productUpdateReducer,
  categoriesList: categoryListReducer,
  categoryDetail: categoryDetailsReducer,
  categoryDelete: categoryDeleteReducer,
  categoryCreate: categoryCreateReducer,
  categoryEdit: categoryEditReducer,
  categoryUpdate: categoryUpdateReducer,
  restaurantList: restaurantListReducer,
  restaurantOfOwners: restaurantByOwners,
  restaurantByCategortId: restaurantListByCategoryIdReducer,
  restaurantDelete: restaurantDeleteReducer,
  restaurantCreate: restaurantCreateReducer,
  restaurantEdit: restaurantEditReducer,
  restaurantUpdate: restaurantUpdateReducer,
  orderList: orderListReducer,
  orderDetails: orderDetailsReducer,
  orderDeliver: orderDeliveredReducer,
});

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// my restaurant
const userRestaurantFromLocalStorage = localStorage.getItem("userRestaurant")
  ? JSON.parse(localStorage.getItem("userRestaurant"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
  userRestaurant: {
    restaurant: userRestaurantFromLocalStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
