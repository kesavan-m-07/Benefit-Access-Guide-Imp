import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useForm, FormProvider } from "react-hook-form";
import AddressForm from "./AddressForm";

describe("AddressForm", () => {
  const Wrapper = ({ children, defaultValues = {} }: any) => {
    const methods = useForm({
      defaultValues: {
        firstName: "Alice",
        zipCode: "",
        address: "",
        city: "",
        state: "",
        ...defaultValues,
      },
    });
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  it("renders the greeting name from watched firstName field", () => {
    render(
      <Wrapper defaultValues={{ firstName: "Bob" }}>
        <AddressForm />
      </Wrapper>
    );
    expect(screen.getByRole("heading", { name: /keep going, bob!/i })).toBeInTheDocument();
  });

  it("renders all expected inputs (address, city, state, zip)", () => {
    render(
      <Wrapper>
        <AddressForm />
      </Wrapper>
    );
    expect(screen.getByRole("textbox", { name: /address/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /city/i })).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /zip code/i })).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument(); // state select trigger
  });
});
