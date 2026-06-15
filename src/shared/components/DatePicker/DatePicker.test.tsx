import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useForm, FormProvider } from "react-hook-form";
import { DatePicker } from "./DatePicker";

describe("DatePicker", () => {
  it("renders with a label and helper text in uncontrolled/plain mode", () => {
    render(
      <DatePicker
        label="Birth Date"
        helperText="Enter your date of birth"
        onChange={() => {}}
      />
    );
    expect(screen.getByText("Birth Date")).toBeInTheDocument();
    expect(screen.getByText("Enter your date of birth")).toBeInTheDocument();
  });

  it("renders error message when error prop is provided", () => {
    const errorObj = { type: "required", message: "Date is required" };
    render(<DatePicker label="Birth Date" error={errorObj} onChange={() => {}} />);
    expect(screen.getByText("Date is required")).toBeInTheDocument();
  });

  it("calls onChange callback when a date value is typed/changed", () => {
    const onChange = vi.fn();
    render(<DatePicker label="Birth Date" onChange={onChange} selected={null} />);
    
    const input = screen.getByPlaceholderText("MM/DD/YYYY");
    fireEvent.change(input, { target: { value: "10/15/1990" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    
    expect(onChange).toHaveBeenCalled();
  });

  it("integrates with react-hook-form when wrapped in FormProvider and using name prop", () => {
    const WrapperComponent = () => {
      const methods = useForm({
        defaultValues: {
          dob: null,
        },
      });

      return (
        <FormProvider {...methods}>
          <DatePicker name="dob" label="Birth Date" />
        </FormProvider>
      );
    };

    render(<WrapperComponent />);
    expect(screen.getByText("Birth Date")).toBeInTheDocument();
    const input = screen.getByPlaceholderText("MM/DD/YYYY") as HTMLInputElement;
    expect(input.value).toBe("");
  });
});
