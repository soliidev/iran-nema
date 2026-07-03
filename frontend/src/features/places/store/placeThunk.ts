import { createAsyncThunk } from "@reduxjs/toolkit";
import { placeService } from "../services/place.service";
import type { Place } from "../types/place";

export const fetchPlaces = createAsyncThunk<Place[]>(
  "places/fetchAll",
  async () => {
    const { data } = await placeService.getAll();
    return data.data ?? data;
  },
);

export const fetchPlaceById = createAsyncThunk<Place, number>(
  "places/fetchById",
  async (id) => {
    const { data } = await placeService.getById(id);
    return data.data ?? data;
  },
);
