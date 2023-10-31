import { cloneDeep } from "lodash-es";

import { Entries } from "../utils/utils.types";

type StateKeyType = "auth" | "cache" | "cart";

export const getState = <T extends object>(
  key: StateKeyType,
  InitialState: T
): T => {
  const cachedState =
    JSON.parse(localStorage.getItem("appState") || "{}")[key] || {};

  const state: T = cloneDeep(InitialState);

  for (const [k, value] of Object.entries(state) as Entries<T>) {
    state[k] = cachedState[k] || value;
  }

  console.log(key, state);

  return state;
};

export const saveState = <T>(key: StateKeyType, state: T): void => {
  const cachedState = JSON.parse(localStorage.getItem("appState") || "{}");
  cachedState[key] = state;
  localStorage.setItem("appState", JSON.stringify(cachedState));
};
