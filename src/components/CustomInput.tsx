"use client";

import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

interface CustomInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  required?: boolean;
  error?: string;
  touched?: boolean;
  type?: string;
  hint?: string;
  /** A fixed prefix box, e.g. the 🇳🇬 +234 country code chip. */
  leftAddon?: React.ReactNode;
  /** Controls the input's font treatment: default text fields, "emphasis" for
   * phone-style values, or "pin" for large tracked-out numeric codes. */
  variant?: "default" | "emphasis" | "pin";
}

const VARIANT_CLASSES: Record<NonNullable<CustomInputProps["variant"]>, string> = {
  default: "font-body text-base",
  emphasis: "font-headline font-semibold text-lg tracking-wide",
  pin: "font-headline font-bold text-xl tracking-widest",
};

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  required,
  error,
  touched,
  type = "text",
  hint,
  leftAddon,
  variant = "default",
  disabled,
  value,
  onChange,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const showError = touched && error;

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="font-headline font-semibold text-base text-on-surface">
          {label}
          {required && <span className="text-tertiary"> *</span>}
        </label>
      )}

      <div className="flex gap-2 w-full">
        {leftAddon && (
          <div className="h-14 px-4 bg-surface-container-low rounded-xl border-2 border-surface-container flex items-center gap-2 font-headline font-bold text-primary text-base shrink-0 select-none">
            {leftAddon}
          </div>
        )}

        <div className="relative flex items-center flex-1">
          <input
            className={`w-full h-14 bg-surface-container-lowest text-on-surface ${VARIANT_CLASSES[variant]} px-4 ${
              isPassword ? "pr-12" : ""
            } rounded-xl border-2 ${
              showError ? "border-error" : "border-surface-container"
            } focus:border-primary-container focus:outline-none transition-colors placeholder:text-on-surface-variant/60 [&::-ms-reveal]:hidden ${
              disabled ? "bg-surface-container-low cursor-not-allowed opacity-60" : ""
            } ${className}`}
            required={required}
            disabled={disabled}
            type={type === "password" && showPassword ? "text" : type}
            value={value}
            onChange={onChange}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
      </div>

      {hint && !showError && (
        <p className="font-body text-xs sm:text-sm text-on-surface-variant">{hint}</p>
      )}
      {showError && <p className="font-body text-xs sm:text-sm text-error">{error}</p>}
    </div>
  );
};