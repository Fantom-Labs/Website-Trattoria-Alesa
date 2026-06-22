function ItalyFlag() {
  return (
    <svg
      width="18"
      height="13"
      viewBox="0 0 3 2"
      aria-label="bandeira italiana"
      role="img"
      className="inline-block align-middle"
      style={{ marginBottom: "1px" }}
    >
      <rect width="1" height="2" fill="#009246" />
      <rect x="1" width="1" height="2" fill="#ffffff" />
      <rect x="2" width="1" height="2" fill="#ce2b37" />
    </svg>
  );
}

export function VacationBanner({ message }: { message: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full bg-dark-slate px-4 py-2.5 text-center text-xs leading-relaxed text-cream sm:text-sm"
    >
      {message} <ItalyFlag /> ❤️
    </div>
  );
}
