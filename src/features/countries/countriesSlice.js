import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchByRegion, fetchByName } from "../../lib/api";

export const loadRegion = createAsyncThunk(
  "countries/loadRegion",
  async (region, { signal }) => fetchByRegion(region, { signal })
);

export const loadCountryByName = createAsyncThunk(
  "countries/loadByName",
  async (name, { signal }) => fetchByName(name, { signal })
);

const initialState = {
  region: "Europe",
  items: [],
  status: "idle",
  error: null,
  selected: null,
  selectedStatus: "idle",
  selectedError: null,
};

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setRegion(state, action) {
      state.region = action.payload;
    },
    clearSelected(state) {
      state.selected = null;
      state.selectedStatus = "idle";
      state.selectedError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadRegion.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadRegion.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadRegion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Unknown error";
      })
      .addCase(loadCountryByName.pending, (state) => {
        state.selectedStatus = "loading";
        state.selectedError = null;
      })
      .addCase(loadCountryByName.fulfilled, (state, action) => {
        state.selectedStatus = "succeeded";
        state.selected = action.payload;
      })
      .addCase(loadCountryByName.rejected, (state, action) => {
        state.selectedStatus = "failed";
        state.selectedError = action.error?.message || "Unknown error";
      });
  },
});

export const { setRegion, clearSelected } = countriesSlice.actions;
export default countriesSlice.reducer;