import Link from "next/link";
import Image from "next/image";
import CaseRow from "@/components/CaseRow";
import ProjectRow from "@/components/ProjectRow";
import HeroReel from "@/components/HeroReel";
import TravelGlobe from "@/components/TravelGlobe";
import PostcardWall from "@/components/PostcardWall";
import { caseStudies, ledger, person, projects } from "@/lib/content";
import { clips, photos } from "@/lib/travel";

const postcardIds = ["q055", "p094", "q121", "p089", "q087", "p070", "p043", "q111", "p113", "q018", "p125", "p050", "q139", "p068", "q012"];
const postcards = postcardIds.map((id) => photos.find((p) => p.id === id)).filter((p): p is (typeof photos)[number] => Boolean(p));

const h2 = "wide text-[clamp(2rem,4.5vw,3.2rem)] leading-none";

export default function Home() {
  return (
    <>
      <section aria-label="Intro" className="relative -mt-20 h-[100svh] min-h-[620px] overflow-hidden bg-black text-white">
        <HeroReel clips={clips} />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-page px-6 pb-24 md:px-12 md:pb-14">
          <h1 className="wide text-[clamp(3.4rem,11vw,9.5rem)] leading-[0.9] [text-shadow:0_4px_40px_rgba(0,0,0,0.45)]">
            Mustafa
            <br />
            Khan
          </h1>
          <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <p className="mb-0 max-w-[34ch] font-serif text-[clamp(1.3rem,2.4vw,1.75rem)] leading-snug">
              I bring in revenue, users and partnerships.
            </p>
            <div className="ui flex flex-wrap items-center gap-4 text-[16px]">
              <a href={`mailto:${person.email}`} className="rounded-full bg-white px-6 py-3 font-semibold text-black no-underline transition-colors hover:bg-money">
                Email me
              </a>
              <a href="#work" className="rounded-full border border-white/50 px-6 py-3 font-semibold no-underline backdrop-blur-sm transition-colors hover:border-white">
                See my work
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-page px-6 md:px-12">
        <section aria-label="Results" className="pt-20">
          <p className="ui mb-6 flex items-center gap-2 text-[16px] text-ink/75">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-money" aria-hidden="true" />
            Open to sales, growth, partnerships and go-to-market roles
          </p>
          <ul className="m-0 list-none border-t border-ink/40 p-0">
            {ledger.map((row) => (
              <li key={row.value} className="border-b border-[color:var(--rule)]">
                <Link href={row.href ?? "#"} className="row-link -mx-4 grid items-center gap-x-8 gap-y-1 rounded-xl px-4 py-5 no-underline md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                  <span className="wide num text-[clamp(2.6rem,6vw,4.4rem)] leading-none text-money">{row.value}</span>
                  <span className="text-[1.2rem] leading-snug">{row.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section id="work" aria-labelledby="work-h" className="scroll-mt-8 pt-24">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 id="work-h" className={h2}>Case studies</h2>
            <Link href="/work" className="ui link text-[17px]">All case studies</Link>
          </div>
          <div className="divide-y divide-[color:var(--rule)] border-y border-[color:var(--rule)]">
            {caseStudies.map((c) => <CaseRow key={c.slug} study={c} />)}
          </div>
        </section>

        <section aria-labelledby="globe-h" className="pt-28">
          <h2 id="globe-h" className={`${h2} mb-4`}>Where I&apos;ve been</h2>
          <p className="prose-w mb-10 text-[1.15rem] text-ink/80">
            Nexus Partners manages creators on six continents. I&apos;ve been to four of them myself.
          </p>
          <TravelGlobe photos={photos} />
        </section>

        <section aria-labelledby="projects" className="pt-28">
          <div className="mb-2 flex items-end justify-between gap-4">
            <h2 id="projects" className={h2}>Projects</h2>
            <Link href="/projects" className="ui link text-[17px]">All projects</Link>
          </div>
          <div className="divide-y divide-[color:var(--rule)] border-b border-[color:var(--rule)]">
            {projects.slice(0, 3).map((p) => <ProjectRow key={p.name} project={p} />)}
          </div>
        </section>

        <section aria-labelledby="postcards-h" className="pt-28">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <h2 id="postcards-h" className={h2}>Postcards</h2>
            <p className="ui mb-0 text-[16px] text-ink/70">Drag them around. Tap one to flip it over.</p>
          </div>
          <PostcardWall photos={postcards} />
        </section>

        <section aria-labelledby="me" className="grid items-center gap-10 pt-28 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
          <div className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[28px]">
            <Image src="/img/mustafa.jpg" alt="Mustafa Khan at a table by a sunlit window" fill sizes="(min-width: 768px) 420px, 100vw" className="object-cover" />
          </div>
          <div>
            <h2 id="me" className={`${h2} mb-6`}>I started on the doors</h2>
            <p className="prose-w">
              My first sales job was knocking on doors for Firefly Solar. I sold more than $2M in solar in my first six months and went from setting appointments to closing deals in under a month.
            </p>
            <p className="prose-w">
              I took the same approach into creator deals, app growth and a startup of my own. I study a market, find the people who need the thing, and close.
            </p>
            <Link href="/about" className="ui link text-[17px]">More about me</Link>
          </div>
        </section>
      </div>
    </>
  );
}
