import { motion } from "framer-motion";
import { Logo } from "../Logo";
import moneyImage from "../../../assets/images/money-hero.png";
import type { FormSteps } from "../../../features/home/Home";
import { Container } from "../Container";
import { cn } from "../../utils";

type StepCounterProps = {
  step: FormSteps;
  onStepClick: (step: FormSteps) => void;
};

const stepOrder: FormSteps[] = ["landing", "basicInfo", "address", "contact"];

const StepCounter = ({ step, onStepClick }: StepCounterProps) => {
  const currentStepIndex =
    step === "welcomeBack" ? stepOrder.length : stepOrder.indexOf(step);

  return (
    <Container className="bg-white text-center px-6 pb-3 py-4 rounded-2xl flex flex-col justify-center">
      <Logo
        className="mx-auto h-2 text-10px text-2C2C37 sm:text-sm"
        iconSize={25}
      />

      <img
        src={moneyImage}
        alt="money"
        className="mt-3 w-1/2 sm:mt-5 sm:w-1/2 mx-auto"
      />

      <div className="flex gap-1 justify-center mt-6">
        {stepOrder.map((stepName, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;
          const isClickable = isCompleted;

          return (
            <motion.div
              key={index}
              role={isClickable ? "button" : undefined}
              title={
                isClickable ? `Go back to step ${stepOrder[index]}` : undefined
              }
              onClick={isClickable ? () => onStepClick(stepName) : undefined}
              whileHover={
                isClickable ? { scaleY: 1.5, scaleX: 1.1 } : undefined
              }
              whileTap={isClickable ? { scale: 0.95 } : undefined}
              className={cn(
                "h-2 rounded-full transition-colors duration-300",
                isCurrent || isCompleted
                  ? "bg-[#548B54] cursor-pointer"
                  : "bg-[#CBB49F]",
                isCurrent ? "w-16" : "w-11",
              )}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default StepCounter;
