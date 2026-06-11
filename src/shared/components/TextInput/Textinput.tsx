import React from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { cn } from "../../utils";

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

  return (
    <div className={cn("flex flex-col gap-1 w-full", containerClassName)}>
      {label && (
        <label className="text-sm text-gray-700 uppercase font-lato font-bold tracking-widest mb-1">
          {label}
        </label>
      )}

      <motion.input
        {...props}
        {...registration}
        whileTap={{
          scale: 1.03,
          transition: {
            duration: 0.05,
          },
        }}
        animate={
          hasError
            ? {
                x: [0, -70, 70, -40, 40, -15, 15, -5, 5, 0],
              }
            : {}
        }
        
        className={cn(
          "w-full rounded-md border-2 h-10 px-3 text-base outline-none transition bg-white text-default",
          hasError
            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
            : "border-dark focus:border-blue-500 focus:ring-blue-500",
          className,
        )}
      />

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
