import React from "react";
import BasicForm from "@features/onboarding/components/steps/BasicForm";
import AddressForm from "@features/onboarding/components/steps/AddressForm";
import ContactForm from "@features/onboarding/components/steps/ContactForm";
import WelcomeBack from "@features/onboarding/components/steps/WelcomeBack";
import type { FormSteps } from "@features/onboarding/Onboarding";

export const stepRegistry: Record<Exclude<FormSteps, "email">, React.ReactNode> = {
  basicInfo: <BasicForm />,
  address: <AddressForm />,
  contact: <ContactForm />,
  welcomeBack: <WelcomeBack />,
};
