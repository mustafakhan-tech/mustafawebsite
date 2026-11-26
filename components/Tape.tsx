"use client";
import { useEffect, useState } from "react";

const INCH = 96;

export default function Tape() {
  const [count, setCount] = useState(12);

  useEffect(() => {
    const update = () => setCount(Math.ceil(document.documentElement.scrollHeight / INCH));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(document.body);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="tape-rail" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="tape-label" style={{ top: i * INCH + 6 }}>
          {i}
        </span>
      ))}
    </div>
  );
}
