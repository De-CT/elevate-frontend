import React from "react";
import { BrandSpinner } from "./BrandSpinner";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "lg" | "md" | "sm";

type ButtonProps = {
  text: string;
  onClick: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  lg: "h-14 px-6 rounded-full font-headline font-bold text-lg gap-2",
  md: "h-11 px-4 rounded-lg font-headline font-bold text-sm gap-1.5",
  sm: "py-1.5 px-2 rounded-lg font-headline font-semibold text-xs gap-1",
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-container hover:bg-primary text-on-primary shadow-md hover:shadow-lg focus:ring-primary-container",
  secondary:
    "bg-secondary hover:bg-primary-container text-on-primary shadow-md hover:shadow-lg focus:ring-secondary",
  outline:
    "bg-surface-container-lowest border-2 border-surface-container hover:border-primary text-primary focus:ring-primary-container",
  ghost:
    "bg-transparent text-primary hover:underline shadow-none focus:ring-0 focus:ring-offset-0",
  danger:
    "bg-error hover:opacity-90 text-on-error shadow-md focus:ring-error",
};

const CustomButton = ({
  text,
  onClick,
  variant = "primary",
  size = "lg",
  disabled = false,
  loading = false,
  loadingText = "Loading...",
  className = "",
  type = "button",
  fullWidth = false,
  leftIcon,
  rightIcon,
}: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 focus:outline-none focus:ring-4 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${SIZE_CLASSES[size]} ${VARIANT_CLASSES[variant]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    >
      {loading ? (
        <BrandSpinner size="sm" className="text-current" label={loadingText} labelClassName="font-headline font-bold" />
      ) : (
        <>
          {leftIcon}
          <span>{text}</span>
          {rightIcon}
        </>
      )}
    </button>
  );
};

export { CustomButton };