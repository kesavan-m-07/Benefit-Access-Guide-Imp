import type { FormSteps } from "../index";
import type { FormValues } from "../schema/onboarding-form-schema.ts";

export const STEP_FLOW: Record<
  FormSteps,
  {
    fields: (keyof FormValues)[];
    next?: FormSteps;
    isFinal?: boolean;
  }
> = {
  landing: {
    fields: ["email"],
    next: "basicInfo",
  },
  basicInfo: {
    fields: ["firstName", "lastName", "month", "day", "year", "gender"],
    next: "address",
  },
  address: {
    fields: ["address", "city", "state", "zipCode"],
    next: "contact",
  },
  contact: {
    fields: ["phoneNumber"],
    isFinal: true,
  },
  welcomeBack: {
    fields: [],
  },
};
