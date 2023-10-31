import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";

import "./App.css";

import App from "./App";

import { store } from "./store";

import ErrorBoundary from "./hoc/ErrorBoundary/ErrorBoundary";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
