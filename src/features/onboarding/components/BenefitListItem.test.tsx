import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import BenefitListItem from "./BenefitListItem";

describe("BenefitListItem", () => {
  it("renders the benefit title and tick icon", () => {
    render(<BenefitListItem title="Free housing grant" onClick={() => {}} />);
    expect(screen.getByText("Free housing grant")).toBeInTheDocument();
  });

  it("calls onClick handler when item is clicked", async () => {
    const onClickMock = vi.fn();
    render(<BenefitListItem title="Free housing grant" onClick={onClickMock} />);
    
    const item = screen.getByText("Free housing grant");
    await userEvent.click(item);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
