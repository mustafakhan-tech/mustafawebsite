"use client";
/* Plays "I Like Me Better" by Lauv through Spotify's official embed, only after a visitor taps.
   Logged-in Spotify users hear the full song; everyone else gets Spotify's preview. */
import { useRef, useState } from "react";

const TRACK = "spotify:track:2P91MQbaiQOfbiz9VqhqKQ";

type Controller = { play: () => void; pause: () => void; togglePlay: () => void; addListener: (e: string, cb: () => void) => void };
type IFrameAPI = { createController: (el: HTMLElement, opts: object, cb: (c: Controller) => void) => void };

declare global {
  interface Window { onSpotifyIframeApiReady?: (api: IFrameAPI) => void }
}

export default function SoundButton() {
  const host = useRef<HTMLDivElement>(null);
  const ctrl = useRef<Controller | null>(null);
  const [state, setState] = useState<"off" | "loading" | "on">("off");

  function start() {
    if (ctrl.current) {
      ctrl.current.play();
      setState("on");
      return;
    }
    setState("loading");
    window.onSpotifyIframeApiReady = (api) => {
      if (!host.current) return;
      api.createController(host.current, { uri: TRACK, width: "100%", height: 80 }, (c) => {
        ctrl.current = c;
        c.addListener("ready", () => {
          c.play();
          setState("on");
        });
      });
    };
    const s = document.createElement("script");
    s.src = "https://open.spotify.com/embed/iframe-api/v1";
    s.async = true;
    document.body.appendChild(s);
  }

  function stop() {
    ctrl.current?.pause();
    setState("off");
  }

  return (
    <div className="ui pointer-events-none fixed bottom-4 right-4 z-50 flex w-[min(320px,calc(100vw-2rem))] flex-col items-end gap-2 [&>*]:pointer-events-auto">
      <div className={`w-full overflow-hidden rounded-2xl shadow-2xl transition-all duration-300 ${state === "on" ? "max-h-[90px] opacity-100" : "pointer-events-none max-h-0 opacity-0"}`}>
        <div ref={host} />
      </div>
      <button
        type="button"
        onClick={state === "on" ? stop : start}
        aria-pressed={state === "on"}
        className="flex items-center gap-2.5 rounded-full border border-white/20 bg-black/60 px-4 py-2.5 text-[14px] text-white backdrop-blur-md transition-colors hover:bg-black/80"
      >
        <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
          {[0, 1, 2].map((k) => (
            <span key={k} className={`eq-bar w-[3px] rounded-sm bg-current ${state === "on" ? "is-playing" : ""}`} style={{ animationDelay: `${k * 0.18}s` }} />
          ))}
        </span>
        {state === "on" ? "Turn music off" : state === "loading" ? "Loading…" : (
          <>
            <span className="sm:hidden">Play music</span>
            <span className="hidden sm:inline">Play my song: I Like Me Better, Lauv</span>
          </>
        )}
      </button>
    </div>
  );
}
