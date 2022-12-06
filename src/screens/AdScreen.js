import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainAds from "../components/ads/MainAds";

const AdScreen = ({ match }) => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainAds />
      </main>
    </>
  );
};

export default AdScreen;
