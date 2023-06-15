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
    name,
    questions,
    handleCategoryIdChange,
    handleAmountChange,
    handleNameChange,
    getQuestions,
  } = useContext(UserContext);
  const navigate = useNavigate();

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
  const handleSubmit = () => {
    console.log("d");
    fetchQuestions();
    if (questions.length) {
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
            Start
          </button>
        </div>
        {/* <div className="mt-7 max-w-sm w-full">
        <Select size="lg" variant="outlined" label="Select Version">
          {categories.map((item) => (
            <Option key={item.id}>{item.name}</Option>
          ))}
        </Select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Select Category</option>
          {categories.map((item) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <div className="mt-3">
          <Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            size="lg"
            label="count"
            type="number"
            min="1"
            max="15"
          />
        </div>
        <Button onClick={handleSubmit} className="mt-5 w-full">
          Start
        </Button>
      </div> */}
      </div>
    </div>
  );
};

export default Home;
