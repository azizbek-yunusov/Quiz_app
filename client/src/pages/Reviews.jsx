import { useContext } from "react";
import { UserContext } from "../context";
import { useNavigate } from "react-router-dom";
import Settings from "../components/Settings";
import { formatTime } from "../utils/formatTime";
import { categories } from "../data/categories";

const Reviews = () => {
  const { clearData, processedAnswers, time, amount, name, categoryId } =
    useContext(UserContext);
  const navigate = useNavigate();

  const categoryType = categories.find((item) => item.id == categoryId);
  const clearDataHome = () => {
    clearData();
    navigate("/");
  };
  return (
    <div className="w-full bg_color">
      <div className="container-full min-h-screen  grid grid-cols-8 overflow-hidden">
        <div className="lg:col-span-5 md:col-span-8 flex flex-col justify-between bg-white xl:mx-5 md:m-5 xl:my-14 my-8 p-10  rounded-3xl shadow-2xl">
          <div className=" h-[500px]">
            <div className="mb-8 flex justify-center">
              <h1 className="text-gray-700 font-semibold text-3xl">Reviews</h1>
            </div>
            <div className="flex flex-col overflow-y-scroll h-[400px]">
              {processedAnswers.map((item, index) => (
                <div
                  key={index}
                  className="my-2 px-2 border-b-2 border-b-gray-300"
                >
                  <div className="flex text-xl font-semibold text-gray-700">
                    <span className="mr-1">{index + 1}.</span>{" "}
                    <h1
                      className=""
                      dangerouslySetInnerHTML={{
                        __html: item.question,
                      }}
                    />
                  </div>
                  <div className="flex justify-start my-3">
                    {!item.isCorrect ? (
                      <div className="border-2 mr-4 border-red-500 rounded-xl h-min px-4 py-1">
                        <h1
                          className="text-lg"
                          dangerouslySetInnerHTML={{
                            __html: item?.wrongAnswer,
                          }}
                        />
                      </div>
                    ) : null}

                    <div className="border-2 border-green-500 rounded-xl h-min px-4 py-1">
                      <h1
                        className="text-lg"
                        dangerouslySetInnerHTML={{
                          __html: item.correctAnswer,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="sm:hidden lg:flex flex-col justify-between col-span-3 bg-white xl:mx-5 md:m-5 xl:my-14 my-8 p-10 rounded-3xl shadow-xl">
          <div className="">
            <h1 className="text-gray-700 text-center font-semibold text-3xl mb-6">
              Result
            </h1>
            <div className="flex justify-between">
              <ul className="space-y-6 text-xl font-semibold text-zinc-600">
                <li>Name:</li>
                <li>Category:</li>
                <li>Amount:</li>
                <li>Time:</li>
                <li>Score:</li>
              </ul>
              <ul className="space-y-6 text-xl font-semibold text-right text-zinc-800">
                <li>{name}</li>
                <li>{categoryType.name}</li>
                <li>{amount}</li>
                <li>{formatTime(time)}</li>
                <li>
                  {processedAnswers.filter(({ isCorrect }) => isCorrect).length}
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-between items-center">
            {/* <button
              className="button_a mr-5 bg-blue-500"
              onClick={() => navigate(-1)}
            >
              Back
            </button> */}
            <button
              onClick={() => clearDataHome()}
              className="button_a  bg-orange-500"
            >
              Home
            </button>
          </div>
        </div>
      </div>
      <Settings />
    </div>
  );
};

export default Reviews;
