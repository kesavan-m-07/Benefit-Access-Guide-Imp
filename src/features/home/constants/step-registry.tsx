import React from "react";
import BasicForm from "../components/BasicForm";
import AddressForm from "../components/AddressForm";
import ContactForm from "../components/ContactForm";
import WelcomeBack from "../components/WelcomeBack";
import type { FormSteps } from "../Home";

export const stepRegistry: Record<Exclude<FormSteps, "landing">, React.ReactNode> = {
  basicInfo: <BasicForm />,
  address: <AddressForm />,
  contact: <ContactForm />,
  welcomeBack: <WelcomeBack />,
};
