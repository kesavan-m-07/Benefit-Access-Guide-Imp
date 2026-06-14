import React, { useId } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { cn } from "@shared/utils";

type TextInputProps = Omit<HTMLMotionProps<"input">, "ref"> & {
  label?: string;
  error?: FieldError;
  containerClassName?: string;
  registration?: UseFormRegisterReturn;
  helperText?: string;
};

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  registration,
  containerClassName,
  helperText,
  className = "",
  ...props
}) => {
  const hasError = !!error;

  const generatedId = useId();
  const inputId = props.id ?? registration?.name ?? generatedId;

  return (
    <div
      className={cn("flex flex-col gap-1.5 w-full group", containerClassName)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs text-slate-500 group-focus-within:text-indigo-600 uppercase font-lato font-semibold tracking-wider mb-1 transition-colors">
          {label}
          {props.required && (
            <span className="text-red-500 ml-1 font-bold">*</span>
          )}
        </label>
      )}

      <motion.div
        animate={hasError ? { x: [0, -8, 8, -6, 6, -4, 4, -2, 2, 0] } : {}}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="w-full">
        <motion.input
          id={inputId}
          {...props}
          {...registration}
          whileTap={{
            scale: 1.01,
            transition: {
              duration: 0.05,
            },
          }}
          className={cn(
            "w-full rounded-xl border h-12 px-4 text-base outline-none transition-all duration-300 bg-white text-default placeholder-slate-400 shadow-sm",
            hasError
              ? "border-red-500/70 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              : "border-slate-200/80 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
            className,
          )}
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {hasError ? (
          <motion.p
            key="error"
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-red-500 overflow-hidden mt-0.5">
            {error?.message}
          </motion.p>
        ) : helperText ? (
          <motion.p
            key="helper"
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-gray-500 overflow-hidden mt-0.5">
            {helperText}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
