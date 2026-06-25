export default function FloralDivider({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 400 60"
      className={`mx-auto h-10 w-full max-w-xs text-olive-light ${flip ? "scale-y-[-1]" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M0 30 H150" />
      <path d="M250 30 H400" />
      <circle cx="200" cy="30" r="14" />
      <path d="M200 16 C 190 8, 175 12, 178 24" />
      <path d="M200 16 C 210 8, 225 12, 222 24" />
      <path d="M186 30 C 178 22, 168 26, 170 36" />
      <path d="M214 30 C 222 22, 232 26, 230 36" />
      <path d="M200 44 C 192 50, 196 58, 206 56" />
    </svg>
  );
}
