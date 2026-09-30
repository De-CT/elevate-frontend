"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, X } from "lucide-react";
import { Form, Formik, type FormikErrors } from "formik";
import { CustomButton } from "@/components/CustomButton";
import { CustomInput } from "@/components/CustomInput";
import { bvnVerify, getProfile, subscribeToPackage } from "@/backend/user";
import { useAppStore } from "@/store/useAppStore";
import type { ProgramSelection } from "./ChooseProgramStep";
import { useUserStore } from "@/store/useUserStore";

export interface BvnVerificationResult {
    verified: true;
    fullName: string;
    virtualAccount: {
        bankName: string;
        accountNumber: string;
        accountName: string;
    };
}

interface BvnVerificationStepProps {
    selection: ProgramSelection;
    presentation?: "step" | "modal";
    onBack?: () => void;
    onClose?: () => void;
    onVerified: (result: BvnVerificationResult) => void;
}

interface FormValues {
    bvn: string;
}

interface ApiErrorLike {
    code?: string;
    status?: number;
    response?: { status?: number };
}

interface SubmitError {
    title: string;
    message: string;
}

const BVN_LENGTH = 11;
const naira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

const ERROR_MESSAGES = {
    invalid: {
        title: "Verification unsuccessful",
        message: "We couldn't verify that BVN. Check the 11 digits and try again.",
    },
    network: {
        title: "No connection",
        message: "We couldn't connect. Check your internet connection and try again.",
    },
    server: {
        title: "Something went wrong",
        message: "We couldn't finish setting up your account. Please try again in a moment.",
    },
    tooMany: {
        title: "Too many attempts",
        message: "Please wait a few minutes, then try again.",
    },
} satisfies Record<string, SubmitError>;

function toSubmitError(error: unknown): SubmitError {
    const apiError = (error ?? {}) as ApiErrorLike;
    const status = apiError.status ?? apiError.response?.status;
    const offline = typeof navigator !== "undefined" && navigator.onLine === false;

    if (offline || apiError.code === "ERR_NETWORK") return ERROR_MESSAGES.network;
    if (status === 429) return ERROR_MESSAGES.tooMany;
    if (typeof status === "number" && status >= 500) return ERROR_MESSAGES.server;
    return ERROR_MESSAGES.invalid;
}

function validate(values: FormValues): FormikErrors<FormValues> {
    if (!values.bvn) return { bvn: "Enter your 11-digit BVN" };
    if (!/^\d{11}$/.test(values.bvn)) return { bvn: "Your BVN should be 11 digits" };
    return {};
}

