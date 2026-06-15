import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AppLayout from "./AppLayout";

// Mock the Outlet component from TanStack Router
vi.mock("@tanstack/react-router", () => ({
  Outlet: () => <div data-testid="router-outlet">Router Outlet Content</div>,
}));

// Mock the Footer component
vi.mock("@shared/components/Footer/Footer", () => ({
  default: () => <footer data-testid="app-footer">Footer Content</footer>,
}));

describe("AppLayout", () => {
  it("renders the main container layout structure", () => {
    const { container } = render(<AppLayout />);
    expect(container.querySelector(".min-h-screen")).toBeInTheDocument();
  });

  it("renders the Router Outlet and Footer inside the layout", () => {
    render(<AppLayout />);
    expect(screen.getByTestId("router-outlet")).toBeInTheDocument();
    expect(screen.getByTestId("app-footer")).toBeInTheDocument();
  });
});
