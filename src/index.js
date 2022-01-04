import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,

  document.getElementById("root")
);

Modal.setAppElement("#root");
