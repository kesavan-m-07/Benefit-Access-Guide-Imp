import React from "react";
import StepCounter from "../../../shared/components/StepCounter/StepCounter";
import type { FormSteps } from "../Home";
import BasicForm from "./BasicForm";
import AddressForm from "./AddressForm";
import ContactForm from "./ContactForm";
import WelcomeBack from "./WelcomeBack";
import { motion, AnimatePresence } from "framer-motion";

type FormStepsProps = {
  step: FormSteps;
  onNext: () => void;
  onStepClick: (step: FormSteps) => void;
};

const FormStepsComponent = ({ step, onNext, onStepClick }: FormStepsProps) => {
  const stepRegistry: Record<Exclude<FormSteps, "landing">, React.ReactNode> = {
    basicInfo: <BasicForm onNext={onNext} />,
    address: <AddressForm onNext={onNext} />,
    contact: <ContactForm onNext={onNext} />,
    welcomeBack: <WelcomeBack />,
  };
  
  if (step === "landing") return null;

  return (
    <div className="px-tight pb-card py-card m-compact">
      <StepCounter step={step} onStepClick={onStepClick} />
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
        >
          {stepRegistry[step]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FormStepsComponent;
