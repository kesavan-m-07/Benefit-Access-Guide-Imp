import { useFormContext } from "react-hook-form";
import {
  Container,
  SelectBox,
  TextInput,
  DatePicker,
} from "@shared/components";
import { motion } from "framer-motion";
import { Button } from "@shared/components/Button";
import type { FormValues } from "@features/onboarding/schema/onboarding-form-schema.ts";
import { genderOptions } from "@features/onboarding/constants/basic-form";

const BasicForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <Container className="h-full w-full lg:w-full lg:max-w-full flex-1 p-6 sm:p-8 rounded-2xl border border-slate-200/50 bg-white/90 backdrop-blur-md flex flex-col items-center mt-3 pb-8 shadow-md">
      <h1 className="font-fira text-slate-900 font-bold text-2xl text-center pt-2 tracking-wide">
        Welcome!
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="font-lato font-medium text-base text-slate-500 mt-1 mb-2">
        Now we just need the basics
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4">
        <TextInput
          label="first name"
          required
          placeholder="John"
          registration={register("firstName")}
          error={errors.firstName}
        />

        <TextInput
          label="last name"
          required
          placeholder="Doe"
          registration={register("lastName")}
          error={errors.lastName}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-4 items-start">
        <DatePicker label="Date of Birth" name="dob" disableFutureDates />
        <SelectBox
          label="Gender"
          options={genderOptions}
          name="gender"
          error={errors.gender}
          placeholder="Gender"
        />
      </div>

      <Button className="mt-8" type="submit">
        Continue
      </Button>
    </Container>
  );
};

export default BasicForm;
