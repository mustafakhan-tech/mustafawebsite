import Link from "next/link";
import Image from "next/image";
import CaseRow from "@/components/CaseRow";
import ProjectRow from "@/components/ProjectRow";
import Deck, { type DeckPage } from "@/components/Deck";
import TravelGlobe from "@/components/TravelGlobe";
import PostcardWall from "@/components/PostcardWall";
import { caseStudies, ledger, person, projects } from "@/lib/content";
import { clips, photos } from "@/lib/travel";

const postcardIds = ["q055", "p094", "q121", "p089", "q087", "p070", "p043", "q111", "p113", "q018", "p125", "p050", "q139", "p068", "q012"];
const postcards = postcardIds.map((id) => photos.find((p) => p.id === id)).filter((p): p is (typeof photos)[number] => Boolean(p));

const h2 = "wide text-[clamp(2rem,4.5vw,3.4rem)] leading-none";

const pages: DeckPage[] = [
  {
    id: "intro",
    label: "Intro",
    content: (
      <div className="mt-auto">
        <h1 className="wide text-[clamp(3.4rem,11vw,9.5rem)] leading-[0.9] [text-shadow:0_4px_40px_rgba(0,0,0,0.45)]">
          Mustafa
          <br />
          Khan
        </h1>
        <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 max-w-[34ch] font-serif text-[clamp(1.3rem,2.4vw,1.75rem)] leading-snug">I bring in revenue, users and partnerships.</p>
            <p className="ui mb-0 flex items-center gap-2 text-[15px] text-white/80">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-money" aria-hidden="true" />
              Open to sales, growth, partnerships and go-to-market roles
            </p>
          </div>
          <div className="ui flex flex-wrap items-center gap-3 text-[16px]">
            <a href={`mailto:${person.email}`} className="rounded-full bg-white px-6 py-3 font-semibold text-black no-underline transition-colors hover:bg-money">Email me</a>
            <a href="#numbers" className="rounded-full border border-white/50 px-6 py-3 font-semibold no-underline backdrop-blur-sm transition-colors hover:border-white">Turn the page</a>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "numbers",
    label: "Numbers",
    content: (
      <>
        <h2 className={`${h2} mb-8`}>By the numbers</h2>
        <ul className="m-0 list-none border-t border-white/40 p-0">
          {ledger.map((row) => (
            <li key={row.value} className="border-b border-white/15">
              <Link href={row.href ?? "#"} className="row-link -mx-4 grid items-center gap-x-8 gap-y-1 rounded-xl px-4 py-4 no-underline md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <span className="wide num text-[clamp(2.3rem,5.4vw,4rem)] leading-none text-money">{row.value}</span>
                <span className="text-[1.15rem] leading-snug">{row.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: "work",
    label: "Case studies",
    content: (
      <>
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className={h2}>Case studies</h2>
          <Link href="/work" className="ui link text-[16px]">All case studies</Link>
        </div>
        <div className="divide-y divide-white/15 border-y border-white/15">
          {caseStudies.map((c) => <CaseRow key={c.slug} study={c} />)}
        </div>
      </>
    ),
  },
  {
    id: "projects",
    label: "Projects",
    content: (
      <>
        <div className="mb-2 flex items-end justify-between gap-4">
          <h2 className={h2}>Projects</h2>
          <Link href="/projects" className="ui link text-[16px]">All projects</Link>
        </div>
        <div className="divide-y divide-white/15 border-b border-white/15">
          {projects.slice(0, 3).map((p) => <ProjectRow key={p.name} project={p} />)}
        </div>
      </>
    ),
  },
  {
    id: "travel",
    label: "Where I've been",
    content: (
      <>
        <h2 className={`${h2} mb-3`}>Where I&apos;ve been</h2>
        <p className="prose-w mb-6 text-[1.1rem] text-white/80">Nexus Partners manages creators on six continents. I&apos;ve been to four of them myself.</p>
        <TravelGlobe photos={photos} />
      </>
    ),
  },
  {
    id: "postcards",
    label: "Postcards",
    content: (
      <>
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <h2 className={h2}>Postcards</h2>
          <p className="ui mb-0 text-[15px] text-white/75">Drag them around. Tap one to flip it over.</p>
        </div>
        <PostcardWall photos={postcards} />
      </>
    ),
  },
  {
    id: "contact",
    label: "Say hi",
    content: (
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-14">
        <div className="relative hidden aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-[28px] md:block">
          <Image src="/img/mustafa.jpg" alt="Mustafa Khan at a table by a sunlit window" fill sizes="340px" className="object-cover" />
        </div>
        <div>
          <h2 className={`${h2} mb-5`}>I started on the doors</h2>
          <p className="prose-w text-white/85">
            My first sales job was knocking on doors for Firefly Solar. I sold more than $2M in solar in my first six months and went from setting appointments to closing deals in under a month. I took the same approach into creator deals, app growth and a startup of my own.
          </p>
          <p className="ui mb-2 mt-8 text-[16px] text-money">Have a role or a deal in mind?</p>
          <a href={`mailto:${person.email}`} className="wide block text-[clamp(1.4rem,3.4vw,2.6rem)] leading-[1.1] no-underline hover:text-money">khan11mustafa<wbr />@gmail.com</a>
          <ul className="ui mt-6 flex list-none flex-wrap gap-x-7 gap-y-2 p-0 text-[16px]">
            {person.links.map((l) => (
              <li key={l.href}><a className="link" href={l.href} rel="noopener noreferrer" target="_blank">{l.label}</a></li>
            ))}
            <li><Link className="link" href="/about">About me</Link></li>
          </ul>
        </div>
      </div>
    ),
  },
];

export default function Home() {
  return <Deck pages={pages} clips={clips} />;
}
