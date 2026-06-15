import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import BannerNotification from "./BannerNotification";

describe("BannerNotification", () => {
  it("renders non-affiliated government disclaimer message", () => {
    render(<BannerNotification />);
    expect(
      screen.getByText("THIS SITE IS NOT AFFILIATED WITH ANY GOVERNMENT AGENCY.")
    ).toBeInTheDocument();
  });
});
