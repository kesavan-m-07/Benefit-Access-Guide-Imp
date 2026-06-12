import BannerNotification from "./components/Banner";
import Icon from "../../shared/components/Icons/Icon";
import BenefitListItem from "./components/BenefitListItem";
import { BenefitsList } from "./data";
import { useState } from "react";
import FormStepsComponent from "./components/FormSteps";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { formSchema } from "./schema/onboarding-form-schema.ts";
import type { FormValues } from "./schema/onboarding-form-schema.ts";
import EmailForm from "./components/EmailForm";
import { STEP_FLOW } from "./constants";

export type FormSteps =
  | "landing"
  | "basicInfo"
  | "address"
  | "contact"
  | "welcomeBack";

const Home = () => {
  const [step, setStep] = useState<FormSteps>("landing");

  const methods = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      month: "",
      day: "",
      year: "",
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
    console.log("Running....");

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

  // const handleSubmit = methods.handleSubmit(onSubmit);

  return (
    <FormProvider {...methods}>
      <div className="relative">
        <div className="relative bg-hero-banner bg-no-repeat bg-cover">
          <div className="bg-hero-gradient pb-8 z-10 relative">
            <div className="relative z-20 lg:pb-20">
              <BannerNotification />

              <form
                onSubmit={(e) => {
                  console.log("Clicking...");

                  e.preventDefault();
                  handleNext();
                }}>
                {step === "landing" ? (
                  <EmailForm />
                ) : (
                  <FormStepsComponent step={step} onStepClick={setStep} />
                )}
              </form>

              <div className="flex text-white justify-center gap-11 font-fira pb-6 sm:hidden mt-6">
                <div className="flex flex-col items-center">
                  <Icon name="lock" size={70} />
                  <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="text-body-base font-semibold mt-1">
                    Secure & Private
                  </motion.p>
                </div>

                <div className="flex flex-col items-center">
                  <Icon name="hand" size={70} />
                  <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="text-body-base font-semibold mt-1">
                    Free Access
                  </motion.p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {step !== "welcomeBack" && (
          <div className="mx-4 space-y-6 mt-8 relative z-0 sm:w-3/5 sm:mx-auto">
            {BenefitsList.map((benefit, i) => (
              <BenefitListItem key={i} {...benefit} />
            ))}
          </div>
        )}
      </div>
    </FormProvider>
  );
};

export default Home;
