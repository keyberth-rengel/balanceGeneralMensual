import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import Gastos from "./GastosPage";

function App() {
  return (
    <Provider store={store}>
      <Gastos />
    </Provider>
  );
}

export default App;
