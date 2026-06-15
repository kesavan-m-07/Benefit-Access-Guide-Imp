import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import NotFound from "./NotFound";

// Mock the Link component from TanStack Router
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to, ...props }: any) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

describe("NotFound", () => {
  it("renders page title and Coming Soon header", () => {
    render(<NotFound />);
    expect(screen.getByText("Coming Soon")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /page under construction/i })).toBeInTheDocument();
    expect(screen.getByText(/We're currently building this page/i)).toBeInTheDocument();
  });

  it("renders Go Home link that points to root path", () => {
    render(<NotFound />);
    const homeLink = screen.getByRole("link", { name: /go home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("calls window.history.back when Go Back button is clicked", async () => {
    const backMock = vi.fn();
    const originalHistory = window.history;
    // @ts-ignore
    delete window.history;
    window.history = { ...originalHistory, back: backMock } as any;

    render(<NotFound />);
    const backBtn = screen.getByRole("button", { name: /go back/i });
    await userEvent.click(backBtn);

    expect(backMock).toHaveBeenCalledTimes(1);

    // Restore original history
    window.history = originalHistory;
  });
});
