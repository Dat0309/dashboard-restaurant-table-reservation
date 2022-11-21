import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import BookingMain from "../components/bookings/BookingMain";

const BookingScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <BookingMain />
      </main>
    </>
  );
};

export default BookingScreen;
