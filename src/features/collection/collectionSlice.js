import { createSlice } from "@reduxjs/toolkit";
import { loadSaved } from "../../lib/storage";

const initialState = { items: loadSaved() };

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    addCountry(state, action) {
      const name = action.payload?.name?.common;
      const exists = state.items.some(c => c?.name?.common === name);
      if (!exists) state.items.push(action.payload);
    },
    removeCountry(state, action) {
      const name = action.payload;
      state.items = state.items.filter(c => c?.name?.common !== name);
    },
  },
});

export const { addCountry, removeCountry } = collectionSlice.actions;
export default collectionSlice.reducer;