import BannerNotification from "./components/BannerNotification.tsx";
import BenefitListItem from "./components/BenefitListItem";
import { BenefitsList } from "./constants/benefits-list.ts";
import { useState, useEffect } from "react";
import FormStepsComponent from "./components/FormSteps";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "./schema/onboarding-form-schema.ts";
import type { FormValues } from "./schema/onboarding-form-schema.ts";
import EmailForm from "./components/steps/EmailForm";
import { STEP_FLOW } from "./constants";
import StepCounter from "./components/StepCounter/StepCounter";
import TrustBadges from "./components/TrustBadges.tsx";

export type FormSteps =
  | "email"
  | "basicInfo"
  | "address"
  | "contact"
  | "welcomeBack";

const Onboarding = () => {
  const [step, setStep] = useState<FormSteps>("email");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      dob: undefined,
      gender: undefined,
      address: "",
      city: "",
      state: "",
      zipCode: "",
      phoneNumber: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted successfully:", data);
    setStep("welcomeBack");
  };

  const handleNext = async () => {
    const config = STEP_FLOW[step];

    const isValid = config.fields.length
      ? await methods.trigger(config.fields)
      : true;

    if (!isValid) return;

    if (config.isFinal) {
      await methods.handleSubmit(onSubmit)();
      return;
    }

    if (config.next) {
      setStep(config.next);
    }
  };

  return (
    <FormProvider {...methods}>
      <BannerNotification />

      {step === "welcomeBack" ? (
        <div className="max-w-2xl mx-auto px-4 mt-12 w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleNext();
            }}>
            <FormStepsComponent step={step} />
          </form>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 lg:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch relative z-20">
          <div className="hidden lg:flex flex-col lg:col-span-3 gap-4 h-full">
            <StepCounter step={step} onStepClick={setStep} layout="vertical" />

            <div className="flex flex-col gap-3">
              <TrustBadges />
            </div>
          </div>
          <div className="lg:col-span-9 h-full flex flex-col justify-between">
            <div className="block lg:hidden w-full">
              <StepCounter
                step={step}
                onStepClick={setStep}
                layout="horizontal"
              />
            </div>

            <form
              className="flex flex-col flex-1 h-full relative z-10"
              onSubmit={(e) => {
                e.preventDefault();
                handleNext();
              }}>
              {step === "email" ? (
                <EmailForm />
              ) : (
                <FormStepsComponent step={step} />
              )}
            </form>
            <div className="hidden lg:grid grid-cols-3 gap-4 mt-6 w-full">
              {BenefitsList.map((benefit, i) => (
                <BenefitListItem key={i} {...benefit} />
              ))}
            </div>
          </div>
        </div>
      )}

      {step !== "welcomeBack" && (
        <div className="w-full flex flex-col gap-6 mt-6 lg:hidden px-4 relative z-0">
          <div className="flex flex-col gap-4">
            {BenefitsList.map((benefit, i) => (
              <BenefitListItem key={i} {...benefit} />
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-2 font-fira pb-6">
            <TrustBadges mobile />
          </div>
        </div>
      )}
    </FormProvider>
  );
};

export default Onboarding;
