import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";

import { getState, saveState } from "./global";

import { tCartItems, tMeal } from "./types/app.types";

type CartType = {
  cart: tCartItems;
};

const CartInitialState: CartType = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cache",
  initialState: getState<CartType>("cart", CartInitialState),
  reducers: {
    addMealToCart(state, { payload }: PayloadAction<tMeal>) {
      if (state.cart.find((cartItem) => cartItem.meal._id === payload._id))
        return;

      state.cart.push({ meal: payload, quantity: 1 });

      saveState("cart", current(state));
    },
    removeMealFromCart(state, { payload }: PayloadAction<string>) {
      state.cart = state.cart.filter(
        (cartItem) => cartItem.meal._id !== payload
      );

      saveState("cart", current(state));
    },
    updateQuantity(
      state,
      { payload }: PayloadAction<{ mealId: string; type: "inc" | "dec" }>
    ) {
      const cartItem = state.cart.find(
        (cartItem) => cartItem.meal._id === payload.mealId
      );

      if (!cartItem) return;

      if (payload.type === "dec" && cartItem.quantity === 1) return;

      if (payload.type === "dec") cartItem.quantity -= 1;
      if (payload.type === "inc") cartItem.quantity += 1;

      saveState("cart", current(state));
    },
    clearCart(state) {
      state.cart = [];

      saveState("cart", current(state));
    },
  },
});

export const { addMealToCart, removeMealFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
