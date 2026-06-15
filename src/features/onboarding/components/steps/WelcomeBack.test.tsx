import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import WelcomeBack from "./WelcomeBack";

describe("WelcomeBack", () => {
  it("renders welcome back heading", () => {
    render(<WelcomeBack />);
    expect(
      screen.getByRole("heading", { name: /welcome back! are you feeling lucky today\?/i })
    ).toBeInTheDocument();
  });

  it("renders Yes and No buttons", () => {
    render(<WelcomeBack />);
    expect(screen.getByRole("button", { name: /yes/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /no/i })).toBeInTheDocument();
  });
});
