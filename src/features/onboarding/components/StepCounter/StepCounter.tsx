import React from "react";
import { motion } from "framer-motion";
import { Logo } from "@shared/components/Logo";
import type { FormSteps } from "@features/onboarding/Onboarding";
import { Container } from "@shared/components/Container";
import Icon from "@shared/components/Icons/Icon";
import { cn } from "@shared/utils";

type StepCounterProps = {
  step: FormSteps;
  onStepClick: (step: FormSteps) => void;
  layout?: "horizontal" | "vertical";
};

const stepOrder: FormSteps[] = ["email", "basicInfo", "address", "contact"];

const stepMetadata = [
  {
    key: "email" as FormSteps,
    label: "1",
    title: "Email Verification",
    description: "Start with your email",
  },
  {
    key: "basicInfo" as FormSteps,
    label: "2",
    title: "Personal Details",
    description: "Tell us who you are",
  },
  {
    key: "address" as FormSteps,
    label: "3",
    title: "Address Info",
    description: "Tell us where you live",
  },
  {
    key: "contact" as FormSteps,
    label: "4",
    title: "Contact Details",
    description: "Confirm phone number",
  },
];

const StepCounter = ({ step, onStepClick, layout = "horizontal" }: StepCounterProps) => {
  const currentStepIndex =
    step === "welcomeBack" ? stepOrder.length : stepOrder.indexOf(step);

  if (layout === "vertical") {
    return (
      <Container className="bg-white/90 border border-slate-200/50 backdrop-blur-md px-6 py-8 rounded-2xl flex flex-col justify-between shadow-md w-full lg:w-full lg:max-w-full sm:px-5 items-center">
        <div className="flex flex-col">
          <Logo
            className="mb-3 text-slate-800"
            textClassName="text-xs font-semibold tracking-wider text-slate-800"
            iconSize={26}
          />

          <div className="flex flex-col mt-6 relative">
            {stepMetadata.map((s, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const isClickable = isCompleted;

              return (
                <div key={index} className="relative flex gap-4 items-start pb-8 last:pb-0 group">
                  {index < stepMetadata.length - 1 && (
                    <div
                      className={cn(
                        "absolute left-4.25 top-9 w-0.5 h-[calc(100%-24px)] transition-colors duration-300",
                        index < currentStepIndex ? "bg-emerald-500" : "bg-slate-200"
                      )}
                    />
                  )}
                  <motion.button
                    type="button"
                    disabled={!isClickable}
                    onClick={isClickable ? () => onStepClick(s.key) : undefined}
                    whileHover={isClickable ? { scale: 1.05 } : undefined}
                    whileTap={isClickable ? { scale: 0.95 } : undefined}
                    className={cn(
                      "relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border shrink-0",
                      isCompleted
                        ? "bg-emerald-500 border-emerald-500 text-white cursor-pointer shadow-sm"
                        : isCurrent
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/20"
                        : "bg-slate-50 border-slate-250 text-slate-400 cursor-not-allowed"
                    )}
                  >
                    {isCompleted ? (
                      <Icon name="tick" className="w-4 h-4 [&_rect]:fill-none [&_path]:fill-current text-white" />
                    ) : (
                      <span>{s.label}</span>
                    )}
                  </motion.button>
                  <div className="flex flex-col text-left">
                    <p
                      className={cn(
                        "font-fira font-semibold text-sm transition-colors duration-300",
                        isCurrent ? "text-indigo-600 font-bold" : isCompleted ? "text-slate-800" : "text-slate-400"
                      )}
                    >
                      {s.title}
                    </p>
                    <p
                      className={cn(
                        "font-lato text-xs mt-0.5 transition-colors duration-300",
                        isCurrent ? "text-slate-600 font-medium" : isCompleted ? "text-slate-500" : "text-slate-400"
                      )}
                    >
                      {s.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 py-3 px-4 bg-white/70 backdrop-blur-md rounded-2xl border border-slate-200/50 shadow-sm w-full max-w-md mx-auto">
      {stepMetadata.map((s, index) => {
        const isCompleted = index < currentStepIndex;
        const isCurrent = index === currentStepIndex;
        const isClickable = isCompleted;

        return (
          <React.Fragment key={index}>
            {index > 0 && (
              <div
                className={cn(
                  "flex-1 h-0.5 max-w-10 transition-colors duration-300",
                  index <= currentStepIndex ? "bg-emerald-500" : "bg-slate-200"
                )}
              />
            )}

            <motion.button
              type="button"
              disabled={!isClickable}
              onClick={isClickable ? () => onStepClick(s.key) : undefined}
              whileTap={isClickable ? { scale: 0.95 } : undefined}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 border shrink-0",
                isCompleted
                  ? "bg-emerald-500 border-emerald-500 text-white cursor-pointer"
                  : isCurrent
                  ? "bg-indigo-600 border-indigo-600 text-white ring-4 ring-indigo-500/10"
                  : "bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed"
              )}
            >
              {isCompleted ? (
                <Icon name="tick" className="w-3.5 h-3.5 [&_rect]:fill-none [&_path]:fill-current text-white" />
              ) : (
                <span>{s.label}</span>
              )}
            </motion.button>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StepCounter;
