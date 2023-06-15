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
  const [questions, setQuestions] = useState();
  const [name, setName] = useState();
  const [score, setScore] = useState(0);

  const fetchQuestions = async (category, amount) => {
    console.log(category, "a", amount);
    try {
      const { data } = await axios.get(
        `${apiUrl}?amount=${amount}&category=${category}`
      );
      console.log(data);
      setQuestions(data.results);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Home fetchQuestions={fetchQuestions} />} />
        <Route path="/quiz" element={<Questions />} /> 
        <Route path="/result" element={<Score />} /> 
        <Route path="/review" element={<Reviews />} /> 
      </Routes>
    </>
  );
}

export default App;
