import { useFormContext, useWatch } from "react-hook-form";
import { Container, SelectBox, TextInput } from "@shared/components";
import { motion } from "framer-motion";
import { Button } from "@shared/components/Button";
import type { FormValues } from "@features/onboarding/schema/onboarding-form-schema.ts";
import { months, years, genderOptions } from "@features/onboarding/constants/basic-form";

const BasicForm = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FormValues>();

  const month = useWatch({ name: "month", control });
  const year = useWatch({ name: "year", control });

  const daysInMonth =
    month && year ? new Date(Number(year), Number(month), 0).getDate() : 31;

  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const dayStr = String(i + 1).padStart(2, "0");

    return {
      label: String(i + 1),
      value: dayStr,
    };
  });

  return (
    <Container className="p-3 rounded-xl backdrop-blur-lg flex flex-col bg-white items-center mt-3 pb-6">
      <h1 className="font-fira text-brand-blue font-bold text-2xl text-center">
        Welcome!
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="font-lato font-medium text-lg text-gray-600">
        Now we just need the basics
      </motion.p>

      <TextInput
        label="first name"
        containerClassName="mt-3"
        registration={register("firstName")}
        error={errors.firstName}
      />

      <TextInput
        label="last name"
        containerClassName="mt-3"
        registration={register("lastName")}
        error={errors.lastName}
      />

      <div className="w-full mt-3">
        <div className="grid grid-cols-3 gap-3">
          <SelectBox
            label="Date of Birth"
            options={months}
            name="month"
            placeholder="Month"
          />
          <SelectBox
            options={years}
            className="pt-7"
            name="year"
            placeholder="Year"
          />
          <SelectBox
            options={days}
            className="pt-7"
            name="day"
            disabled={!month || !year}
            helperText={
              !month || !year ? "Please select month and year first" : undefined
            }
            placeholder="Date"
          />
        </div>
      </div>

      <SelectBox
        label="Gender"
        options={genderOptions}
        name="gender"
        error={errors.gender}
        className="mt-3"
      />

      <Button className="mt-8" type="submit">
        Continue
      </Button>
    </Container>
  );
};

export default BasicForm;
