"use client";
/* Three portrait panels of travel clips (one on phones). Each panel crossfades
   to its next clip on its own beat, slowed down so 2-second Live Photos feel cinematic. */
import { useEffect, useRef, useState } from "react";
import type { Clip } from "@/lib/travel";

const RATE = 0.62;
const HOLD = 3600;

function Panel({ list, offset, className = "" }: { list: Clip[]; offset: number; className?: string }) {
  const [i, setI] = useState(0);
  const [front, setFront] = useState<0 | 1>(0);
  const vids = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
  const [srcs, setSrcs] = useState<[string, string]>([list[0].id, list[1 % list.length].id]);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduce(r);
    if (r) return;
    const v = vids[0].current;
    if (v) { v.playbackRate = RATE; v.play().catch(() => {}); }
    let n = 0;
    let f: 0 | 1 = 0;
    const start = window.setTimeout(function tick() {
      n = (n + 1) % list.length;
      const back = (f ^ 1) as 0 | 1;
      const el = vids[back].current;
      if (el) {
        el.currentTime = 0;
        el.playbackRate = RATE;
        el.play().catch(() => {});
      }
      f = back;
      setFront(back);
      setI(n);
      // queue the following clip into the element that just went to the back
      window.setTimeout(() => {
        setSrcs((s) => {
          const next = [...s] as [string, string];
          next[(back ^ 1) as 0 | 1] = list[(n + 1) % list.length].id;
          return next;
        });
      }, 1200);
      timer.current = window.setTimeout(tick, HOLD);
    }, HOLD + offset);
    const timer = { current: start };
    return () => window.clearTimeout(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clip = list[i];
  return (
    <figure className={`relative m-0 h-full overflow-hidden rounded-[22px] bg-black ${className}`}>
      {[0, 1].map((k) => (
        <video
          key={k}
          ref={vids[k]}
          src={`/media/clips/${srcs[k]}.mp4`}
          poster={`/media/clips/${srcs[k]}.jpg`}
          muted
          playsInline
          loop
          preload={k === 0 ? "auto" : "metadata"}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1100ms] ease-out"
          style={{ opacity: reduce ? (k === 0 ? 1 : 0) : front === k ? 1 : 0 }}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0)_25%,rgba(0,0,0,0)_45%,rgba(0,0,0,0.8)_100%)]" aria-hidden="true" />
      <figcaption className="ui absolute left-4 top-20 rounded-full bg-black/40 px-3.5 py-1.5 text-[14px] text-white backdrop-blur-md transition-opacity duration-500">
        <span className="font-semibold">{clip.place}</span>
        <span className="text-white/75">, {clip.when}</span>
      </figcaption>
    </figure>
  );
}

export default function HeroReel({ clips }: { clips: Clip[] }) {
  const a = clips.filter((_, i) => i % 3 === 0);
  const b = clips.filter((_, i) => i % 3 === 1);
  const c = clips.filter((_, i) => i % 3 === 2);
  return (
    <div className="absolute inset-0 grid grid-cols-1 gap-3 p-3 md:grid-cols-3">
      <Panel list={a} offset={0} />
      <Panel list={b} offset={1200} className="hidden md:block" />
      <Panel list={c} offset={2400} className="hidden md:block" />
    </div>
  );
}
