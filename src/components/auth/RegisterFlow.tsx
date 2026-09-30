"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { createAccount } from "@/backend/auth";
import { AuthHeader } from "./AuthHeader";
import { CreateAccountStep, type AccountDetails } from "./CreateAccountStep";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function RegisterFlow() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const setAuthToken = useAuthStore((state) => state.setAuthToken);

    const handleAccountSubmit = async (values: AccountDetails) => {
        try {
            setLoading(true)
            const res = await createAccount({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                phone: values.phone,
                password: values.password,
            });
            toast.success("Account created successfully");
            setAuthToken(res);
            router.push("/complete-registration");
        } catch (error: unknown) {
            toast.error(error instanceof Error ? error.message : "Unable to create your account.");
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="bg-surface font-body text-on-surface antialiased min-h-screen flex flex-col justify-between">
            <AuthHeader />

            <main className="flex-1 w-full py-8 md:py-12 px-4 sm:px-6 flex flex-col items-center">
                <div className="w-full max-w-4xl flex flex-col items-center">
                    <CreateAccountStep onNext={handleAccountSubmit} loading={loading} />
                </div>
            </main>

            {/* <AuthFooter /> */}
        </div>
    );
}