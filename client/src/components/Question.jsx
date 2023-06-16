import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context";

const Question = ({ answers }) => {
  const {
    questions,
    selectedAnswers,
    questionIndex,
    score,
    selected,
    handleScoreChange,
    handleSelectedChange,
    handleChecksChange,
    handleSelectedAnswersChange,
  } = useContext(UserContext);
  let question = questions[questionIndex];

  const [processedAnswers, setProcessedAnswers] = useState([]);


  const handleClickAnswer = (e, selectedQuestion) => {
    handleSelectedChange(e.target.textContent);
    if (e.target.textContent === question.correct_answer) {
      handleScoreChange(score + 1);
    }
    // handleChecksChange(questionIndex)

    // if (questionIndex + 1 < questions.length) {
    //   handleQuestionIndexChange(questionIndex + 1);
    //   setSelected();
    // } else {
    //   console.log("next");
    //   // history.push("/score");
    // }

    const isExistQuestion =
      selectedAnswers.length &&
      selectedAnswers.find((answer) => answer.question === selectedQuestion);

    if (isExistQuestion && isExistQuestion.answer) {
      const updatedAnswers = selectedAnswers.map((answer) => {
        if (answer.question === selectedQuestion) {
          return {
            question: selectedQuestion,
            answer: e.target.textContent,
            index: questionIndex,
          };
        }
        return answer;
      });
      handleSelectedAnswersChange(updatedAnswers);
    } else {
      handleSelectedAnswersChange([
        ...selectedAnswers,
        {
          question: selectedQuestion,
          answer: e.target.textContent,
          index: questionIndex,
        },
      ]);
    }
  };

  const relatedAnswer = (question, selectedAnswers) => {
    if (selectedAnswers && selectedAnswers.length) {
      const relatedQuestion = selectedAnswers.find(
        (answer) => answer.question === question
      );
      return (relatedQuestion && relatedQuestion.answer) || "";
    }
    return "";
  };
  const selectedAnswer = selectedAnswers?.find((item) => (
    item.index === questionIndex
  ))
  return (
    <div className="">
      <div className="flex border-b border-b-gray-300 pb-7">
        <span className="font-bold text-2xl text-gray-700 mr-1">
          {" "}
          {questionIndex + 1}.{" "}
        </span>
        <h1
          dangerouslySetInnerHTML={{
            __html: questions[questionIndex]?.question,
          }}
          className="font-semibold text-2xl text-gray-700"
        />
      </div>
      <div className="grid grid-cols-2 gap-6 my-8">
        {answers?.map((item) => (
          <button
            key={item}
            onClick={(e) =>
              handleClickAnswer(e, questions[questionIndex]?.question)
            }
            className={` flex p-5 px-8 cursor-pointer border-2 tranistion_b font-semibold border-gray-300 justify-start items-center rounded-2xl  ${
              selectedAnswer?.answer == item
                ? "bg-purple-500 text-white"
                : "bg-gray-100 text-zinc-800"
            } `}
            dangerouslySetInnerHTML={{ __html: item }}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Question;
