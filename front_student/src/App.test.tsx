import { render } from "@testing-library/react";
import App from "./App";
import React from "react";

it("renders without crashing", () => {
  render(<App />);
});
