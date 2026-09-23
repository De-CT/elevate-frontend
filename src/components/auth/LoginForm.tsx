"use client";

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { login } from "@/backend/auth";
import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type LoginValues = { phone: string; pin: string };

const initialValues: LoginValues = { phone: "", pin: "" };

const validationSchema = Yup.object({
    phone: Yup.string()
        .matches(/^[0-9]{10,11}$/, "Enter a valid 10 or 11-digit phone number")
        .required("Phone number is required"),
    pin: Yup.string()
        .matches(/^[0-9]{4}$/, "Enter your 4-digit PIN")
        .required("Enter your 4-digit PIN"),
});

function NigeriaFlag() {
    return (
        <svg aria-hidden="true" className="w-5 h-3.5 rounded-sm shadow-sm" viewBox="0 0 640 480">
            <g fillRule="evenodd" strokeWidth="1pt">
                <path d="M0 0h213.3v480H0z" fill="#008751" />
                <path d="M213.3 0h213.4v480H213.3z" fill="#ffffff" />
                <path d="M426.7 0H640v480H426.7z" fill="#008751" />
            </g>
        </svg>
    );
}

export function LoginForm() {
    const router = useRouter();
    const handleSubmit = async (values: typeof initialValues) => {
        try {
            await login({ identifier: values.phone, password: values.pin });
            toast.success("Login Successful")
            router.push("/dashboard");
        } catch (e: any) {
            toast.error(e.message);
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ handleChange, handleSubmit, values, errors, touched, isSubmitting, isValid, dirty }) => (
                <Form
                    className="w-full bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden"
                    onSubmit={handleSubmit}
                >
                    <div className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full bg-primary-container" />

                    <div className="flex flex-col gap-5">
                        <CustomInput
                            label="Phone Number"
                            type="tel"
                            inputMode="tel"
                            placeholder="080 1234 5678"
                            leftAddon={
                                <>
                                    <NigeriaFlag />
                                    <span className="font-body-md text-body-md font-semibold text-on-surface">
                                        +234
                                    </span>
                                </>
                            }
                            onChange={handleChange("phone")}
                            value={values.phone}
                            error={errors.phone}
                            touched={touched.phone}
                        />

                        <CustomInput
                            label="4-Digit PIN"
                            type="password"
                            variant="pin"
                            inputMode="numeric"
                            maxLength={4}
                            placeholder="••••"
                            hint={!touched.pin || !errors.pin ? "Enter your secret 4-digit card PIN" : undefined}
                            onChange={handleChange("pin")}
                            value={values.pin}
                            error={errors.pin}
                            touched={touched.pin}
                        />

                        <div className="mt-2">
                            <CustomButton
                                text="Log In"
                                type="submit"
                                fullWidth
                                disabled={!isValid || !dirty}
                                loading={isSubmitting}
                                loadingText="Logging in..."
                                onClick={() => handleSubmit()}
                            />
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
}