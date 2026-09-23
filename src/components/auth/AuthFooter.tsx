export function AuthFooter() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-surface-container py-6 px-6">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <p className="font-body text-sm text-on-surface-variant">
          © 2026 Elevate Heart Foundation.
        </p>
        <div className="font-body text-sm text-on-surface-variant">
          Need help? Call{" "}
          <a className="font-bold text-primary hover:underline" href="tel:+2348000000000">
            +234 800 000 0000
          </a>
        </div>
      </div>
    </footer>
  );
}