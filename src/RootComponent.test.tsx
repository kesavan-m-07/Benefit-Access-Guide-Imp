import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import RootComponent from "./RootComponent";

let shouldThrow = false;

// Mock the Outlet component from TanStack Router
vi.mock("@tanstack/react-router", () => ({
  Outlet: () => {
    if (shouldThrow) {
      throw new Error("Test intentional error");
    }
    return <div data-testid="root-outlet">Root Outlet</div>;
  },
}));

// Mock the ErrorFallBack component to simplify verification
vi.mock("@shared/components/ErrorBoundary/ErrorFallBack", () => ({
  default: () => <div data-testid="mock-fallback">Something went wrong</div>,
}));

describe("RootComponent", () => {
  beforeEach(() => {
    shouldThrow = false;
  });

  it("renders the Outlet when no error occurs", () => {
    render(<RootComponent />);
    expect(screen.getByTestId("root-outlet")).toBeInTheDocument();
    expect(screen.queryByTestId("mock-fallback")).not.toBeInTheDocument();
  });

  it("renders the ErrorFallback component when a child component throws an error", () => {
    // Suppress console.error output during this test to keep test runs clean
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    shouldThrow = true;

    render(<RootComponent />);
    expect(screen.getByTestId("mock-fallback")).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
