"use client";

import { useCallback, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

export type ToastVariant = "success" | "error";
type ToastState = { message: string; variant: ToastVariant } | null;

export function useToast(durationMs = 4000) {
    const [toast, setToast] = useState<ToastState>(null);

    const showToast = useCallback(
        (message: string, variant: ToastVariant = "success") => {
            setToast({ message, variant });
            setTimeout(() => setToast(null), durationMs);
        },
        [durationMs]
    );

    return { toast, showToast };
}

export function Toast({
    toast,
    visible = Boolean(toast),
    floating = true,
}: {
    toast: ToastState;
    visible?: boolean;
    floating?: boolean;
}) {
    const wrapperClassName = [
        "transition-all duration-300 transform max-w-sm w-full",
        floating ? "fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4" : "",
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-16 pointer-events-none",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={wrapperClassName} aria-live="polite">
            <div className="flex items-center gap-3 p-4 rounded-xl shadow-xl bg-surface-container-lowest text-on-surface">
                {toast?.variant === "error" ? (
                    <XCircle className="w-5 h-5 text-error shrink-0" />
                ) : (
                    <CheckCircle2 className="w-5 h-5 text-secondary shrink-0" />
                )}
                <p className="font-body-sm text-body-sm font-semibold flex-1">{toast?.message}</p>
            </div>
        </div>
    );
}
