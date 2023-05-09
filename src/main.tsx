import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CanvasDraw from "react-canvas-draw";
import "./style/global.css";
import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
ReactDOM.createRoot(document.getElementById("canvas") as HTMLElement).render(
  <CanvasDraw />
);
