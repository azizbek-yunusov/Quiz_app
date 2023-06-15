import { useContext } from "react";
import { UserContext } from "../context";

const QuestionList = () => {
  const {
    handleQuestionIndexChange,
    selectedAnswers,
    questions,
    questionIndex,
  } = useContext(UserContext);
  console.log("qeus", questionIndex);
  const selectedAnswer = (itemIndex) =>
    selectedAnswers?.find((item) => item.index == itemIndex);

  console.log(selectedAnswers?.find((item) => item.index === 2));
  return (
    <div className="grid xl:grid-cols-4 md:grid-cols-3 gap-4">
      {questions.map((item, index) => (
        <div
          onClick={() => handleQuestionIndexChange(index)}
          key={index}
          className=""
        >
          <div
            className={`rounded-full tranistion_b cursor-pointer ${
              questions.length > 10
                ? "w-16 h-16 text-2xl"
                : "xl:w-[75px] xl:h-[75px] md:w-[70px] md:h-[70px] text-3xl"
            }  flex justify-center items-center text-gray-700 font-semibold font-mono border-4 border-gray-300 bg-slate-100 ${
              !(selectedAnswers?.find((item) => item.index === index)) ? "border-[#45d4ff]" : "bg-purple-500 text-white"
            } `}
          >
            {index + 1}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
