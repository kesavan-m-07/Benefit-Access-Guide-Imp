import React from "react";
import type { FormSteps } from "../index";
import BasicForm from "../components/BasicForm";
import AddressForm from "../components/AddressForm";
import ContactForm from "../components/ContactForm";
import WelcomeBack from "../components/WelcomeBack";

export const stepRegistry: Record<Exclude<FormSteps, "landing">, React.ReactNode> = {
  basicInfo: <BasicForm />,
  address: <AddressForm />,
  contact: <ContactForm />,
  welcomeBack: <WelcomeBack />,
};
