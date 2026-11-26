import Link from "next/link";
import Image from "next/image";
import Rosette from "@/components/Rosette";
import CaseRow from "@/components/CaseRow";
import { caseStudies, ledger, person } from "@/lib/content";

export default function Home() {
  return (
    <div className="mx-auto max-w-page px-6 md:px-12">
      <section className="relative pb-14 pt-10 md:pb-20 md:pt-16">
        <Rosette className="pointer-events-none absolute -right-10 top-6 hidden w-[380px] md:block lg:-right-16 lg:w-[420px]" />
        <div className="relative">
          <h1 className="wide text-[clamp(3.2rem,10.5vw,7.8rem)] leading-[0.92]">
            Mustafa
            <br />
            Khan
          </h1>
          <p className="mt-8 max-w-[30ch] font-serif text-[clamp(1.45rem,2.6vw,2rem)] leading-snug">
            I bring in revenue and users for early-stage companies.
          </p>
          <p className="prose-w mt-5">
            Founder of <Link className="link" href="/work/nexus-partners">Nexus Partners</Link>, co-founder and COO of{" "}
            <Link className="link" href="/work/koba">Koba</Link>, and growth and marketing for{" "}
            <Link className="link" href="/work/philo">Philo</Link>. Before any of that, I sold solar door to door.
          </p>
          <div className="ui mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 text-[17px]">
            <a href={`mailto:${person.email}`} className="rounded-full bg-ink px-6 py-3 font-semibold text-paper no-underline transition-colors hover:bg-money">
              Email me
            </a>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-money" aria-hidden="true" />
              Open to sales, growth and go-to-market roles at startups
            </span>
          </div>
        </div>
      </section>

      <section aria-label="Results" className="border-t-2 border-ink">
        <ul className="m-0 list-none p-0">
          {ledger.map((row) => (
            <li key={row.value} className="border-b border-[color:var(--rule)]">
              <Link href={row.href ?? "#"} className="row-link -mx-4 grid items-center gap-x-8 rounded-xl gap-y-1 px-4 py-5 no-underline md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <span className="wide num text-[clamp(2.6rem,6vw,4.4rem)] leading-none text-money">{row.value}</span>
                <span className="text-[1.2rem] leading-snug">{row.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="work" className="pt-24">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 id="work" className="wide text-[clamp(2rem,4.5vw,3.2rem)] leading-none">Case studies</h2>
          <Link href="/work" className="ui link text-[17px]">All case studies</Link>
        </div>
        <div className="divide-y divide-[color:var(--rule)] border-y border-[color:var(--rule)]">
          {caseStudies.map((c) => (
            <CaseRow key={c.slug} study={c} />
          ))}
        </div>
      </section>

      <section aria-labelledby="me" className="grid items-center gap-10 pt-24 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16">
        <div className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[28px]">
          <Image src="/img/mustafa.jpg" alt="Mustafa Khan at a table by a sunlit window" fill sizes="(min-width: 768px) 420px, 100vw" className="object-cover" />
        </div>
        <div>
          <h2 id="me" className="wide mb-6 text-[clamp(2rem,4.5vw,3.2rem)] leading-none">I started on the doors</h2>
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
  );
}
