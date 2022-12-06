import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import EditAdMain from "../components/ads/EditAdMain";

const AdEditScreen = ({ match }) => {
  const adId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditAdMain tableId={adId} />
      </main>
    </>
  );
};
export default AdEditScreen;
