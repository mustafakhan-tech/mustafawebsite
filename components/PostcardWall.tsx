"use client";
/* Travel photos as prints scattered on a table. Drag them around; tap one to flip it. */
import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import type { TravelPhoto } from "@/lib/travel";

type Card = { p: TravelPhoto; x: number; y: number; r: number; z: number; flipped: boolean };

function seeded(i: number) {
  const s = Math.sin(i * 9301 + 49297) * 233280;
  return s - Math.floor(s);
}

export default function PostcardWall({ photos }: { photos: TravelPhoto[] }) {
  const initial = useMemo<Card[]>(
    () =>
      photos.map((p, i) => ({
        p,
        x: 4 + seeded(i) * 70,
        y: 4 + seeded(i + 50) * 62,
        r: (seeded(i + 99) - 0.5) * 16,
        z: i + 1,
        flipped: false,
      })),
    [photos]
  );
  const [cards, setCards] = useState(initial);
  const area = useRef<HTMLDivElement>(null);
  const drag = useRef<{ i: number; sx: number; sy: number; ox: number; oy: number; moved: boolean } | null>(null);
  const top = useRef(photos.length + 1);

  function down(i: number, e: React.PointerEvent) {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag.current = { i, sx: e.clientX, sy: e.clientY, ox: cards[i].x, oy: cards[i].y, moved: false };
    top.current += 1;
    const z = top.current;
    setCards((cs) => cs.map((c, k) => (k === i ? { ...c, z } : c)));
  }
  function move(e: React.PointerEvent) {
    const d = drag.current;
    const box = area.current?.getBoundingClientRect();
    if (!d || !box) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true;
    const x = Math.max(-5, Math.min(85, d.ox + (dx / box.width) * 100));
    const y = Math.max(-5, Math.min(80, d.oy + (dy / box.height) * 100));
    setCards((cs) => cs.map((c, k) => (k === d.i ? { ...c, x, y } : c)));
  }
  function up() {
    const d = drag.current;
    drag.current = null;
    if (d && !d.moved) setCards((cs) => cs.map((c, k) => (k === d.i ? { ...c, flipped: !c.flipped } : c)));
  }
  function flipKey(i: number, e: React.KeyboardEvent) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setCards((cs) => cs.map((c, k) => (k === i ? { ...c, flipped: !c.flipped } : c)));
    }
  }

  return (
    <div ref={area} className="postcards relative h-[max(440px,60svh)] overflow-hidden rounded-[28px] bg-black/35 ring-1 ring-white/10 backdrop-blur-sm">
      {cards.map((c, i) => {
        const wide = c.p.w > c.p.h;
        return (
          <button
            key={c.p.id}
            type="button"
            aria-label={`${c.p.place}, ${c.p.when}. ${c.flipped ? "Showing the back." : "Press to flip."}`}
            onPointerDown={(e) => down(i, e)}
            onPointerMove={move}
            onPointerUp={up}
            onPointerCancel={up}
            onKeyDown={(e) => flipKey(i, e)}
            className="postcard absolute touch-none select-none p-0"
            style={{ left: `${c.x}%`, top: `${c.y}%`, zIndex: c.z, transform: `rotate(${c.r}deg)`, width: wide ? "min(260px,46vw)" : "min(190px,34vw)" }}
          >
            <span className={`postcard-inner block ${c.flipped ? "is-flipped" : ""}`}>
              <span className="postcard-face block rounded-md bg-[#F4EFE6] p-2 pb-7 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.7)]">
                <Image src={`/media/thumbs/${c.p.id}.jpg`} alt="" width={wide ? 640 : 480} height={wide ? 480 : 640} draggable={false} className="pointer-events-none block h-auto w-full rounded-sm" sizes="260px" />
              </span>
              <span className="postcard-back absolute inset-0 flex flex-col justify-between rounded-md bg-[#F4EFE6] p-4 text-left text-[#1b1712] shadow-[0_18px_40px_-14px_rgba(0,0,0,0.7)]">
                <span className="ml-auto block h-12 w-10 rounded-sm border-2 border-dashed border-[#b8833f]/70" aria-hidden="true" />
                <span>
                  <span className="block font-serif text-[1.25rem] italic leading-tight">{c.p.place}</span>
                  <span className="ui mt-1 block text-[13px] opacity-70">{c.p.when}</span>
                </span>
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
