import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders the correct content", () => {
  const { getByText, getByPlaceholderText } = render(<App />);
  expect(getByText("Basic Input"));
  expect(getByPlaceholderText("Enter.."));
});

test("allows users to enter in input", () => {
  const { getByText, getByLabelText } = render(<App />);
  const input = getByLabelText("What needs to be done?");
  fireEvent.change(input, { target: { value: "Learn spanish" } });
  expect(getByText("Learn spanish"));
});
