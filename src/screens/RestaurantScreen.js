import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainRestaurants from "../components/restaurants/MainRestaurant";

const RestaurantScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pagenumber = match.params.pagenumber;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainRestaurants keyword={keyword} pagenumber={pagenumber}/>
      </main>
    </>
  );
};

export default RestaurantScreen;
