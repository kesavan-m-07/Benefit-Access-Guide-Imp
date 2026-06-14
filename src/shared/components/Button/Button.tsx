import React from "react";
import { cn } from "@shared/utils";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  loading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  children,
  ...props
}) => {
  const base =
    "inline-flex items-center w-full justify-center gap-2 px-4 py-4 rounded-4xl text-sm font-bold transition focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition duration-400";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-indigo-600 font-fira text-white text-2xl uppercase hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 shadow-md shadow-indigo-600/20 active:scale-[0.99]",
    secondary:
      "bg-indigo-600 capitalize rounded-md h-16 text-2xl text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 shadow-md shadow-indigo-600/20 active:scale-[0.99]",
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={cn(base, variants[variant || "primary"], className)}>
      {loading ? (
        <span className="animate-pulse">Loading...</span>
      ) : (
        <>
          {leftIcon && <span className="flex">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
