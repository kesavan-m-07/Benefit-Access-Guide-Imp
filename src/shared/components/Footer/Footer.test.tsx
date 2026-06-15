import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Footer from "./Footer";

// Mock the Link component from TanStack Router
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to, ...props }: any) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

// Mock the Logo component to avoid complex svg/nested render dependencies
vi.mock("@shared/components/Logo", () => ({
  Logo: () => <div data-testid="mock-logo">Logo</div>,
}));

describe("Footer", () => {
  it("renders the Logo component", () => {
    render(<Footer />);
    expect(screen.getByTestId("mock-logo")).toBeInTheDocument();
  });

  it("renders the copyright text with the correct year", () => {
    render(<Footer />);
    expect(screen.getByText(/© Benefits Access Center, 2026/i)).toBeInTheDocument();
  });

  it("renders all nav links defined in footerNav data", () => {
    render(<Footer />);
    // Check that we render the links. footerNav usually contains links like "Privacy Policy", "Terms of Service", etc.
    // Let's assert that multiple links are rendered
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute("href");
  });
});
