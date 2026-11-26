"use client";
/* One full-screen video behind the home page, rotating through travel clips.
   The footage sits under a layer of film grain and soft blur; a clear "lens"
   follows the cursor (or finger) and shows the sharp video underneath. */
import { useEffect, useRef, useState } from "react";
import type { Clip } from "@/lib/travel";

const FADE = 1.6;

export default function Backdrop({ clips, dim }: { clips: Clip[]; dim: boolean }) {
  const refs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
  const [slot, setSlot] = useState<[number, number]>([0, 1 % clips.length]);
  const [front, setFront] = useState<0 | 1>(0);
  const [shown, setShown] = useState(0);
  const busy = useRef(false);
  const lens = useRef<HTMLDivElement>(null);

  // start the first clip
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    refs[0].current?.play().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // the clear lens eases toward the pointer
  useEffect(() => {
    const el = lens.current;
    if (!el) return;
    let x = window.innerWidth / 2, y = window.innerHeight / 2, tx = x, ty = y, r = 0, tr = 0, raf = 0;
    const move = (e: PointerEvent) => { tx = e.clientX; ty = e.clientY; tr = e.pointerType === "touch" ? 140 : 190; };
    const leave = () => { tr = 0; };
    const tick = () => {
      x += (tx - x) * 0.14; y += (ty - y) * 0.14; r += (tr - r) * 0.1;
      el.style.setProperty("--lx", `${x}px`);
      el.style.setProperty("--ly", `${y}px`);
      el.style.setProperty("--lr", `${r}px`);
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerdown", move);
    document.addEventListener("pointerleave", leave);
    window.addEventListener("blur", leave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", move);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
    };
  }, []);

  function onTime(k: 0 | 1) {
    const v = refs[k].current;
    if (!v || k !== front || busy.current || !v.duration) return;
    if (v.duration - v.currentTime > FADE) return;
    busy.current = true;
    const back = (k ^ 1) as 0 | 1;
    const nv = refs[back].current;
    if (nv) { nv.currentTime = 0; nv.play().catch(() => {}); }
    setFront(back);
    setShown(slot[back]);
    window.setTimeout(() => {
      setSlot((s) => {
        const n = [...s] as [number, number];
        n[k] = (s[back] + 1) % clips.length;
        return n;
      });
      busy.current = false;
    }, FADE * 1000 + 100);
  }

  const clip = clips[shown];
  return (
    <div className="fixed inset-0 bg-black" aria-hidden="true">
      {[0, 1].map((k) => {
        const c = clips[slot[k]];
        return (
          <video
            key={`${k}-${c.id}`}
            ref={refs[k]}
            src={`/media/clips/${c.id}.mp4`}
            poster={`/media/clips/${c.id}.jpg`}
            muted
            playsInline
            preload="auto"
            onTimeUpdate={() => onTime(k as 0 | 1)}
            onEnded={() => onTime(k as 0 | 1)}
            className={`kenburns absolute inset-0 h-full w-full object-cover ${front === k ? "is-front" : ""}`}
            style={{ opacity: front === k ? 1 : 0, transition: `opacity ${FADE}s ease-in-out`, animationDuration: `${c.dur + FADE}s` }}
          />
        );
      })}
      <div className={`absolute inset-0 transition-colors duration-700 ${dim ? "bg-black/65" : "bg-black/15"}`} />
      <div ref={lens} className="lens absolute inset-0">
        <div className="grain absolute -inset-[50%]" />
      </div>
      <div className="vignette absolute inset-0" />
      <p className={`ui absolute left-6 top-20 z-10 m-0 rounded-full bg-black/40 px-3.5 py-1.5 text-[14px] text-white backdrop-blur-md transition-opacity duration-500 md:left-12 ${dim ? "opacity-0" : "opacity-100"}`}>
        <span className="font-semibold">{clip.place}</span>
        <span className="text-white/75">, {clip.when}</span>
      </p>
    </div>
  );
}
