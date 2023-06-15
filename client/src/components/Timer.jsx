import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import { useNavigate } from "react-router-dom";

const Timer = () => {
  const { questions, handleProcessedChange, time, handleOutTimeChange } =
    useContext(UserContext);
  const navigate = useNavigate();
  let quizTime = questions.length * 60;
  const [remainingTime, setRemainingTime] = useState(quizTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    if (remainingTime === 0) {
      clearInterval(interval);
      handleProcessedChange();
      navigate("/result");
    }
    handleOutTimeChange(remainingTime);

    return () => {
      clearInterval(interval);
    };
  }, [remainingTime]);

  const formatTime = () => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };
  console.log("time", time);
  return (
    <div className="flex items-center font-mono text-gray-700 font-semibold text-3xl">
      <h1 className="mr-1">Time:</h1>
      <p
        className={`${
          remainingTime < quizTime / 3
            ? "text-red-500 animate-pulse"
            : "text-green-500"
        } `}
      >
        {formatTime()}
      </p>
    </div>
  );
};

export default Timer;
