"use client";
/* The home page as a deck of full-screen pages. Turn pages with the wheel, arrow keys,
   a swipe, or the page dots. A page that has more content than fits scrolls on its own first. */
import { useCallback, useEffect, useRef, useState } from "react";
import Backdrop from "./Backdrop";
import type { Clip } from "@/lib/travel";

export type DeckPage = { id: string; label: string; content: React.ReactNode };

const DURATION = 950;

function canScroll(el: Element | null, dir: 1 | -1) {
  while (el && el instanceof HTMLElement) {
    if (el.dataset.pageScroll !== undefined) {
      return dir > 0 ? el.scrollTop + el.clientHeight < el.scrollHeight - 2 : el.scrollTop > 2;
    }
    el = el.parentElement;
  }
  return false;
}

export default function Deck({ pages, clips }: { pages: DeckPage[]; clips: Clip[] }) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState<{ i: number; dir: 1 | -1 } | null>(null);
  const [dir, setDir] = useState<1 | -1>(1);
  const lock = useRef(false);
  const wheelAcc = useRef(0);
  const touch = useRef<{ y: number; x: number; t: EventTarget | null } | null>(null);

  const go = useCallback(
    (next: number) => {
      if (lock.current || next === index || next < 0 || next >= pages.length) return;
      lock.current = true;
      const d: 1 | -1 = next > index ? 1 : -1;
      setDir(d);
      setLeaving({ i: index, dir: d });
      setIndex(next);
      history.replaceState(null, "", next === 0 ? location.pathname : `#${pages[next].id}`);
      window.setTimeout(() => {
        setLeaving(null);
        lock.current = false;
      }, DURATION);
    },
    [index, pages]
  );

  useEffect(() => {
    const h = location.hash.slice(1);
    const i = pages.findIndex((p) => p.id === h);
    if (i > 0) setIndex(i);
  }, [pages]);

  useEffect(() => {
    const onHash = () => {
      const i = pages.findIndex((p) => p.id === location.hash.slice(1));
      if (i >= 0) go(i);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [go, pages]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const d = e.deltaY > 0 ? 1 : -1;
      if (canScroll(e.target as Element, d)) return;
      e.preventDefault();
      if (lock.current) return;
      wheelAcc.current += e.deltaY;
      if (Math.abs(wheelAcc.current) > 50) {
        wheelAcc.current = 0;
        go(index + d);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (["ArrowDown", "PageDown", "ArrowRight"].includes(e.key) || (e.key === " " && t.tagName !== "BUTTON")) { e.preventDefault(); go(index + 1); }
      if (["ArrowUp", "PageUp", "ArrowLeft"].includes(e.key)) { e.preventDefault(); go(index - 1); }
      if (e.key === "Home") go(0);
      if (e.key === "End") go(pages.length - 1);
    };
    const onStart = (e: TouchEvent) => { touch.current = { y: e.touches[0].clientY, x: e.touches[0].clientX, t: e.target }; };
    const onEnd = (e: TouchEvent) => {
      const s = touch.current;
      touch.current = null;
      if (!s) return;
      const dy = s.y - e.changedTouches[0].clientY;
      const dx = s.x - e.changedTouches[0].clientX;
      if (Math.abs(dy) < 60 || Math.abs(dx) > Math.abs(dy)) return;
      if ((s.t as Element)?.closest?.(".postcards, canvas")) return;
      const d = dy > 0 ? 1 : -1;
      if (canScroll(s.t as Element, d)) return;
      go(index + d);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [go, index, pages.length]);

  return (
    <div className="fixed inset-0 overflow-hidden text-white">
      <Backdrop clips={clips} dim={index !== 0} />
      <div className="deck absolute inset-0">
        {pages.map((p, i) => {
          const isLeaving = leaving?.i === i;
          const visible = i === index || isLeaving;
          if (!visible) return null;
          const cls = isLeaving ? (leaving!.dir === 1 ? "leave-next" : "leave-prev") : leaving ? (dir === 1 ? "enter-next" : "enter-prev") : "";
          return (
            <section
              key={p.id}
              id={p.id}
              aria-label={p.label}
              aria-hidden={isLeaving || undefined}
              className={`page absolute inset-0 ${cls}`}
              style={{ zIndex: isLeaving ? 1 : 2 }}
            >
              <div data-page-scroll className="h-full overflow-y-auto overscroll-contain">
                <div className="mx-auto flex min-h-full max-w-page flex-col justify-center px-6 pb-28 pt-24 md:px-12">{p.content}</div>
              </div>
            </section>
          );
        })}
      </div>

      <nav aria-label="Pages" className="ui absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-end gap-3 md:flex">
        {pages.map((p, i) => (
          <button key={p.id} type="button" onClick={() => go(i)} aria-current={i === index ? "page" : undefined} className="group flex items-center gap-3 py-0.5 text-[13px]">
            <span className={`whitespace-nowrap transition-opacity ${i === index ? "opacity-100" : "opacity-0 group-hover:opacity-80 group-focus-visible:opacity-80"}`}>{p.label}</span>
            <span className={`block h-2 rounded-full bg-white transition-all ${i === index ? "w-6" : "w-2 opacity-50 group-hover:opacity-90"}`} />
          </button>
        ))}
      </nav>

      <div className="ui absolute bottom-4 left-4 z-20 flex items-center md:bottom-5 md:left-1/2 md:-translate-x-1/2 gap-3 rounded-full border border-white/15 bg-black/45 px-2 py-1.5 text-[14px] backdrop-blur-md">
        <button type="button" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous page" className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/15 disabled:opacity-30">
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12.5 15l-5-5 5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <span className="num min-w-[9ch] text-center" aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(pages.length).padStart(2, "0")} <span className="hidden text-white/70 sm:inline">{pages[index].label}</span>
        </span>
        <button type="button" onClick={() => go(index + 1)} disabled={index === pages.length - 1} aria-label="Next page" className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/15 disabled:opacity-30">
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M7.5 15l5-5-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  );
}
