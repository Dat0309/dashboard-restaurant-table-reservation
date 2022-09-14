import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import EditRestaurantMain from "../components/restaurants/EditRestaurantMain";

const RestaurantEditScreen = ({ match }) => {
  const restaurantId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditRestaurantMain restaurantId={restaurantId} />
      </main>
    </>
  );
};
export default RestaurantEditScreen;
