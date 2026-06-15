import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useForm, FormProvider } from "react-hook-form";
import ContactForm from "./ContactForm";

describe("ContactForm", () => {
  const Wrapper = ({ children, defaultValues = {} }: any) => {
    const methods = useForm({
      defaultValues: {
        firstName: "Charlie",
        phoneNumber: "",
        ...defaultValues,
      },
    });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  it("renders name greeting and disclosure agreement texts", () => {
    render(
      <Wrapper defaultValues={{ firstName: "Daniel" }}>
        <ContactForm />
      </Wrapper>
    );
    expect(screen.getByRole("heading", { name: /keep going, daniel!/i })).toBeInTheDocument();
    expect(screen.getByText(/By selecting “Continue”, I provide my ESIGN signature/i)).toBeInTheDocument();
  });

  it("renders phone number input and submit button", () => {
    render(
      <Wrapper>
        <ContactForm />
      </Wrapper>
    );
    expect(screen.getByRole("textbox", { name: /phone number/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /continue/i })).toBeInTheDocument();
  });
});
