import Image from "next/image";
import DemoVideo from "./DemoVideo";

export function KobaVisual() {
  return (
    <figure className="m-0 grid items-end gap-8 rounded-[28px] bg-mint p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:p-10">
      <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-[24px] shadow-[0_24px_60px_-30px_rgba(16,36,26,0.6)]">
        <div className="aspect-[9/16]">
          <DemoVideo src="/video/koba-demo.mp4" poster="/video/koba-demo.jpg" label="A group chat where Koba splits a restaurant bill four ways, then redoes it when one friend says she left early" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 md:items-start">
        <Image src="/img/koba-mascot.webp" alt="Koba's monkey mascot" width={220} height={220} className="h-auto w-[150px] md:w-[200px]" />
        <figcaption className="ui max-w-[34ch] text-center text-[16px] md:text-left">
          Koba in a group chat. Someone sends a receipt, Koba splits it four ways, then redoes the split when a friend says she left before dinner.
        </figcaption>
      </div>
    </figure>
  );
}

const profileRows = ["Location", "Audience", "Average views", "Content style", "Rate"];
const brands = ["OpenAI", "Uber", "Walmart", "Nike", "JD Sports"];

export function NexusVisual() {
  return (
    <figure className="m-0 grid gap-8 rounded-[28px] bg-mint p-6 text-ink md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:p-10">
      <div className="rounded-2xl bg-paper p-5 text-ink shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)]">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-12 w-12 shrink-0 rounded-full bg-mint" aria-hidden="true" />
          <div className="flex-1">
            <span className="block h-3 w-28 rounded bg-ink/80" aria-hidden="true" />
            <span className="mt-2 block h-2.5 w-20 rounded bg-ink/30" aria-hidden="true" />
          </div>
          <span className="ui rounded-full bg-mint px-2.5 py-0.5 text-[13px] font-semibold">TikTok</span>
        </div>
        <dl className="ui m-0 text-[15px]">
          {profileRows.map((r, i) => (
            <div key={r} className="flex items-center justify-between gap-4 border-t border-[color:var(--rule)] py-2">
              <dt className="text-ink/70">{r}</dt>
              <dd className="m-0"><span className="block h-2.5 rounded bg-ink/25" style={{ width: `${56 + ((i * 23) % 50)}px` }} aria-hidden="true" /></dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="flex flex-col justify-between gap-8">
        <figcaption className="ui text-[16px] text-ink/75">
          The shape of a creator profile I send to brand reps, with the details hidden. Every pitch starts with one of these.
        </figcaption>
        <div>
          <p className="ui mb-3 text-[15px] text-leaf">Brands I&apos;ve worked with</p>
          <ul className="m-0 flex list-none flex-wrap gap-x-7 gap-y-2 p-0">
            {brands.map((b) => (
              <li key={b} className="wide text-[clamp(1.5rem,3vw,2.2rem)] leading-tight">{b}</li>
            ))}
          </ul>
          <p className="ui mt-3 text-[15px] text-ink/60">and local restaurant chains</p>
        </div>
      </div>
    </figure>
  );
}
