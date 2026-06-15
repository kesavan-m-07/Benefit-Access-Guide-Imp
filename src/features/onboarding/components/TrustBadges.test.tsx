import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TrustBadges from "./TrustBadges";

describe("TrustBadges", () => {
  it("renders desktop layout trust badges", () => {
    render(<TrustBadges />);
    expect(screen.getByText("Secure & Private")).toBeInTheDocument();
    expect(screen.getByText("256-bit encryption")).toBeInTheDocument();
    expect(screen.getByText("Free Access")).toBeInTheDocument();
    expect(screen.getByText("No hidden fees")).toBeInTheDocument();
  });

  it("renders mobile layout trust badges", () => {
    render(<TrustBadges mobile />);
    expect(screen.getByText("Secure & Private")).toBeInTheDocument();
    expect(screen.getByText("256-bit encryption")).toBeInTheDocument();
    expect(screen.getByText("Free Access")).toBeInTheDocument();
    expect(screen.getByText("No hidden fees")).toBeInTheDocument();
  });
});
