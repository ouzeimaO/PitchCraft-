import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the PitchCraft creation screen", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /votre prochaine grande idée/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/quelle idée souhaitez-vous présenter/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /générer mon pitch/i })).toBeDisabled();
});
