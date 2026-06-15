import React, { useId } from "react";
import { useFormContext, Controller } from "react-hook-form";
import type { FieldError } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import type { DatePickerProps as ReactDatePickerProps } from "react-datepicker";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@shared/utils";
import "./DatePicker.css";

// Custom type representing the wrapper props
export interface DatePickerProps extends Omit<
  ReactDatePickerProps,
  "onChange" | "selected"
> {
  label?: string;
  error?: FieldError;
  helperText?: string;
  name?: string;
  selected?: Date | null;
  onChange?: (
    date: Date | null | [Date | null, Date | null] | Date[] | null,
    event: React.SyntheticEvent<unknown> | undefined,
  ) => void;
  containerClassName?: string;
  inputClassName?: string;
  disableFutureDates?: boolean;
}

export function DatePicker({
  label,
  error,
  helperText,
  name,
  selected,
  onChange,
  containerClassName,
  inputClassName,
  disableFutureDates,
  ...props
}: DatePickerProps) {
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
          <DatePickerInner
            label={label}
            error={fieldError}
            helperText={helperText}
            selected={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            containerClassName={containerClassName}
            inputClassName={inputClassName}
            disableFutureDates={disableFutureDates}
            {...props}
          />
        )}
      />
    );
  }

  return (
    <DatePickerInner
      label={label}
      error={error}
      helperText={helperText}
      selected={selected}
      onChange={onChange ?? (() => {})}
      containerClassName={containerClassName}
      inputClassName={inputClassName}
      disableFutureDates={disableFutureDates}
      {...props}
    />
  );
}

interface DatePickerInnerProps extends DatePickerProps {
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const DatePickerInner = ({
  label,
  error,
  helperText,
  selected,
  onChange,
  onBlur,
  containerClassName,
  inputClassName,
  placeholderText = "MM/DD/YYYY",
  dateFormat = "MM/dd/yyyy",
  maxDate,
  disableFutureDates,
  ...props
}: DatePickerInnerProps) => {
  const hasError = !!error;
  const generatedId = useId();
  const inputId = props.id ?? generatedId;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => currentYear - i,
  );

  const renderDayContentsDefault = (
    _day: number,
    date: Date,
  ): React.ReactNode => {
    return <span>{date.getDate()}</span>;
  };

  interface CustomHeaderProps {
    date: Date;
    changeYear: (year: number) => void;
    changeMonth: (month: number) => void;
    decreaseMonth: () => void;
    increaseMonth: () => void;
    prevMonthButtonDisabled: boolean;
    nextMonthButtonDisabled: boolean;
  }

  const renderCustomHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }: CustomHeaderProps) => {
    return (
      <div className="flex items-center justify-between px-1 py-1.5 gap-2 select-none">
        <button
          type="button"
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
          className="flex items-center justify-center w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white text-slate-600 transition-colors cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="flex items-center gap-1.5">
          <select
            value={months[date.getMonth()]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
            className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg pl-2 pr-7 py-1.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 cursor-pointer appearance-none bg-no-repeat bg-[right_8px_center] bg-[length:12px] [background-image:url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%2364748b%27 stroke-width=%272.5%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')]">
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={date.getFullYear()}
            onChange={({ target: { value } }) => changeYear(parseInt(value))}
            className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg pl-2 pr-7 py-1.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 cursor-pointer appearance-none bg-no-repeat bg-[right_8px_center] bg-[length:12px] [background-image:url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%2364748b%27 stroke-width=%272.5%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')]">
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
          className="flex items-center justify-center w-8 h-8 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white text-slate-600 transition-colors cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    );
  };

  const datepickerWrapperClasses = cn(
    "flex flex-col gap-1.5 w-full group relative custom-datepicker-container",
    containerClassName,
  );

  return (
    <div className={datepickerWrapperClasses}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs text-slate-500 group-focus-within:text-indigo-600 uppercase font-lato font-semibold tracking-wider mb-1 transition-colors text-left">
          {label}
          <span className="text-red-500 ml-1 font-bold">*</span>
        </label>
      )}

      <motion.div
        animate={hasError ? { x: [0, -8, 8, -6, 6, -4, 4, -2, 2, 0] } : {}}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className="w-full">
        <ReactDatePicker
          id={inputId}
          selected={selected}
          onChange={onChange}
          onBlur={onBlur}
          placeholderText={placeholderText}
          dateFormat={dateFormat}
          maxDate={disableFutureDates ? new Date() : maxDate}
          renderCustomHeader={renderCustomHeader}
          renderDayContents={
            props.renderDayContents || renderDayContentsDefault
          }
          className={cn(
            "w-full rounded-xl border h-12 px-4 text-base outline-none transition-all duration-300 bg-white text-default placeholder-slate-400 shadow-sm",
            hasError
              ? "border-red-500/70 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              : "border-slate-200/80 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20",
            inputClassName,
          )}
          wrapperClassName="w-full"
          {...(props as Record<string, unknown>)}
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
            className="text-xs text-red-500 overflow-hidden mt-0.5 text-left">
            {error?.message}
          </motion.p>
        ) : helperText ? (
          <motion.p
            key="helper"
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-gray-500 overflow-hidden mt-0.5 text-left">
            {helperText}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
