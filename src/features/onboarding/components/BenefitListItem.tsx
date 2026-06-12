import { motion } from "framer-motion";
import Icon from "@shared/components/Icons/Icon";
import type { BenefitListItem as BenefitListItemType } from "@features/onboarding/types";

const BenefitListItem = (benefit: BenefitListItemType) => {
  const { title, onClick } = benefit;
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-4 bg-surface p-2 rounded-md w-full cursor-pointer hover:bg-surface-soft transition-colors"
      onClick={onClick}
    >
      <div className="flex items-center justify-center bg-white p-3 rounded-lg shadow-sm min-w-12 h-12">
        <Icon name="tick" className="text-accent w-6 h-6" />
      </div>
      <p className="text-body text-sm sm:text-base leading-relaxed font-lato font-semibold">
        {title}
      </p>
    </motion.div>
  );
};

export default BenefitListItem;
