import { useFormContext, useWatch } from "react-hook-form";
import { Container, SelectBox, TextInput } from "../../../shared/components";
import { motion } from "framer-motion";
import { Button } from "../../../shared/components/Button";
import type { FormValues } from "../schema/onboarding-form-schema.ts";
import { stateOptions } from "../constants/address";

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
    <Container className="p-3 rounded-xl backdrop-blur-lg flex flex-col bg-white items-center mt-3 pb-6">
      <h1 className="font-fira text-brand-blue font-bold text-2xl text-center">
        Keep Going,{" "}
        <span className="inline-block max-w-truncate truncate align-bottom">
          {firstName}
        </span>
        !
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="font-lato font-medium text-lg text-gray-600">
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
