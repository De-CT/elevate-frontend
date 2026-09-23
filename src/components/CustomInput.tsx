"use client";

import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    required?: boolean;
    error?: string;
    touched?: boolean;
    type?: string;
    rightIcon?: React.ReactNode;
}

export const CustomInput: React.FC<CustomInputProps> = ({
    label,
    required,
    error,
    touched,
    type = "text",
    rightIcon,
    disabled,
    value,
    onChange,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const showError = touched && error;

    return (
        <div className="flex flex-col gap-2 w-full">
            {label && (
                <label className="font-medium text-gray-700 text-sm md:text-base">
                    {label}
                    {required && <span className="text-[#FF0000]">*</span>}
                </label>
            )}

            <div className="relative w-full">
                {rightIcon && (
                    <div className="absolute left-3 top-[70%] -translate-y-1/2">
                        {rightIcon}
                    </div>
                )}
                <input
                    className={`w-full px-4 py-2.5 ${isPassword ? "pr-12" : ""} ${rightIcon ? "pl-10" : ""
                        } bg-white rounded-md border border-gray-300
          focus:outline-none focus:ring-primary-lighter focus:primary-lighter placeholder-gray
          [&::-ms-reveal]:hidden
          ${disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : ""}`}
                    required={required}
                    disabled={disabled}
                    type={type === "password" && showPassword ? "text" : type}
                    value={value}
                    onChange={onChange}
                    {...props}
                />

                {/* Password visibility toggle */}
                {isPassword && (
                    <button
                        type="button"
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                        onClick={() => setShowPassword((prev) => !prev)}
                        tabIndex={-1}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>

            {showError && <p className="text-xs text-[#FF0000]">{error}</p>}
        </div>
    );
};
