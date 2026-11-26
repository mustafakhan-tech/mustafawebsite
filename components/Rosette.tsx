"use client";
/* A guilloche rosette, the interlaced fine-line pattern engraved on banknotes.
   Generated in the browser so the page HTML stays small. */
import { useEffect, useState } from "react";

type Ring = { count: number; r: number; amp: number; freq: number };
const RINGS: Ring[] = [
  { count: 18, r: 150, amp: 24, freq: 6 },
  { count: 14, r: 105, amp: 12, freq: 12 },
  { count: 10, r: 70, amp: 6, freq: 18 },
];

function build() {
  const paths: string[] = [];
  const steps = 260;
  for (const ring of RINGS) {
    for (let i = 0; i < ring.count; i++) {
      const ph = (i / ring.count) * Math.PI * 2;
      let d = "";
      for (let s = 0; s <= steps; s++) {
        const t = (s / steps) * Math.PI * 2;
        const r = ring.r + ring.amp * Math.sin(ring.freq * t + ph);
        d += `${s ? "L" : "M"}${(200 + r * Math.cos(t)).toFixed(1)} ${(200 + r * Math.sin(t)).toFixed(1)}`;
      }
      paths.push(d + "Z");
    }
  }
  return paths;
}

export default function Rosette({ className = "" }: { className?: string }) {
  const [paths, setPaths] = useState<string[]>([]);
  useEffect(() => setPaths(build()), []);
  return (
    <svg viewBox="0 0 400 400" aria-hidden="true" className={`rosette ${className}`} fill="none">
      {paths.map((d, i) => (
        <path key={i} d={d} pathLength={1} stroke="var(--money)" strokeWidth="0.5" strokeOpacity="0.85" style={{ animationDelay: `${i * 0.025}s` }} />
      ))}
    </svg>
  );
}
