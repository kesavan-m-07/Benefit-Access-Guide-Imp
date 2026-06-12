import StepCounter from "./StepCounter/StepCounter";
import type { FormSteps } from "@features/onboarding/Onboarding";
import { stepRegistry } from "@features/onboarding/constants";
import { motion, AnimatePresence } from "framer-motion";

type FormStepsProps = {
  step: FormSteps;
  onStepClick: (step: FormSteps) => void;
};

const FormStepsComponent = ({ step, onStepClick }: FormStepsProps) => {
  if (step === "email") return null;

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
