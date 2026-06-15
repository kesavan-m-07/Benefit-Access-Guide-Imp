import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useForm, FormProvider } from "react-hook-form";
import BasicForm from "./BasicForm";

describe("BasicForm", () => {
  const Wrapper = ({ children }: any) => {
    const methods = useForm({
      defaultValues: {
        firstName: "",
        lastName: "",
        dob: undefined,
        gender: undefined,
      },
    });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  it("renders welcome text and all expected input fields", () => {
    render(
      <Wrapper>
        <BasicForm />
      </Wrapper>
    );

    expect(screen.getByText("Welcome!")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /first name/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /last name/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /date of birth/i })).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument(); // SelectBox uses Radix trigger (role="combobox")
  });
});
