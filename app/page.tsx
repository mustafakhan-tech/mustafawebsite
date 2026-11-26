import Link from "next/link";
import ChalkUnderline from "@/components/ChalkUnderline";
import KnockButton from "@/components/KnockButton";
import Measure from "@/components/Measure";
import WorkRow from "@/components/WorkRow";
import Heading from "@/components/Heading";
import { caseStudies, experience, quickFacts } from "@/lib/content";

export default function Home() {
  const studies = caseStudies.filter((c) => c.published);
  return (
    <div className="mx-auto max-w-6xl px-5 md:px-10">
      <section className="pb-16 pt-6 md:pb-24 md:pt-12">
        <h1 className="text-[clamp(5.5rem,25vw,17rem)] leading-[0.82]">
          <span className="block">Mustafa</span>
          <span className="relative inline-block">
            Khan
            <ChalkUnderline />
          </span>
        </h1>
        <div className="mt-14 grid gap-12 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-16">
          <div>
            <p className="font-display text-4xl font-bold uppercase leading-[1.02] md:text-5xl">
              Sales, partnerships and go-to-market. I learned it at the door.
            </p>
            <p className="mt-6">
              I&apos;ve sold solar door to door, suits in retail stores, and sponsorships for YouTubers. Now I run
              partnerships and go-to-market for startups I help build.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <KnockButton />
              <p className="mb-0 flex items-center gap-2">
                <span className="inline-block h-3 w-3 shrink-0 rounded-full bg-pin" aria-hidden="true" />
                Open to sales, marketing and go-to-market roles at startups.
              </p>
            </div>
          </div>
          <Measure items={quickFacts} />
        </div>
      </section>

      <section aria-labelledby="work" className="py-12">
        <Heading id="work">Work</Heading>
        <div>
          {studies.map((s) => (
            <WorkRow key={s.slug} study={s} />
          ))}
        </div>
        <p className="mt-6">
          <Link href="/work">All work and case studies</Link>
        </p>
      </section>

      <section aria-labelledby="sell" className="py-12">
        <Heading id="sell">Where I learned to sell</Heading>
        <div className="grid gap-8 md:grid-cols-3">
          {experience.map((e) => (
            <div key={e.org} className="border-t-2 border-ink pt-4">
              <h3 className="text-4xl">{e.org}</h3>
              <p className="mb-3 italic">
                {e.role}, {e.when}
              </p>
              <p className="mb-0">{e.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
