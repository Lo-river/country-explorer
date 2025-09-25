import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "../features/countries/countriesSlice";
import collectionReducer from "../features/collection/collectionSlice";
import quizReducer from "../features/quiz/quizSlice";
import { saveSaved, addScore } from "../lib/storage";

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    collection: collectionReducer,
    quiz: quizReducer,
  },
});

// presist - keep if change/close

let prevState = store.getState();

store.subscribe(() => {
  const nextState = store.getState();

//   Save collection if it changes 
    if (prevState.collection.items !== nextState.collection.items) {
    saveSaved(nextState.collection.items);
  }

  //saves quiz result when finished change form false -> true: 

    if (!prevState.quiz.finished && nextState.quiz.finished) {
    const { username, region, score, questions } = nextState.quiz;
    addScore({
      username,
      region,
      score,
      total: questions.length,
      date: new Date().toISOString(),
    });
  }

  prevState = nextState;
});