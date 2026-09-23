"use client";

import { ArrowRight } from "lucide-react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import Link from "next/link";

export type AccountDetails = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    agreed: boolean;
};

const initialValues: AccountDetails = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreed: false,
};

const validationSchema = Yup.object({
    firstName: Yup.string().required("Enter your first name"),
    lastName: Yup.string().required("Enter your last name"),
    email: Yup.string().email("Enter a valid email address").required("Enter your email address"),
    phone: Yup.string()
        .matches(/^[0-9]{10,11}$/, "Enter a valid phone number")
        .required("Phone number is required"),
    password: Yup.string()
        .matches(/^[0-9]{4}$/, "PIN must be exactly 6 digits")
        .required("Create a 6-digit PIN"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "The two PINs do not match")
        .required("Re-enter your PIN"),
    agreed: Yup.boolean().oneOf([true], "You must agree to the Community Savings Rules"),
});

export function CreateAccountStep({
    onNext,
    loading
}: {
    onNext: (values: AccountDetails) => void;
    loading: boolean
}) {
    return (
        <div className="w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container p-6 sm:p-10">
            <div className="mb-8 text-center sm:text-left">
                <h1 className="font-headline font-bold text-3xl sm:text-4xl text-primary tracking-tight">
                    Create Your Account
                </h1>
                <p className="font-body text-base sm:text-lg text-on-surface-variant mt-2">
                    Enter your details to join Elevate Heart Foundation.
                </p>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => onNext(values)}
            >
                {({ handleChange, handleSubmit, values, errors, touched, setFieldValue }) => (
                    <Form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <CustomInput
                                label="First Name"
                                placeholder="e.g. Amina"
                                required
                                onChange={handleChange("firstName")}
                                value={values.firstName}
                                error={errors.firstName}
                                touched={touched.firstName}
                            />
                            <CustomInput
                                label="Last Name"
                                placeholder="e.g. Bello"
                                required
                                onChange={handleChange("lastName")}
                                value={values.lastName}
                                error={errors.lastName}
                                touched={touched.lastName}
                            />
                        </div>

                        <CustomInput
                            label="Email Address"
                            placeholder="e.g. amina@example.com"
                            type="email"
                            required
                            onChange={handleChange("email")}
                            value={values.email}
                            error={errors.email}
                            touched={touched.email}
                        />

                        <CustomInput
                            label="Phone Number"
                            placeholder="0801 234 5678"
                            type="tel"
                            required
                            variant="emphasis"
                            leftAddon={
                                <>
                                    <span>🇳🇬</span>
                                    <span>+234</span>
                                </>
                            }
                            hint="We will send your account updates to this number via SMS."
                            onChange={handleChange("phone")}
                            value={values.phone}
                            error={errors.phone}
                            touched={touched.phone}
                            inputMode="numeric"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <CustomInput
                                label="Create a 4-Digit PIN"
                                placeholder="••••••"
                                type="password"
                                required
                                variant="pin"
                                maxLength={4}
                                inputMode="numeric"
                                onChange={handleChange("password")}
                                value={values.password}
                                error={errors.password}
                                touched={touched.password}
                            />
                            <CustomInput
                                label="Enter PIN again"
                                placeholder="••••••"
                                type="password"
                                required
                                variant="pin"
                                maxLength={4}
                                inputMode="numeric"
                                onChange={handleChange("confirmPassword")}
                                value={values.confirmPassword}
                                error={errors.confirmPassword}
                                touched={touched.confirmPassword}
                            />
                        </div>

                        <div className="pt-2">
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <input
                                    className="w-4 h-4 text-primary-container rounded border-surface-container focus:ring-primary-container checked:bg-primary"
                                    type="checkbox"
                                    checked={values.agreed}
                                    onChange={(e) => setFieldValue("agreed", e.target.checked)}
                                />
                                <span className="font-body text-sm sm:text-base text-on-surface">
                                    I agree to the Community Savings Rules.
                                </span>
                            </label>
                            {touched.agreed && errors.agreed && (
                                <p className="font-body text-xs sm:text-sm text-error mt-1">{errors.agreed}</p>
                            )}
                        </div>

                        <div className="pt-4">
                            <CustomButton
                                text="Next: Choose Program"
                                type="submit"
                                fullWidth
                                loading={loading}
                                rightIcon={<ArrowRight className="w-6 h-6" />}
                                onClick={() => handleSubmit()}
                            />
                        </div>
                    </Form>
                )}
            </Formik>

            <div className="mt-6 text-center">
                <p className="font-body-md text-body-md text-on-surface-variant">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-secondary hover:text-primary transition-colors underline underline-offset-4 decoration-secondary/30 ml-1"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}