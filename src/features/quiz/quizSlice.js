import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchByRegion } from "../../lib/api";
import { shuffle } from "../../lib/shuffle";

export const startQuiz = createAsyncThunk(
  "quiz/startQuiz",
  async ({ username, region }, { signal }) => {
    const countries = await fetchByRegion(region, { signal });
    const withFlags = countries.filter(c => c.flags?.svg || c.flags?.png);
    const questions = shuffle(withFlags).slice(0, 15).map(c => ({
      name: c.name?.common,
      flag: c.flags?.svg || c.flags?.png,
    }));
    return { username, region, questions };
  }
);

const initialState = {
  username: "",
  region: "Europe",
  questions: [],
  index: 0,
  score: 0,
  status: "idle",
  error: null,
  finished: false,
  lastCorrect: null,
  lastCountry: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    answerQuestion(state, action) {
      if (state.finished) return;

      const given = (action.payload || "").trim().toLowerCase();
      const current = state.questions[state.index];
      const correctName = current?.name || "";
      const isCorrect = given === correctName.toLowerCase();

      if (isCorrect) state.score += 1;
      state.lastCorrect = isCorrect;
      state.lastCountry = correctName;

      if (state.index >= state.questions.length - 1) {
        state.finished = true;
      } else {
        state.index += 1;
      }
    },
    resetQuiz() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startQuiz.pending, (state) => {
        state.username = "";
        state.region = "Europe";
        state.questions = [];
        state.index = 0;
        state.score = 0;
        state.finished = false;
        state.lastCorrect = null;
        state.lastCountry = null;
        state.status = "loading";
        state.error = null;
      })
      .addCase(startQuiz.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.username = action.payload.username;
        state.region = action.payload.region;
        state.questions = action.payload.questions;
      })
      .addCase(startQuiz.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Falied to start quiz";
      });
  },
});

export const { answerQuestion, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;