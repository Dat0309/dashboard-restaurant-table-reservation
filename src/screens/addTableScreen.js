import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import AddTableMain from "../components/tables/AddTableMain";

const AddTable = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddTableMain />
      </main>
    </>
  );
};

export default AddTable;
