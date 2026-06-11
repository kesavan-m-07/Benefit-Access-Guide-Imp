import { useFormContext, useWatch } from "react-hook-form";
import { Container, SelectBox, TextInput } from "../../../shared/components";
import { motion } from "framer-motion";
import { Button } from "../../../shared/components/Button";
import type { FormValues } from "../schema";

type AddressFormProps = {
  onNext: () => void;
};

const stateOptions = [
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Hawaii", value: "HI" },
  { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" },
  { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" },
  { label: "Pennsylvania", value: "PA" },
  { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" },
  { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" },
  { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" },
];

const AddressForm = ({ onNext }: AddressFormProps) => {
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
        className="font-lato font-medium text-lg text-gray-600"
      >
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
      <Button className="mt-6" onClick={onNext} type="button">
        Continue
      </Button>
    </Container>
  );
};

export default AddressForm;
