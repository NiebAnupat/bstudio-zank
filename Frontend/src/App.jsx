import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/index";
import Booking from "./pages/Booking";
import BookedList from "./pages/BookedList";
import AppBar from "./components/AppBar";

const auth = true;

export default function App() {
  return (
    <>
      {auth === true ? <AppBar /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/bookedlist" element={<BookedList />} />
      </Routes>
    </>
  );
}
