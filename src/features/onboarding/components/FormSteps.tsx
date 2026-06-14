import type { FormSteps } from "@features/onboarding/Onboarding";
import { stepRegistry } from "@features/onboarding/constants";
import { motion, AnimatePresence } from "framer-motion";

type FormStepsProps = {
  step: FormSteps;
};

const FormStepsComponent = ({ step }: FormStepsProps) => {
  if (step === "email") return null;

  return (
    <div className="w-full h-full flex flex-col flex-1">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="w-full h-full flex flex-col flex-1"
        >
          {stepRegistry[step]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FormStepsComponent;
