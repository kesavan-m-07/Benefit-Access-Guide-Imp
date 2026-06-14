import { motion } from "framer-motion";
import { Button, Container, TextInput } from "@shared/components";
import moneyImage from "@assets/images/money.webp";
import { useFormContext, useWatch } from "react-hook-form";
import type { FormValues } from "@features/onboarding/schema/onboarding-form-schema.ts";

const EmailForm = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FormValues>();

  const email = useWatch({ name: "email", control });

  return (
    <Container className="h-full w-full lg:w-full lg:max-w-full flex-1 p-6 sm:p-8 rounded-2xl border border-slate-200/50 bg-white/75 backdrop-blur-md flex flex-col items-center mt-3 pb-8 shadow-md mx-auto">
      <h1 className="font-fira font-extrabold text-5xl text-center pt-6 tracking-tight">
        Find Your <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-500 to-indigo-800">Unclaimed Money</span>
      </h1>
      <img
        src={moneyImage}
        alt="money"
        className="mt-4 w-1/3 max-w-32.5 sm:mt-5 sm:mx-auto"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mt-4 text-center font-lato font-medium text-base sm:text-lg text-slate-600 sm:w-6/12 sm:mx-auto">
        Get your free, made-for-you guide to unclaimed money, savings, and cash
        opportunities
      </motion.p>

      <TextInput
        label="email"
        containerClassName="mt-2"
        registration={register("email")}
        error={errors.email}
      />

      <Button
        type="submit"
        disabled={!email?.trim()}
        className="mt-hero-cta sm:mt-hero-cta">
        Get My Guide
      </Button>
    </Container>
  );
};

export default EmailForm;
