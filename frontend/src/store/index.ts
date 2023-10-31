import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authReducer";
import cacheReducer from "./cacheReducer";
import cartReducer from "./cartReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cache: cacheReducer,
    cart: cartReducer,
  },
});

export type tRootState = ReturnType<typeof store.getState>;
