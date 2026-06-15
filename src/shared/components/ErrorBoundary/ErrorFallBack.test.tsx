import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeAll, afterAll } from "vitest";
import ErrorFallBack from "./ErrorFallBack";

describe("ErrorFallBack", () => {
  const reloadMock = vi.fn();
  const originalLocation = window.location;

  beforeAll(() => {
    // Mock window.location.reload
    Object.defineProperty(window, "location", {
      value: {
        ...originalLocation,
        reload: reloadMock,
      },
      configurable: true,
      writable: true,
    });
  });

  afterAll(() => {
    Object.defineProperty(window, "location", {
      value: originalLocation,
      configurable: true,
      writable: true,
    });
  });

  it("renders error message header", () => {
    render(<ErrorFallBack />);
    expect(screen.getByRole("heading", { name: /something went wrong/i })).toBeInTheDocument();
  });

  it("calls window.location.reload when reload button is clicked", async () => {
    render(<ErrorFallBack />);
    const reloadBtn = screen.getByRole("button", { name: /reload/i });
    await userEvent.click(reloadBtn);
    expect(reloadMock).toHaveBeenCalledTimes(1);
  });
});
