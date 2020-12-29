import React from "react";
import { render, screen } from "@testing-library/react";
import Main from "./Main";
import { getMaxListeners } from "process";

test("renders learn react link", () => {
  render(<getMaxListeners />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
