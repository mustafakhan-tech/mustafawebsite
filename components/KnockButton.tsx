"use client";
import { useState } from "react";
import { person } from "@/lib/content";

export default function KnockButton({ label = "Knock knock" }: { label?: string }) {
  const [knocking, setKnocking] = useState(false);

  function knock() {
    setKnocking(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(
      () => {
        setKnocking(false);
        window.location.href = `mailto:${person.email}?subject=Knock%20knock`;
      },
      reduce ? 0 : 600
    );
  }

  return (
    <button
      type="button"
      onClick={knock}
      className={`knock ${knocking ? "is-knocking" : ""} inline-block border-2 border-ink bg-tape px-7 py-3 font-display text-3xl font-extrabold uppercase tracking-wide text-ink shadow-[5px_5px_0_0_#0F1C33] transition-[box-shadow,transform] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_0_#0F1C33]`}
    >
      {label}
    </button>
  );
}
