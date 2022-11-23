import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import EditTableMain from "../components/tables/EditTableMain";

const TableEditScreen = ({ match }) => {
  const tableId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditTableMain tableId={tableId} />
      </main>
    </>
  );
};
export default TableEditScreen;
