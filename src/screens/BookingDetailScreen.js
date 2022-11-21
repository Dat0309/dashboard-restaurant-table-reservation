import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import BookingDetailmain from "../components/bookings/BookingDetailmain";

const BookingDetailScreen = ({ match }) => {
  const bookingId = match.params.id;
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <BookingDetailmain bookingId={bookingId} />
      </main>
    </>
  );
};

export default BookingDetailScreen;
