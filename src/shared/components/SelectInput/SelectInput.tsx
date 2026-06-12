import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import type { FieldError } from "react-hook-form";
import * as SelectPrimitive from "@radix-ui/react-select";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@shared/utils";
import Icon from "@shared/components/Icons/Icon";

type Option = {
  label: string;
  value: string;
};

interface SelectBoxProps {
  label?: string;
  placeholder?: string;
  options: Option[];
  error?: FieldError;
  helperText?: string;
  name?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  className?: string;
  selectClassName?: string;
}

export function SelectBox({
  label,
  placeholder,
  options,
  error,
  helperText,
  name,
  disabled,
  value,
  onChange,
  onBlur,
  className,
  selectClassName,
}: SelectBoxProps) {
  const formContext = useFormContext();
  const hasContext = !!formContext && !!name;

  if (hasContext) {
    const {
      control,
      formState: { errors },
    } = formContext;
    const fieldError = (errors[name] || error) as FieldError | undefined;

    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <SelectBoxInner
            label={label}
            placeholder={placeholder}
            options={options}
            disabled={disabled}
            error={fieldError}
            helperText={helperText}
            value={field.value ?? ""}
            onChange={field.onChange}
            onBlur={field.onBlur}
            className={className}
            selectClassName={selectClassName}
          />
        )}
      />
    );
  }

  return (
    <SelectBoxInner
      label={label}
      placeholder={placeholder}
      options={options}
      error={error}
      helperText={helperText}
      value={value ?? ""}
      onChange={onChange ?? (() => {})}
      onBlur={onBlur}
      className={className}
      selectClassName={selectClassName}
    />
  );
}

interface SelectBoxInnerProps {
  label?: string;
  placeholder?: string;
  options: Option[];
  error?: FieldError;
  helperText?: string;
  disabled?: boolean;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  className?: string;
  selectClassName?: string;
}

const SelectBoxInner = ({
  label,
  placeholder,
  options,
  error,
  helperText,
  value,
  disabled,
  onChange,
  onBlur,
  className,
  selectClassName,
}: SelectBoxInnerProps) => {
  const hasError = !!error;
  const [open, setOpen] = React.useState(false);

  return (
    <div className={cn("flex min-w-0 flex-col gap-1 w-full", className)}>
      {label && (
        <label className="block w-full whitespace-nowrap text-sm font-lato font-bold tracking-widest uppercase text-gray-700 mb-1">
          {label}
        </label>
      )}

      <SelectPrimitive.Root
        value={value}
        disabled={disabled}
        onValueChange={onChange}
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen && onBlur) {
            onBlur();
          }
        }}>
        <SelectPrimitive.Trigger asChild>
          <motion.button
            type="button"
            whileFocus={{ scale: 1.01 }}
            animate={hasError ? { x: [0, -8, 8, -8, 8, -4, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={cn(
              "h-10 w-full rounded-md border-2 bg-white px-5 text-base outline-none transition flex items-center justify-between text-default cursor-pointer",
              hasError
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-default focus:border-blue-500 focus:ring-blue-500",
              selectClassName,
            )}>
            <span className="truncate">
              {options.find((opt) => opt.value === value)?.label ||
                placeholder ||
                ""}
            </span>

            <SelectPrimitive.Icon asChild>
              <motion.div
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center ml-2 text-default">
                <Icon name="dropdown" size={10} />
              </motion.div>
            </SelectPrimitive.Icon>
          </motion.button>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            position="popper"
            sideOffset={4}
            className="z-50 min-w-select-trigger max-h-60 overflow-y-auto rounded-md border-2 border-default bg-white text-default shadow-lg">
            <SelectPrimitive.Viewport className="p-1">
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className={cn(
                    "relative flex w-full select-none items-center rounded-sm py-2 pl-8 pr-4 text-base outline-none cursor-pointer font-medium font-lato transition-colors",
                    "focus:bg-surface-soft focus:text-brand-blue data-[state=checked]:bg-blue-50 data-[state=checked]:text-brand-blue",
                  )}>
                  <span className="absolute left-2.5 flex h-3.5 w-3.5 items-center justify-center">
                    <SelectPrimitive.ItemIndicator>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4.5 w-4.5 text-brand-blue">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </SelectPrimitive.ItemIndicator>
                  </span>
                  <SelectPrimitive.ItemText>
                    {option.label}
                  </SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>

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
            className="text-xs text-gray-500 overflow-hidden mt-0.5 ml-3">
            {helperText}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
