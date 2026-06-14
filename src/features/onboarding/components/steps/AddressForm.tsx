import { useFormContext, useWatch } from "react-hook-form";
import { Container, SelectBox, TextInput } from "@shared/components";
import { motion } from "framer-motion";
import { Button } from "@shared/components/Button";
import type { FormValues } from "@features/onboarding/schema/onboarding-form-schema";
import { stateOptions } from "@features/onboarding/constants";

const AddressForm = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<FormValues>();

  const firstName = useWatch({
    control,
    name: "firstName",
  });

  return (
    <Container className="h-full w-full lg:w-full lg:max-w-full flex-1 p-6 sm:p-8 rounded-2xl border border-slate-200/50 bg-white/75 backdrop-blur-md flex flex-col items-center mt-3 pb-8 shadow-md">
      <h1 className="font-fira text-slate-900 font-bold text-2xl text-center pt-2 tracking-wide">
        Keep Going,{" "}
        <span className="inline-block max-w-truncate truncate align-bottom text-indigo-600 font-extrabold">
          {firstName}
        </span>
        !
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="font-lato font-medium text-base text-slate-500 mt-1 mb-2">
        Now we just need the basics
      </motion.p>
      <TextInput
        label="zip code"
        containerClassName="mt-3"
        registration={register("zipCode")}
        error={errors.zipCode}
      />
      <TextInput
        label="address"
        containerClassName="mt-3"
        registration={register("address")}
        error={errors.address}
      />
      <div className="flex w-full gap-3">
        <TextInput
          label="city"
          containerClassName="mt-3 flex-1"
          registration={register("city")}
          error={errors.city}
        />
        <SelectBox
          label="State"
          className="mt-3 flex-1"
          options={stateOptions}
          name="state"
          error={errors.state}
        />
      </div>
      <Button className="mt-6" type="submit">
        Continue
      </Button>
    </Container>
  );
};

export default AddressForm;
