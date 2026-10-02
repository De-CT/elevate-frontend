export default function NotificationsHeader() {
  return (
    <header className="space-y-4">

      <div className="flex items-start gap-3">
        <div className="hidden rounded-2xl bg-surface-container-low p-3 text-primary sm:block">
          <span className="material-symbols-outlined text-3xl" aria-hidden="true">
            notifications
          </span>
        </div>
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight text-on-surface md:text-4xl">
          Notifications
          </h1>
          <p className="mt-2 max-w-2xl font-body text-sm leading-6 text-on-surface-variant md:text-base">
            Updates about your wallet, payments, savings, and benefits will appear here.
          </p>
        </div>
      </div>
    </header>
  );
}