"use client";

import { LogOut, X } from "lucide-react";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function LogoutDialog({
  open,
  onClose,
  onConfirm,
}: Props) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-title"
        className="relative w-full max-w-sm rounded-2xl border border-surface-container-high bg-surface-container-lowest p-6 text-center shadow-2xl sm:p-8"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-error-container text-error">
          <LogOut size={27} />
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-3 top-3 rounded-lg p-2 text-outline hover:bg-surface-container-low"
        >
          <X className="sr-only" />
        </button>

        <h2 id="logout-title" className="font-headline text-xl font-semibold text-on-surface">
          Log out of your account?
        </h2>

        <p className="mt-2 font-body text-sm leading-6 text-on-surface-variant">
          You can sign in again using your phone number and PIN.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={onConfirm}
            className="w-full rounded-full bg-error py-3 font-label-md text-sm font-semibold text-on-error hover:opacity-90"
          >
            Yes, log out
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full bg-surface-container-low py-3 font-label-md text-sm font-semibold text-primary hover:bg-surface-container-high"
          >
            Stay logged in
          </button>
        </div>
      </div>
    </div>
  );
}