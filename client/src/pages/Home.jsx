import { Button, Input } from "@material-tailwind/react";
import { categories } from "../data/categories";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context";
import axios from "axios";
import { apiUrl } from "../utils/apiUrl";

const Home = () => {
  const {
    amount,
    categoryId,
    questions,
    handleCategoryIdChange,
    handleAmountChange,
    handleNameChange,
    getQuestions,
  } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const fetchQuestions = async () => {
    try {
      const { data } = await axios.get(
        `${apiUrl}?amount=${amount}&category=${categoryId}`
      );
      const formattedQuestions = data.results.map((quiz) => {
        const incorrectAnswersIndexes = quiz.incorrect_answers.length;
        const randomIndex = Math.round(
          Math.random() * (incorrectAnswersIndexes - 0) + 0
        );

        quiz.incorrect_answers.splice(randomIndex, 0, quiz.correct_answer);

        return {
          ...quiz,
          answers: quiz.incorrect_answers,
        };
      });
      getQuestions(formattedQuestions);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    fetchQuestions();
    if (questions.length) {
      setLoading(false);
      navigate("/quiz");
    }
  };
  console.log(questions);
  useEffect(() => {
    if (questions.length) {
      navigate("/quiz");
    }
  }, [navigate, questions]);

  return (
    <div className="bg_color min-h-screen flex_center">
      <div className="container-full flex_center">
        <div className="bg-white rounded-3xl shadow-2xl flex flex-col items-center max-w-xl p-8 w-full">
          <h1 className="font-bold text-4xl text-gray-800">Quiz App</h1>
          <input
            type="text"
            placeholder="Name"
            required
            onChange={(e) => handleNameChange(e.target.value)}
            className="pl-5 outline-none mt-10 bg-white border border-gray-300 w-full rounded-xl py-3 text-lg"
          />
          <select
            value={categoryId}
            onChange={(e) => handleCategoryIdChange(e.target.value)}
            className="pl-5 outline-none mt-7 bg-white border border-gray-300 w-full rounded-xl py-3 text-lg"
          >
            <option>Select Category</option>
            {categories.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <select
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            className="pl-5 outline-none mt-7 bg-white border border-gray-300 w-full rounded-xl py-3 text-lg"
          >
            <option>Select Amount</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
          <button
            onClick={() => handleSubmit()}
            className="button_a mt-10 mx-0 bg-green-500"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {"loading..."}
              </div>
            ) : (
              "Start"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
