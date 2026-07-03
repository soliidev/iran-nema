import { createSlice } from "@reduxjs/toolkit";
import type { Place } from "../types/place";
import { fetchPlaces, fetchPlaceById } from "./placeThunk";

type PlacesState = {
  items: Place[];
  selected: Place | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: PlacesState = {
  items: [],
  selected: null,
  isLoading: false,
  error: null,
};

const placeSlice = createSlice({
  name: "places",
  initialState,
  reducers: {
    clearSelected: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlaces.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPlaces.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchPlaces.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "خطا در دریافت مکان‌ها";
      })
      .addCase(fetchPlaceById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPlaceById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selected = action.payload;
      })
      .addCase(fetchPlaceById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? "خطا در دریافت مکان";
      });
  },
});

export const { clearSelected } = placeSlice.actions;
export default placeSlice.reducer;
