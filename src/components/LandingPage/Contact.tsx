import { Mail, Phone, Clock, Send } from "lucide-react";
import { SocialLinks } from "./SocialLinks";

const CONTACT_CHANNELS = [
  {
    icon: Mail,
    label: "Email Inquiries",
    value: "hello@elevateheartfoundation.org",
    href: "mailto:hello@elevateheartfoundation.org",
  },
  {
    icon: Phone,
    label: "Phone Support",
    value: "+234 800 000 0000",
    href: "tel:+2348000000000",
  },
];

const INQUIRY_TYPES = [
  "Pinnacle Program Inquiry",
  "Chop Beta Foodstuff Support",
  "Wallet & Savings Assistance",
  "Community Mentorship & Volunteering",
  "General Support",
];

export function Contact() {
  return (
    <section id="contact" className="w-full bg-surface-container py-20 px-4 md:px-8 border-t border-surface-container">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Get In Touch
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-primary font-bold tracking-tight mt-2">
            Contact Elevate Heart
          </h2>
          <p className="font-sans text-base text-on-surface-variant mt-2 leading-7">
            Have questions about our foundation, contribution journeys, or
            community initiatives? We are here to support you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-surface-container flex flex-col justify-between h-full">
            <div className="flex flex-col gap-6">
              <div>
                <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-secondary-brand">
                  Direct Channels
                </span>
                <h3 className="font-display text-2xl font-bold text-primary mt-1">
                  We&rsquo;d Love to Hear from You
                </h3>
                <p className="font-sans text-sm text-on-surface-variant mt-2 leading-7">
                  Reach out directly to our community coordination team via email,
                  telephone, or during scheduled office hours.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {CONTACT_CHANNELS.map((channel) => (
                  <div
                    key={channel.label}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-surface-container-low border border-surface-container"
                  >
                    <div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                      <channel.icon className="w-5 h-5" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="font-sans text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
                        {channel.label}
                      </span>
                      <a href={channel.href} className="break-all font-sans text-sm font-semibold text-primary hover:underline">
                        {channel.value}
                      </a>
                    </div>
                  </div>
                ))}

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-surface-container-low border border-surface-container">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-high text-primary flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
                      Office Hours
                    </span>
                    <span className="font-sans text-sm font-semibold text-on-surface">
                      Mon–Fri, 9:00 AM – 5:00 PM (WAT)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-surface-container flex flex-col gap-3">
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Connect Across Socials
              </span>
              <SocialLinks variant="light" />
            </div>
          </div>

          <div className="lg:col-span-7 bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-surface-container flex flex-col justify-between h-full">
            <div>
              <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-tertiary">
                Send a Message
              </span>
              <h3 className="font-display text-2xl font-bold text-primary mt-1">
                Community Inquiry Form
              </h3>
              <p className="font-sans text-sm text-on-surface-variant mt-2 mb-6 leading-7">
                Fill out the details below and our team will get back to you
                within 24–48 business hours.
              </p>

              <form className="flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name" type="text" placeholder="e.g. Chinelo Okonkwo" />
                  <Field label="Email Address" type="email" placeholder="e.g. chinelo@example.com" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Phone Number" type="tel" placeholder="+234 ..." />
                  <div className="flex flex-col gap-1.5">
                    <label className="font-sans text-xs font-bold text-on-surface uppercase tracking-wide">
                      Inquiry Type
                    </label>
                    <select className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-surface-container text-sm text-on-surface focus:outline-none">
                      {INQUIRY_TYPES.map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs font-bold text-on-surface uppercase tracking-wide">
                    Your Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="How can our foundation assist or partner with you?"
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-surface-container text-sm text-on-surface focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary text-on-primary font-sans text-sm font-bold shadow-md hover:bg-primary-container transition-all flex items-center justify-center gap-2 mt-2"
                >
                  Send Message
                  <Send className="w-[18px] h-[18px]" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  type,
  placeholder,
}: {
  label: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-sans text-xs font-bold text-on-surface uppercase tracking-wide">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-surface-container text-sm text-on-surface focus:outline-none"
      />
    </div>
  );
}