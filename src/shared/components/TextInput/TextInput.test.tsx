import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { useForm, FormProvider } from "react-hook-form";
import { TextInput } from "./Textinput";

describe("TextInput", () => {
  it("renders with a label and helper text", () => {
    render(
      <TextInput
        label="First Name"
        helperText="Enter your legal first name"
        placeholder="e.g. John"
      />
    );
    expect(screen.getByText("First Name")).toBeInTheDocument();
    expect(screen.getByText("Enter your legal first name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("e.g. John")).toBeInTheDocument();
  });

  it("shows error message when error is provided", () => {
    const errorObj = { type: "required", message: "First name is required" };
    render(<TextInput label="First Name" error={errorObj} />);
    expect(screen.getByText("First name is required")).toBeInTheDocument();
  });

  it("allows entering text in the input", async () => {
    render(<TextInput label="First Name" placeholder="e.g. John" />);
    const input = screen.getByPlaceholderText("e.g. John");
    await userEvent.type(input, "Alice");
    expect(input).toHaveValue("Alice");
  });

  it("integrates with react-hook-form registration", async () => {
    const WrapperComponent = () => {
      const methods = useForm({
        defaultValues: {
          username: "",
        },
      });

      return (
        <FormProvider {...methods}>
          <form>
            <TextInput
              label="Username"
              placeholder="Username"
              registration={methods.register("username")}
            />
          </form>
        </FormProvider>
      );
    };

    render(<WrapperComponent />);
    const input = screen.getByPlaceholderText("Username");
    await userEvent.type(input, "my_username");
    expect(input).toHaveValue("my_username");
  });
});
