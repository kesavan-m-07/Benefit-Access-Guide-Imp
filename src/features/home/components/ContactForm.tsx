import { useFormContext, useWatch } from "react-hook-form";
import { Container, TextInput } from "../../../shared/components";
import { motion } from "framer-motion";
import { Button } from "../../../shared/components/Button";
import type { FormValues } from "../schema";

type ContactFormProps = {
  onNext: () => void;
};

const ContactForm = ({ onNext }: ContactFormProps) => {
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
    <Container className="p-4 rounded-xl backdrop-blur-lg flex flex-col bg-white items-center mt-3 pb-6">
      <h1 className="font-fira text-brand-blue font-bold text-2xl text-center">
        Keep Going,{" "}
        <span className="inline-block max-w-truncate truncate align-bottom">
          {firstName || "user"}
        </span>
        !
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="font-lato font-medium text-lg text-gray-600">
        Thanks! Please confirm your number
      </motion.p>

      <TextInput
        label="phone number"
        error={errors.phoneNumber}
        containerClassName="mt-3"
        registration={register("phoneNumber")}
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="text-footnote/5 font-lato font-medium mt-2 text-secondary">
        By selecting “Continue”, I provide my ESIGN signature and express
        consent for GetnGoods, Unified Marketing Partners & its{" "}
        <a
          title="https://unified-marketingpartners.com/subsidiaries2"
          className="underline text-blue-500 underline-offset-3"
          href="https://unified-marketingpartners.com/subsidiaries2">
          Subsidiaries
        </a>
        , SnagnGoods, USMsg, MyJobMobile, OMG Sweeps, Best Day Ever Sweepstakes,
        FamilyRecoveryHub, Dollar-Sensei, CheckGo, Lendli, Benefitlink, Americas
        Health and Grant-Navigators to contact me at the phone number I provided
        for marketing and transactional messages, including personal finance,
        benefits & sweepstakes, via text and calls, which may use automated,
        manual, prerecorded, or AI technology, until I revoke consent. This
        applies even if my number is on a "Do Not Call" list. Consent is not
        required to to use this site or obtain goods/services.{" "}
        <span className=" text-blue-500">Click Here</span> to proceed without
        consent. I have read and agree to the{" "}
        <a
          title="https://gettnngooods.com/p/gg-terms"
          href="https://gettnngooods.com/p/gg-terms"
          className="underline underline-offset-3 text-blue-500">
          Terms & Conditions
        </a>
        , including mandatory arbitration, and for resolving disputes and TCPA
        claim.
      </motion.p>

      <Button className="mt-6" onClick={onNext} type="button">
        Continue
      </Button>
    </Container>
  );
};

export default ContactForm;
