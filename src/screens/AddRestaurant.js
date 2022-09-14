import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import AddRestaurantMain from "../components/restaurants/AddRestaurantMain";

const AddRestaurant = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddRestaurantMain />
      </main>
    </>
  );
};

export default AddRestaurant;
