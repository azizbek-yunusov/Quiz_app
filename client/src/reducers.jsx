export function reducer(state, { type, payload }) {
  switch (type) {
    case "GET_QUIZ_DATA":
      return {
        ...state,
        questions: payload || [],
        loading: false,
      };
    case "SCORE_CHANGE":
      return {
        ...state,
        score: payload,
        loading: false,
      };
    case "QUESTION_INDEX_CHANGE":
      return {
        ...state,
        questionIndex: payload,
        loading: false,
      };
    case "QUESTION_OPTIONS_CHANGE":
      return {
        ...state,
        options: payload,
        loading: false,
      };
    case "NAME_CHANGE":
      return {
        ...state,
        name: payload,
        loading: false,
      };
    case "CATEGORY_ID_CHANGE":
      return {
        ...state,
        categoryId: payload,
        loading: false,
      };
    case "AMOUNT_CHANGE":
      return {
        ...state,
        amount: payload,
        loading: false,
      };
    case "SELECTED_CHANGE":
      return {
        ...state,
        selected: payload,
        loading: false,
      };
    case "SELECTED_ANWERS_CHANGE": {
      return {
        ...state,
        selectedAnswers: payload,
      };
    }
    case "OUT_TIME": {
      let time = (state.questions.length * 60) - payload;
      console.log(time);
      return {
        ...state,
        time: time,
      };
    }
    case "PROCESSED_ANWERS_CHANGE": {
      const processedAnswers = state.selectedAnswers.map(
        ({ answer, question }) => {
          const relatedQuestion = state.questions.find(
            (category) => category.question === question
          );
          if (relatedQuestion.correct_answer === answer) {
            return { correctAnswer: answer, isCorrect: true, question };
          }
          return {
            correctAnswer: relatedQuestion.correct_answer,
            wrongAnswer: answer,
            isCorrect: false,
            question,
          };
        }
      );
      return {
        ...state,
        processedAnswers: processedAnswers,
      };
    }
    default:
      return state;
  }
}
