import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MainTables from "../components/tables/MainTables";

const TableScreen = ({ match }) => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainTables />
      </main>
    </>
  );
};

export default TableScreen;
