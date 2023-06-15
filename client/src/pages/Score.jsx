import React, { useContext } from "react";
import { UserContext } from "../context";
import Settings from "../components/Settings";
import { Link } from "react-router-dom";

const Score = () => {
  const { processedAnswers, time } = useContext(UserContext);
  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };
  return (
    <div className="bg_color min-h-screen flex_center">
      <div className="container-full flex_center">
        <div className="bg-white rounded-3xl shadow-2xl flex flex-col items-center max-w-xl p-8 w-full">
          <h1 className=" font-semibold text-4xl text-gray-800">Results</h1>
          <p className="text-2xl my-4 font-semibold ">
              {processedAnswers.filter(({ isCorrect }) => isCorrect).length} out of{" "}
              {processedAnswers.length}
          </p>
          <p className="text-2xl my-4 font-semibold ">
             time: {formatTime()}
          </p>
          <div className="flex mt-10 justify-between w-full items-center">
            <Link to="/" className="w-full">
              <button className="button_a bg-orange-500">
                Home
              </button>
            </Link>
            <Link to="/review" className="w-full ml-5">
              <button className="button_a bg-green-500">
                Reviews
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Score;
