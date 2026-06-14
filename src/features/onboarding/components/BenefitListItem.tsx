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
      className="flex items-center gap-4 bg-surface p-3.5 sm:p-4 rounded-xl w-full cursor-pointer hover:bg-surface-soft hover:-translate-y-0.5 transition-all duration-300 shadow-sm border border-slate-200/50"
      onClick={onClick}
    >
      <div className="flex items-center justify-center bg-emerald-50 border border-emerald-100 rounded-full w-9 h-9 min-w-9 shadow-sm">
        <Icon 
          name="tick" 
          className="[&_rect]:fill-none [&_path]:fill-current text-emerald-500 w-4.5 h-4.5" 
        />
      </div>
      <p className="text-slate-700 text-sm leading-relaxed font-lato font-semibold">
        {title}
      </p>
    </motion.div>
  );
};

export default BenefitListItem;
