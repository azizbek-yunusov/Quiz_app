/* eslint-disable no-unsafe-optional-chaining */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";
import QuestionList from "../components/QuestionList";
import Question from "../components/Question";
import { Link, useNavigate } from "react-router-dom";
import Settings from "../components/Settings";
import Timer from "../components/Timer";

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const Questions = () => {
  const {
    questions,
    questionIndex,
    processedAnswers,
    selectedAnswers,
    handleSelectedChange,
    handleQuestionIndexChange,
    handleProcessedChange,
  } = useContext(UserContext);

  const navigate = useNavigate();
  const answers = questions[questionIndex]?.answers;

  const handlePrev = () => {
    if (questionIndex - 1 < questions.length) {
      handleQuestionIndexChange(questionIndex - 1);
    } else {
      navigate("/score");
    }
  };
  const handleNext = () => {
    if (questionIndex + 1 < questions.length) {
      handleQuestionIndexChange(questionIndex + 1);
      handleSelectedChange("");
    } else {
      console.log("next");
      navigate("/score");
    }
  };

  const handleResult = () => {
    handleProcessedChange();
  };
  useEffect(() => {
    if (!questions.length) {
      navigate("/");
    }
  }, [navigate, questions]);
  console.log("proc", processedAnswers);
  return (
    <div className="w-full bg_color">
      <div className="container-full min-h-screen  grid grid-cols-8">
        <div className="lg:col-span-5 md:col-span-8 flex flex-col justify-between bg-white xl:mx-5 md:m-5 xl:my-14 my-8 p-10  rounded-3xl shadow-2xl">
          <div className="">
            <div className="mb-8 flex justify-between items-center">
              <h1 className="text-gray-700 font-semibold text-3xl">
                Question {questionIndex + 1}
                <span className="text-xl text-gray-500">/10</span>
              </h1>
              <Timer />
            </div>
            <Question questionIndex={questionIndex} answers={answers} />
          </div>
          <div className="flex items-center justify-evenly">
            <button
              onClick={handlePrev}
              disabled={!questionIndex}
              className={`button_c bg-orange-500 ${
                !questionIndex ? "opacity-50" : ""
              } `}
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              className={`button_c ${
                questionIndex + 1 < questions?.length
                  ? "bg-blue-500"
                  : "bg-green-500"
              } `}
            >
              {questionIndex + 1 < questions?.length ? "next" : "finish"}
            </button>
            {/* score {score} */}
          </div>
        </div>
        <div className="md:hidden lg:flex flex-col justify-between items-center col-span-3 bg-white xl:mx-5 md:m-5 xl:my-14 my-8 p-10 rounded-3xl shadow-xl">
          <div className="">
            <h1 className="text-gray-700 text-center font-semibold text-3xl mb-6">
              Question list
            </h1>
            <QuestionList />
          </div>
          <Link to={"/result"} className="w-full">
          <button onClick={handleResult} className="button_c bg-green-500">
            Finish
          </button>
          </Link>
        </div>
      </div>
      <Settings />
    </div>
  );
};

export default Questions;
