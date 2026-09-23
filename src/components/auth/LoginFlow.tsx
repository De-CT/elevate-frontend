"use client";

import Link from "next/link";
import { LoginBrandHeader } from "./LoginBrandHeader";
import { LoginForm } from "./LoginForm";
// import { ForgotPinModal } from "./ForgotPinModal";

export default function LoginFlow() {



    return (
        <div className="min-h-screen bg-background text-on-surface font-body-md text-body-md antialiased relative selection:bg-secondary-container selection:text-on-secondary-fixed">
            {/* Decorative background: soft brand blobs + faint dot grid */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-secondary-fixed/20 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-primary-fixed/25 blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl max-h-7xl opacity-[0.035] bg-[radial-gradient(#004d3a_1px,transparent_1px)] [background-size:24px_24px]" />
            </div>


            <main className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center p-gutter-mobile md:p-gutter">
                <div className="flex flex-col w-full items-center justify-center py-6 px-4">
                    <div className="w-full max-w-md flex flex-col items-center">
                        <LoginBrandHeader />

                        <LoginForm />

                        <div className="mt-6 text-center">
                            <p className="font-body-md text-body-md text-on-surface-variant">
                                New to Elevate Heart?{" "}
                                <Link
                                    href="/register"
                                    className="font-medium text-secondary hover:text-primary transition-colors underline underline-offset-4 decoration-secondary/30 ml-1"
                                >
                                    Create an account
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* <ForgotPinModal open={forgotPinOpen} onClose={() => setForgotPinOpen(false)} /> */}
        </div>
    );
}