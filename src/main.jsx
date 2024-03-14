import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createStore } from "redux";
import { Provider } from "react-redux";

const defaultState = {
  cards: [],
};

const reduser = (state = defaultState, actions) => {
  switch (actions.type) {
    case "ADD":
      return { ...state, cards: [...state.cards, actions.payload] };
    default:
      return state;
  }
};

const store = createStore(reduser);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
