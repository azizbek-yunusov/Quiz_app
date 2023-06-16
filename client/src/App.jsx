import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { apiUrl } from "./utils/apiUrl";
import Questions from "./pages/Questions";
import axios from "axios";
import { useState } from "react";
import Score from "./pages/Score";
import Reviews from "./pages/Reviews";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Questions />} /> 
        <Route path="/result" element={<Score />} /> 
        <Route path="/review" element={<Reviews />} /> 
      </Routes>
    </>
  );
}

export default App;
