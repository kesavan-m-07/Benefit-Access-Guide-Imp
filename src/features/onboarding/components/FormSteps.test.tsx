import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useForm, FormProvider } from "react-hook-form";
import FormStepsComponent from "./FormSteps";

describe("FormStepsComponent", () => {
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

  it("returns null when step is email", () => {
    const { container } = render(
      <Wrapper>
        <FormStepsComponent step="email" />
      </Wrapper>
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders the BasicForm component when step is basicInfo", () => {
    render(
      <Wrapper>
        <FormStepsComponent step="basicInfo" />
      </Wrapper>
    );
    expect(screen.getByText("Welcome!")).toBeInTheDocument();
  });
});
