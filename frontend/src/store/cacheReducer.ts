import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";

import { getState, saveState } from "./global";

import { tFullMeal, tFullMeals, tMealTypes, tMeals } from "./types/app.types";

type CacheType = {
  newestMeals: tMeals | null;
  topDishes: tMeals | null;
  mealsCache: tFullMeals;
  mealTypes: tMealTypes;
};

const CacheInitialState: CacheType = {
  newestMeals: null,
  topDishes: null,
  mealsCache: [],
  mealTypes: [],
};

const cacheSlice = createSlice({
  name: "cache",
  initialState: getState<CacheType>("cache", CacheInitialState),
  reducers: {
    updateNewestMeals(state, { payload }: PayloadAction<tMeals>) {
      state.newestMeals = payload;

      saveState("cache", current(state));
    },
    updateTopDishes(state, { payload }: PayloadAction<tMeals>) {
      state.topDishes = payload;

      saveState("cache", current(state));
    },
    updateMealTypes(state, { payload }: PayloadAction<tMealTypes>) {
      state.mealTypes = payload;

      saveState("cache", current(state));
    },
    updateMealsCache(state, { payload }: PayloadAction<tFullMeal>) {
      state.mealsCache = [
        payload,
        ...state.mealsCache
          .filter((meal) => meal._id !== payload._id)
          .slice(0, 4),
      ];

      saveState("cache", current(state));
    },
  },
});

export const {
  updateNewestMeals,
  updateTopDishes,
  updateMealTypes,
  updateMealsCache,
} = cacheSlice.actions;

export default cacheSlice.reducer;
