import type { FormSteps } from "@features/onboarding/Onboarding.tsx";
import type { FormValues } from "@features/onboarding/schema/onboarding-form-schema.ts";

export const STEP_FLOW: Record<
  FormSteps,
  {
    fields: (keyof FormValues)[];
    next?: FormSteps;
    isFinal?: boolean;
  }
> = {
  email: {
    fields: ["email"],
    next: "basicInfo",
  },
  basicInfo: {
    fields: ["firstName", "lastName", "dob", "gender"],
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
