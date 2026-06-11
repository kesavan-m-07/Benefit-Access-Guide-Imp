import BannerNotification from "./components/Banner";
import Icon from "../../shared/components/Icons/Icon";
import BenefitListItem from "./components/BenefitListItem";
import { BenefitsList } from "./data";
import { useState } from "react";
import FormStepsComponent from "./components/FormSteps";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { formSchema } from "./schema";
import type { FormValues } from "./schema";
import LandingPage from "./components/LandingPage";

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

  const handleNext = async (currentStep: FormSteps) => {
    if (currentStep === "landing") {
      const isValid = await methods.trigger("email");
      if (isValid) setStep("basicInfo");
    } else if (currentStep === "basicInfo") {
      const isValid = await methods.trigger([
        "firstName",
        "lastName",
        "month",
        "day",
        "year",
        "gender",
      ]);
      if (isValid) setStep("address");
    } else if (currentStep === "address") {
      const isValid = await methods.trigger([
        "address",
        "city",
        "state",
        "zipCode",
      ]);
      if (isValid) setStep("contact");
    } else if (currentStep === "contact") {
      const isValid = await methods.trigger("phoneNumber");
      if (isValid) {
        methods.handleSubmit(onSubmit)();
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <div>
        <div className="relative">
          <div className="relative bg-hero-banner bg-no-repeat bg-cover">
            <div className="bg-hero-gradient pb-8 z-10 relative">
              <div className="relative z-20 lg:pb-20">
                <BannerNotification />

                {step === "landing" ? (
                  <LandingPage handleNext={handleNext} />
                ) : (
                  <FormStepsComponent
                    step={step}
                    onNext={() => handleNext(step)}
                    onStepClick={setStep}
                  />
                )}

                <div>
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
          </div>

          <div className="mx-4 space-y-6 mt-8 relative z-0  sm:w-3/5 sm:mx-auto">
            {BenefitsList.map((benefit, i) => (
              <BenefitListItem key={i} {...benefit} />
            ))}
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default Home;
