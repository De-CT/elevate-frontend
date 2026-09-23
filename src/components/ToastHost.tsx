"use client";

import { Toaster, resolveValue } from "react-hot-toast";
import { Toast } from "@/components/Toast";

export function ToastHost() {
    return (
        <Toaster position="top-right" toastOptions={{ duration: 4000 }}>
            {(toast) => {
                const message = resolveValue(toast.message, toast);

                if (typeof message !== "string") {
                    return <>{message}</>;
                }

                return (
                    <Toast
                        toast={{
                            message,
                            variant: toast.type === "error" ? "error" : "success",
                        }}
                        visible={toast.visible}
                        floating={false}
                    />
                );
            }}
        </Toaster>
    );
}
