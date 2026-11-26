"use client";
/* A WebGL globe (cobe) with a pin for every place in the photo set.
   Drag to spin it. Pick a place from the list and the globe turns to it and shows the photo. */
import createGlobe from "cobe";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { TravelPhoto } from "@/lib/travel";

type Place = { name: string; country: string; lat: number; lon: number; photo: TravelPhoto };

function toAngles(lat: number, lon: number) {
  return { phi: Math.PI - ((lon * Math.PI) / 180 - Math.PI / 2), theta: (lat * Math.PI) / 180 };
}

export default function TravelGlobe({ photos }: { photos: TravelPhoto[] }) {
  const places = useMemo(() => {
    const m = new Map<string, Place>();
    for (const p of photos) {
      if (!p.place.includes(", ")) continue;
      if (!m.has(p.place)) {
        const [name, country] = p.place.split(", ");
        m.set(p.place, { name, country: country ?? "", lat: p.lat, lon: p.lon, photo: p });
      }
    }
    return Array.from(m.values());
  }, [photos]);
  const countries = useMemo(() => Array.from(new Set(places.map((p) => p.country))), [places]);

  const canvas = useRef<HTMLCanvasElement>(null);
  const target = useRef<{ phi: number; theta: number } | null>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const [active, setActive] = useState<Place | null>(null);

  useEffect(() => {
    if (!canvas.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let phi = toAngles(40, -40).phi;
    let theta = 0.35;
    let width = canvas.current.offsetWidth;
    const onResize = () => canvas.current && (width = canvas.current.offsetWidth);
    window.addEventListener("resize", onResize);
    const globe = createGlobe(canvas.current, {
      devicePixelRatio: Math.min(2, window.devicePixelRatio),
      width: width * 2,
      height: width * 2,
      phi,
      theta,
      dark: 1,
      diffuse: 1.15,
      mapSamples: 18000,
      mapBrightness: 5.5,
      baseColor: [0.22, 0.2, 0.17],
      markerColor: [0.9, 0.66, 0.4],
      glowColor: [0.35, 0.3, 0.24],
      markers: places.map((p) => ({ location: [p.lat, p.lon] as [number, number], size: 0.04 })),
    });
    let raf = 0;
    const frame = () => {
      if (target.current) {
        phi += (target.current.phi - phi) * 0.08;
        theta += (target.current.theta - theta) * 0.08;
      } else if (!drag.current && !reduce) {
        phi += 0.0025;
      }
      globe.update({ phi, theta, width: width * 2, height: width * 2 });
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    const el = canvas.current;
    const down = (e: PointerEvent) => { drag.current = { x: e.clientX, y: e.clientY }; target.current = null; el.setPointerCapture(e.pointerId); };
    const move = (e: PointerEvent) => {
      if (!drag.current) return;
      phi += (e.clientX - drag.current.x) / 180;
      theta = Math.max(-1, Math.min(1, theta + (e.clientY - drag.current.y) / 300));
      drag.current = { x: e.clientX, y: e.clientY };
    };
    const up = () => { drag.current = null; };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    requestAnimationFrame(() => el && (el.style.opacity = "1"));
    return () => {
      cancelAnimationFrame(raf);
      globe.destroy();
      window.removeEventListener("resize", onResize);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [places]);

  function focus(p: Place) {
    setActive(p);
    const a = toAngles(p.lat, p.lon);
    target.current = { phi: a.phi, theta: Math.max(-0.9, Math.min(0.9, a.theta)) };
  }

  return (
    <div className="grid items-center gap-8 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      <div className="relative mx-auto aspect-square w-full max-w-[min(560px,58svh)]">
        <canvas
          ref={canvas}
          aria-label={`A globe with pins on ${places.length} places I've photographed`}
          role="img"
          className="h-full w-full cursor-grab touch-none opacity-0 transition-opacity duration-1000 active:cursor-grabbing"
        />
        {active && (
          <figure className="pointer-events-none absolute bottom-[8%] right-[4%] m-0 w-[46%] max-w-[230px] rotate-2 rounded-xl bg-[#F4EFE6] p-2 pb-3 text-[#1b1712] shadow-2xl">
            <Image src={`/media/thumbs/${active.photo.id}.jpg`} alt={active.photo.place} width={active.photo.w > active.photo.h ? 640 : 480} height={active.photo.w > active.photo.h ? 480 : 640} className="h-auto w-full rounded-md" />
            <figcaption className="ui mt-2 px-1 text-[14px]">
              <span className="font-semibold">{active.photo.place}</span>
              <span className="block text-[13px] opacity-70">{active.photo.when}</span>
            </figcaption>
          </figure>
        )}
      </div>
      <div>
        <p className="wide num mb-1 whitespace-nowrap text-[clamp(2.2rem,3.8vw,3.2rem)] leading-none text-money">{countries.length} countries</p>
        <p className="ui mb-6 text-[17px] text-ink/70">{places.length} places, 4 continents. Pick one to fly there.</p>
        <dl className="m-0 grid gap-y-2">
          {countries.map((c) => (
            <div key={c} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-x-3 border-t border-white/10 pt-2">
              <dt className="ui text-[14px] text-white/55">{c}</dt>
              <dd className="m-0 flex flex-wrap gap-x-1 gap-y-1">
                {places.filter((p) => p.country === c).map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onMouseEnter={() => focus(p)}
                    onFocus={() => focus(p)}
                    onClick={() => focus(p)}
                    className={`ui rounded-full px-2.5 py-0.5 text-[15px] transition-colors ${active?.name === p.name ? "bg-money text-paper" : "hover:bg-white/10"}`}
                  >
                    {p.name}
                  </button>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
