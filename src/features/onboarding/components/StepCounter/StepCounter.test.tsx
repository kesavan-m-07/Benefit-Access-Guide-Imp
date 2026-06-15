import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import StepCounter from "./StepCounter";

describe("StepCounter", () => {
  it("renders steps in horizontal layout by default", () => {
    render(<StepCounter step="email" onStepClick={() => {}} />);
    // In horizontal layout, step numbers are rendered inside buttons. Let's assert step numbers are there
    expect(screen.getByRole("button", { name: "1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "3" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "4" })).toBeInTheDocument();
  });

  it("renders steps in vertical layout with text descriptions", () => {
    render(<StepCounter step="email" onStepClick={() => {}} layout="vertical" />);
    // Vertical layout renders text details
    expect(screen.getByText("Email Verification")).toBeInTheDocument();
    expect(screen.getByText("Personal Details")).toBeInTheDocument();
    expect(screen.getByText("Address Info")).toBeInTheDocument();
    expect(screen.getByText("Contact Details")).toBeInTheDocument();
  });

  it("disables subsequent steps and enables click on completed steps only", async () => {
    const onStepClickMock = vi.fn();
    // At step basicInfo, index is 1. Email (index 0) is completed. address (index 2) and contact (index 3) are not completed.
    render(<StepCounter step="basicInfo" onStepClick={onStepClickMock} layout="vertical" />);

    // BasicInfo is the active step, rendered as a button with label "2"
    const step2Btn = screen.getByRole("button", { name: "2" });
    expect(step2Btn).toBeDisabled();

    // Email is completed, rendered with tick icon
    const completedStepBtn = screen.getByRole("button", { name: "" }); // completed renders icon instead of text label
    expect(completedStepBtn).not.toBeDisabled();

    await userEvent.click(completedStepBtn);
    expect(onStepClickMock).toHaveBeenCalledWith("email");
  });
});
