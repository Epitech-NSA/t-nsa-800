import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./store/store";
import { Provider } from "react-redux";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

serviceWorker.unregister();
