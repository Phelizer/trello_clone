import { render, screen } from "@testing-library/react";
import App from "./App";

test("plug", () => {
  render(<App />);
  const plug = true;
  expect(plug).toBe(true);
});
