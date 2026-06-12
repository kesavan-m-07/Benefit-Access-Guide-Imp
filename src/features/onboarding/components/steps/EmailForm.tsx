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
    <Container className="p-3 rounded-xl backdrop-blur-lg flex flex-col bg-white items-center mt-3 pb-6">
      <h1 className="font-fira font-bold text-hero-headline text-center text-brand-blue sm:text-5xl pt-10">
        Find Your Unclaimed Money
      </h1>

      <img
        src={moneyImage}
        alt="money"
        className="mt-3 w-full sm:mt-5 sm:w-1/2 sm:mx-auto"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mt-4 text-center font-lato font-semibold text-lg text-muted sm:w-3/4 sm:mx-auto lg:w-4/6">
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
