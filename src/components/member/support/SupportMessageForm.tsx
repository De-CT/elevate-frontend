"use client";

import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import type { UserProfile } from "@/store/useUserStore";

export default function SupportMessageForm({ user }: { user: UserProfile | null }) {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("");

    const name = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() || "Member";
    const email = user?.email ?? "Not provided";
    const phone = user?.phone ?? "Not provided";
    const subject = encodeURIComponent(`Member support request from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:hello@elevateheartfoundation.org?subject=${subject}&body=${body}`;
    setStatus("Your email app should open with your support request. Send the draft to contact the team.");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-surface-container-high bg-surface-container-lowest p-5 shadow-sm sm:p-6"
    >
      <h3 className="font-headline text-lg font-bold text-on-surface">Send us a message</h3>
      <p className="mt-1 font-body text-sm leading-6 text-on-surface-variant">
        Your member contact details are included in an email draft for the support team.
      </p>

      <div className="mt-5 space-y-4">
        <div className="grid gap-3 rounded-xl bg-surface-container-low p-4 sm:grid-cols-2">
          <div>
            <p className="font-label-xs text-xs font-bold uppercase text-outline">Member</p>
            <p className="mt-1 font-body text-sm font-medium text-on-surface">
              {[user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Member"}
            </p>
          </div>
          <div>
            <p className="font-label-xs text-xs font-bold uppercase text-outline">Email</p>
            <p className="mt-1 break-words font-body text-sm font-medium text-on-surface">
              {user?.email || "Not provided"}
            </p>
          </div>
          <div className="sm:col-span-2">
            <p className="font-label-xs text-xs font-bold uppercase text-outline">Phone</p>
            <p className="mt-1 font-body text-sm font-medium text-on-surface">
              {user?.phone || "Not provided"}
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor="support-message"
            className="mb-1.5 block font-label-xs text-xs font-medium uppercase text-on-surface-variant"
          >
            Your message
          </label>
          <textarea
            id="support-message"
            rows={4}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
            minLength={10}
            className="w-full resize-y rounded-xl border border-surface-container-high bg-surface px-4 py-3 font-body text-sm text-on-surface outline-none placeholder:text-outline focus:border-secondary-accent focus:ring-2 focus:ring-secondary-accent/20"
            placeholder="How can our foundation assist you?"
          />
        </div>

        <button
          type="submit"
          className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 font-label-md text-sm font-bold text-on-primary shadow-sm transition hover:bg-primary/90 sm:w-auto"
        >
          Send message
          <Send size={16} />
        </button>

        {status && (
          <p role="status" className="font-body text-sm text-secondary">
            {status}
          </p>
        )}
      </div>
    </form>
  );
}