import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Logo from "./Logo";

// Mock the Icon component to simplify testing the Logo wrapper
vi.mock("@shared/components/Icons/Icon", () => ({
  default: ({ name, size }: any) => (
    <span data-testid="mock-icon" data-name={name} data-size={size}>
      Icon
    </span>
  ),
}));

describe("Logo", () => {
  it("renders the logo icon and text by default", () => {
    render(<Logo />);
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
    expect(screen.getByTestId("mock-icon")).toHaveAttribute("data-name", "logo");
    expect(screen.getByTestId("mock-icon")).toHaveAttribute("data-size", "40");
    expect(screen.getByText("Benefits Access Center")).toBeInTheDocument();
  });

  it("does not render the text when showText is false", () => {
    render(<Logo showText={false} />);
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
    expect(screen.queryByText("Benefits Access Center")).not.toBeInTheDocument();
  });

  it("renders with custom iconSize when specified", () => {
    render(<Logo iconSize={24} />);
    expect(screen.getByTestId("mock-icon")).toHaveAttribute("data-size", "24");
  });

  it("applies custom className and textClassName", () => {
    const { container } = render(
      <Logo className="custom-logo" textClassName="custom-text" />
    );
    const logoWrapper = container.firstChild as HTMLElement;
    expect(logoWrapper).toHaveClass("custom-logo");

    const textElement = screen.getByText("Benefits Access Center");
    expect(textElement).toHaveClass("custom-text");
  });
});
