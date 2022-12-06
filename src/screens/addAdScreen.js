import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import AddAdMain from "../components/ads/AddAdMain";

const AddAd = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddAdMain />
      </main>
    </>
  );
};

export default AddAd;
