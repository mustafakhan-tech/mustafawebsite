export default function ChalkUnderline() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 40"
      preserveAspectRatio="none"
      className="absolute -bottom-3 left-0 h-[0.12em] min-h-[10px] w-full overflow-visible"
    >
      <defs>
        <filter id="rough" x="-5%" y="-50%" width="110%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04 0.9" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="7" />
        </filter>
      </defs>
      <path
        className="chalk-path"
        pathLength={1}
        d="M4 22 C 120 12, 260 28, 400 18 S 560 20, 596 14"
        fill="none"
        stroke="#4E73B5"
        strokeWidth="11"
        strokeLinecap="round"
        filter="url(#rough)"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
