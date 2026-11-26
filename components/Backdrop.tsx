"use client";
/* Full-screen travel footage behind the home page. Three portrait panels on wide
   screens, one on phones. Each panel keeps its next clip loaded and crossfades
   to it just before the current one ends, with a slow push-in and film grain. */
import { useEffect, useRef, useState } from "react";
import type { Clip } from "@/lib/travel";

const FADE = 1.4;

function Panel({ list, delay, showCaption, className = "" }: { list: Clip[]; delay: number; showCaption: boolean; className?: string }) {
  const refs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
  const [slot, setSlot] = useState<[number, number]>([0, 1 % list.length]);
  const [front, setFront] = useState<0 | 1>(0);
  const [shown, setShown] = useState(0);
  const busy = useRef(false);
  const started = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => {
      started.current = true;
      refs[0].current?.play().catch(() => {});
    }, delay);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onTime(k: 0 | 1) {
    const v = refs[k].current;
    if (!v || k !== front || busy.current || !v.duration) return;
    if (v.duration - v.currentTime > FADE) return;
    busy.current = true;
    const back = (k ^ 1) as 0 | 1;
    const nv = refs[back].current;
    if (nv) {
      nv.currentTime = 0;
      nv.play().catch(() => {});
    }
    setFront(back);
    setShown(slot[back]);
    window.setTimeout(() => {
      // load the clip after next into the element that just faded out
      setSlot((s) => {
        const n = [...s] as [number, number];
        n[k] = (s[back] + 1) % list.length;
        return n;
      });
      busy.current = false;
    }, FADE * 1000 + 100);
  }

  const clip = list[shown];
  return (
    <figure className={`relative m-0 h-full overflow-hidden rounded-[22px] bg-black ${className}`}>
      {[0, 1].map((k) => {
        const c = list[slot[k]];
        return (
          <video
            key={`${k}-${c.id}`}
            ref={refs[k]}
            src={`/media/clips/${c.id}.mp4`}
            poster={`/media/clips/${c.id}.jpg`}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            onTimeUpdate={() => onTime(k as 0 | 1)}
            onEnded={() => onTime(k as 0 | 1)}
            className={`kenburns absolute inset-0 h-full w-full object-cover ${front === k ? "is-front" : ""}`}
            style={{ opacity: front === k ? 1 : 0, transition: `opacity ${FADE}s ease-in-out`, animationDuration: `${c.dur + FADE}s` }}
          />
        );
      })}
      <figcaption className={`ui absolute left-4 top-20 z-10 rounded-full bg-black/40 px-3.5 py-1.5 text-[14px] text-white backdrop-blur-md transition-opacity duration-500 ${showCaption ? "opacity-100" : "opacity-0"}`}>
        <span className="font-semibold">{clip.place}</span>
        <span className="text-white/75">, {clip.when}</span>
      </figcaption>
    </figure>
  );
}

export default function Backdrop({ clips, dim }: { clips: Clip[]; dim: boolean }) {
  const [wide, setWide] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const set = () => setWide(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  const lists = wide ? [0, 1, 2].map((p) => clips.filter((_, i) => i % 3 === p)) : [clips];
  return (
    <div className="fixed inset-0 bg-black" aria-hidden="true">
      <div className={`absolute inset-0 grid gap-3 p-3 ${wide ? "grid-cols-3" : "grid-cols-1"}`}>
        {lists.map((l, i) => (
          <Panel key={`${wide}-${i}`} list={l} delay={i * 1300} showCaption={!dim} />
        ))}
      </div>
      <div className={`absolute inset-0 transition-colors duration-700 ${dim ? "bg-black/70" : "bg-black/20"}`} />
      <div className="vignette absolute inset-0" />
      <div className="grain absolute -inset-[50%]" />
    </div>
  );
}
