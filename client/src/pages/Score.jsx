import React, { useContext, useEffect } from "react";
import { UserContext } from "../context";
import { Link, useNavigate } from "react-router-dom";
import { sendToResultTelegramBot } from "../api/submit";
import { categories } from "../data/categories";
import { formatTime } from "../utils/formatTime";

const Score = () => {
  const { clearData, categoryId, amount, name, time, processedAnswers } =
    useContext(UserContext);
  const navigate = useNavigate();
  const categoryType = categories.find((item) => item.id == categoryId);

  const clearDataHome = () => {
    clearData();
    navigate("/");
  };
  useEffect(() => {
    let data = {
      name,
      amount,
      score: processedAnswers.filter(({ isCorrect }) => isCorrect).length,
      category: categoryType?.name,
      time: formatTime(time),
    };
    console.log(data);
    sendToResultTelegramBot(data);
  }, []);
  return (
    <div className="bg_color min-h-screen flex_center">
      <div className="container-full flex_center">
        <div className="bg-white rounded-3xl shadow-2xl flex flex-col items-center max-w-xl p-8 w-full">
          <h1 className=" font-semibold text-4xl text-gray-800">Results</h1>
          <p className="text-2xl my-4 font-semibold ">
            {processedAnswers.filter(({ isCorrect }) => isCorrect).length} out
            of {processedAnswers.length}
          </p>
          <p className="text-2xl my-4 font-semibold ">
            time: {formatTime(time)}
          </p>
          <div className="flex mt-10 justify-between w-full items-center">
            <button
              onClick={() => clearDataHome()}
              className="button_a bg-orange-500"
            >
              Home
            </button>
            <Link to="/review" className="w-full ml-5">
              <button className="button_a bg-green-500">Reviews</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Score;
