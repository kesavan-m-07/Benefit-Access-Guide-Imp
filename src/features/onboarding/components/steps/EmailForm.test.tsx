import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useForm, FormProvider } from "react-hook-form";
import EmailForm from "./EmailForm";

// Mock the image asset to avoid import issues
vi.mock("@assets/images/money.webp", () => ({
  default: "money-mock-url",
}));

describe("EmailForm", () => {
  const Wrapper = ({ children, defaultValues = { email: "" } }: any) => {
    const methods = useForm({
      defaultValues,
    });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  it("renders the main heading and input field", () => {
    render(
      <Wrapper>
        <EmailForm />
      </Wrapper>
    );
    expect(screen.getByRole("heading", { name: /find your unclaimed money/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
  });

  it("disables submit button when email input is empty", () => {
    render(
      <Wrapper defaultValues={{ email: "" }}>
        <EmailForm />
      </Wrapper>
    );
    const btn = screen.getByRole("button", { name: /get my guide/i });
    expect(btn).toBeDisabled();
  });

  it("enables submit button when email is entered", () => {
    render(
      <Wrapper defaultValues={{ email: "john@example.com" }}>
        <EmailForm />
      </Wrapper>
    );
    const btn = screen.getByRole("button", { name: /get my guide/i });
    expect(btn).not.toBeDisabled();
  });
});
