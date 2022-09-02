import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Errorpage from "./components/Errorpage";
import Home from "./components/Home";
import User from "./components/User";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/user" element={<User />} />
          <Route exact path="/user/:username" element={<User />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
