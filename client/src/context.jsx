import { createContext, useReducer } from "react";
import { reducer } from "./reducers";

const UserContext = createContext();

const initialState = {
  name: "",
  amount: 0,
  categoryId: "",
  question: {},
  selected: "",
  options: [],
  questionIndex: 0,
  questions: [],
  score: 0,
  selectedAnswers: [],
  processedAnswers: [],
  time: "",
};
const UserContextProvider = ({ children }) => {
  const [value, dispatch] = useReducer(reducer, initialState);
  value.getQuestions = (data) => {
    dispatch({ type: "GET_QUIZ_DATA", payload: data });
  };
  value.handleScoreChange = (data) => {
    dispatch({ type: "SCORE_CHANGE", payload: data });
  };
  value.handleQuestionIndexChange = (data) => {
    dispatch({ type: "QUESTION_INDEX_CHANGE", payload: data });
  };
  value.handleQuestionOptionsChange = (data) => {
    dispatch({ type: "QUESTION_OPTIONS_CHANGE", payload: data });
  };
  value.handleNameChange = (data) => {
    dispatch({ type: "NAME_CHANGE", payload: data });
  };
  value.handleCategoryIdChange = (data) => {
    dispatch({ type: "CATEGORY_ID_CHANGE", payload: data });
  };
  value.handleAmountChange = (data) => {
    dispatch({ type: "AMOUNT_CHANGE", payload: data });
  };
  value.handleSelectedChange = (data) => {
    dispatch({ type: "SELECTED_CHANGE", payload: data });
  };
  value.handleSelectedAnswersChange = (data) => {
    dispatch({ type: "SELECTED_ANWERS_CHANGE", payload: data });
  };
  value.handleProcessedChange = (data) => {
    dispatch({ type: "PROCESSED_ANWERS_CHANGE", payload: data });
  };
  value.handleOutTimeChange = (data) => {
    dispatch({ type: "OUT_TIME", payload: data });
  };
  value.clearData = () => {
    dispatch({ type: "CLEAR_DATA", });
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