export function BvnVerificationStep({
    selection,
    presentation = "step",
    onBack,
    onClose,
    onVerified,
}: BvnVerificationStepProps) {
    const [submitError, setSubmitError] = useState<SubmitError | null>(null);
    const activePackages = useAppStore((state) => state.activePackages);
    const selectedPackage = activePackages?.find(
        (packageData) => packageData.type === selection?.packageType
    );
    const registrationFee = Number(selectedPackage?.registrationFee ?? 0) * (selection?.quantity ?? 0);
    const isModal = presentation === "modal";
    const { setUser } = useUserStore()

    return (
        <div className={isModal ? "fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4" : "w-full"}>
            {isModal && (
                <button
                    type="button"
                    aria-label="Close BVN verification"
                    className="absolute inset-0 bg-black/50"
                    onClick={onClose}
                />
            )}
            <section
                role={isModal ? "dialog" : undefined}
                aria-modal={isModal ? true : undefined}
                aria-labelledby="bvn-title"
                className={`relative w-full max-w-2xl mx-auto rounded-2xl border border-surface-container bg-surface-container-lowest p-6 shadow-sm sm:p-10 ${isModal ? "z-10" : ""}`}
            >
                {isModal && onClose && (
                    <button
                        type="button"
                        aria-label="Close BVN verification"
                        className="absolute right-4 top-4 rounded-lg p-2 text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
                        onClick={onClose}
                    >
                        <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                )}
                <header className="mb-8">
                    {selection && (
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-surface-container-low px-3 py-1.5 text-sm font-semibold text-primary">
                            <span>{selectedPackage?.name ?? selection.packageType.replace("_", " ")}</span>
                            <span aria-hidden="true">·</span>
                            <span>{selection.quantity} {selection.quantity === 1 ? "account" : "accounts"}</span>
                            <span aria-hidden="true">·</span>
                            <span>{registrationFee ? `Reg. fee ${naira(registrationFee)}` : "No registration fee"}</span>
                        </div>
                    )}
                    <h1 className="font-headline text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                        <span id="bvn-title">Verify Your Identity</span>
                    </h1>
                    <p className="mt-2 font-body text-base leading-relaxed text-on-surface-variant sm:text-lg">
                        Enter your BVN to verify your details and create your dedicated Elevate Wallet account.
                    </p>
                </header>

                <Formik<FormValues>
                    initialValues={{ bvn: "" }}
                    validate={validate}
                    validateOnMount
                    onSubmit={async (values, { resetForm }) => {
                        setSubmitError(null);
                        try {
                            const result = await bvnVerify({ bvn: values.bvn });
                            await subscribeToPackage(selection)
                            const res = await getProfile()
                            console.log("user", res)
                            setUser(res)
                            resetForm();
                            onVerified(result as BvnVerificationResult);
                        } catch (error) {
                            setSubmitError(toSubmitError(error));
                        }
                    }}
                >
                    {({ values, errors, touched, isValid, isSubmitting, handleBlur, setFieldValue }) => (
                        <Form className="space-y-6" noValidate>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between gap-3">
                                    <label htmlFor="bvn" className="font-headline text-base font-semibold text-on-surface">
                                        Bank Verification Number (BVN) <span className="text-error">*</span>
                                    </label>
                                    <span className="shrink-0 font-headline text-sm font-semibold tabular-nums text-on-surface-variant">
                                        {values.bvn.length} / {BVN_LENGTH}
                                    </span>
                                </div>
                                <CustomInput
                                    id="bvn"
                                    name="bvn"
                                    label=""
                                    type="password"
                                    inputMode="numeric"
                                    maxLength={BVN_LENGTH}
                                    autoComplete="off"
                                    placeholder="Enter your 11-digit BVN"
                                    value={values.bvn}
                                    onBlur={handleBlur}
                                    onChange={(event) => {
                                        setSubmitError(null);
                                        setFieldValue("bvn", event.target.value.replace(/\D/g, "").slice(0, BVN_LENGTH));
                                    }}
                                    error={errors.bvn}
                                    touched={Boolean(touched.bvn && values.bvn.length > 0)}
                                    variant="emphasis"
                                    disabled={isSubmitting}
                                    aria-describedby="bvn-hint"
                                    aria-label="Bank Verification Number"
                                />
                                <p id="bvn-hint" className="font-body text-sm leading-relaxed text-on-surface-variant">
                                    Dial <span className="font-semibold text-primary">*565*0#</span> from your registered phone line to retrieve it.
                                </p>
                                {submitError && (
                                    <div role="alert" className="rounded-xl bg-error-container/60 p-4 text-on-error-container">
                                        <p className="font-headline text-sm font-bold">{submitError.title}</p>
                                        <p className="mt-1 font-body text-sm">{submitError.message}</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-start gap-3 rounded-xl border border-surface-container bg-surface-container-low p-4">
                                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary-accent" aria-hidden="true" />
                                <p className="font-body text-sm leading-relaxed text-on-surface-variant">
                                    Your BVN is used only to verify your legal name and set up your wallet. It does not give anyone access to your bank accounts or funds.
                                </p>
                            </div>

                            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                                {onBack ? (
                                    <CustomButton
                                        text="Change Program"
                                        type="button"
                                        variant="ghost"
                                        size="md"
                                        leftIcon={<ArrowLeft className="h-4 w-4" />}
                                        onClick={onBack}
                                        disabled={isSubmitting}
                                    />
                                ) : <span />}
                                <CustomButton
                                    text={isSubmitting ? "Verifying BVN..." : "Verify and Continue"}
                                    type="submit"
                                    loading={isSubmitting}
                                    disabled={!isValid || isSubmitting}
                                    fullWidth
                                    rightIcon={<ArrowRight className="h-5 w-5" />}
                                    onClick={() => undefined}
                                    className="sm:w-auto"
                                />
                            </div>
                            <p className="sr-only" role="status" aria-live="polite">
                                {isSubmitting ? "Verifying your BVN and setting up your account." : ""}
                            </p>
                        </Form>
                    )}
                </Formik>
            </section>
        </div>
    );
}