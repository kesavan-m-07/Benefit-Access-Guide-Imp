import { useFormContext, useWatch } from "react-hook-form";
import { Container, TextInput } from "@shared/components";
import { motion } from "framer-motion";
import { Button } from "@shared/components/Button";
import type { FormValues } from "@features/onboarding/schema/onboarding-form-schema.ts";

const ContactForm = () => {
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
          {firstName || "User"}
        </span>
        !
      </h1>
      <motion.p
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="font-lato font-medium text-base text-slate-500 mt-1 mb-2">
        Thanks! Please confirm your number
      </motion.p>

      <div className="w-full space-y-4">
        <TextInput
          label="phone number"
          error={errors.phoneNumber}
          registration={register("phoneNumber")}
          placeholder="e.g., (123) 456-7890"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="w-full text-left p-3.5 bg-slate-50/60 border border-slate-200/60 rounded-xl max-h-32 overflow-y-auto text-slate-500 shadow-inner">
          <p className="text-[11px] leading-relaxed font-lato font-medium text-slate-500">
            By selecting “Continue”, I provide my ESIGN signature and express
            consent for GetnGoods, Unified Marketing Partners & its{" "}
            <a
              title="https://unified-marketingpartners.com/subsidiaries2"
              className="text-indigo-650 underline decoration-indigo-600/30 underline-offset-2 hover:decoration-indigo-600"
              href="https://unified-marketingpartners.com/subsidiaries2">
              Subsidiaries
            </a>
            , SnagnGoods, USMsg, MyJobMobile, OMG Sweeps, Best Day Ever
            Sweepstakes, FamilyRecoveryHub, Dollar-Sensei, CheckGo, Lendli,
            Benefitlink, Americas Health and Grant-Navigators to contact me at the
            phone number I provided for marketing and transactional messages,
            including personal finance, benefits & sweepstakes, via text and
            calls, which may use automated, manual, prerecorded, or AI technology,
            until I revoke consent. This applies even if my number is on a "Do Not
            Call" list. Consent is not required to to use this site or obtain
            goods/services. <span className="text-indigo-600 cursor-pointer hover:underline">Click Here</span> to
            proceed without consent. I have read and agree to the{" "}
            <a
              title="https://gettnngooods.com/p/gg-terms"
              href="https://gettnngooods.com/p/gg-terms"
              className="text-indigo-600 underline decoration-indigo-600/30 underline-offset-2 hover:decoration-indigo-600">
              Terms & Conditions
            </a>
            , including mandatory arbitration, and for resolving disputes and TCPA
            claim.
          </p>
        </motion.div>
      </div>

      <Button className="mt-6" type="submit">
        Continue
      </Button>
    </Container>
  );
};

export default ContactForm;
