import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Onboarding from "./Onboarding";

// Mock the image asset to avoid import issues
vi.mock("@assets/images/money.webp", () => ({
  default: "money-mock-url",
}));

import { useFormContext, Controller } from "react-hook-form";

// Mock variables prefixed with 'mock' are not hoisted out of scope by Vitest
const mockUseFormContext = useFormContext;
const MockController = Controller;

// Mock SelectBox to render a simple HTML select element for JSDOM compatibility
vi.mock("@shared/components/SelectInput", () => {
  return {
    SelectBox: ({ label, name, options, value, onChange, placeholder, error }: any) => {
      const formContext = mockUseFormContext();

      const selectElement = (val: any, onValChange: any) => (
        <div data-testid={`selectbox-wrapper-${name}`}>
          {label && <label htmlFor={`select-${name}`}>{label}</label>}
          <select
            id={`select-${name}`}
            role="combobox"
            value={val || ""}
            onChange={(e) => onValChange && onValChange(e.target.value)}
          >
            <option value="">{placeholder || "Select..."}</option>
            {options.map((opt: any) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {error && <span role="alert">{error.message}</span>}
        </div>
      );

      if (formContext && name) {
        return (
          <MockController
            name={name}
            control={formContext.control}
            render={({ field }: any) => selectElement(field.value, field.onChange)}
          />
        );
      }

      return selectElement(value, onChange);
    },
  };
});

describe("Onboarding Integration", () => {
  it("renders the Email step initially and transitions through the form pages", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    render(<Onboarding />);

    // Step 1: Email Form
    expect(screen.getByRole("heading", { name: /find your unclaimed money/i })).toBeInTheDocument();
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const getGuideBtn = screen.getByRole("button", { name: /get my guide/i });

    // Submit button is disabled initially
    expect(getGuideBtn).toBeDisabled();

    // Type a valid email
    await userEvent.type(emailInput, "user@example.com");
    expect(getGuideBtn).not.toBeDisabled();
    await userEvent.click(getGuideBtn);

    // Step 2: Personal Details (BasicForm)
    await waitFor(() => {
      expect(screen.getByText("Welcome!")).toBeInTheDocument();
    });

    const firstNameInput = screen.getByRole("textbox", { name: /first name/i });
    const lastNameInput = screen.getByRole("textbox", { name: /last name/i });
    const continueBtn1 = screen.getByRole("button", { name: /continue/i });

    await userEvent.type(firstNameInput, "Jane");
    await userEvent.type(lastNameInput, "Smith");

    // Select date and select box
    const dobInput = screen.getByPlaceholderText("MM/DD/YYYY");
    await userEvent.type(dobInput, "05/20/1995");

    // Select gender using the mocked select box
    const genderSelect = screen.getByLabelText("Gender");
    await userEvent.selectOptions(genderSelect, "male");

    // Now continue should succeed
    await userEvent.click(continueBtn1);

    // Step 3: Address Form
    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /keep going, Jane!/i })).toBeInTheDocument();
    });

    const zipInput = screen.getByPlaceholderText("10001");
    const addressInput = screen.getByPlaceholderText(/123 Main Street/i);
    const cityInput = screen.getByPlaceholderText("Los Angeles");
    // Find the state combobox by its label
    const stateSelect = screen.getByLabelText("State");
    const continueBtn2 = screen.getByRole("button", { name: /continue/i });

    await userEvent.type(zipInput, "90210");
    await userEvent.type(addressInput, "456 Oak Avenue");
    await userEvent.type(cityInput, "Beverly Hills");
    
    // Select state using mocked select box
    await userEvent.selectOptions(stateSelect, "CA");

    await userEvent.click(continueBtn2);

    // Step 4: Contact Form
    await waitFor(() => {
      expect(screen.getByText("Thanks! Please confirm your number")).toBeInTheDocument();
    });

    const phoneInput = screen.getByPlaceholderText(/123/i);
    const finalSubmitBtn = screen.getByRole("button", { name: /continue/i });

    await userEvent.type(phoneInput, "(555) 555-5555");
    await userEvent.click(finalSubmitBtn);

    // Step 5: Welcome Back Page
    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /welcome back! are you feeling lucky today\?/i })).toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  }, 30000);
});

