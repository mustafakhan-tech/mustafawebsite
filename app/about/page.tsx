import type { Metadata } from "next";
import Measure from "@/components/Measure";
import { leadership, skills, quickFacts } from "@/lib/content";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:px-10">
      <h1 className="mb-12 text-7xl md:text-9xl">About</h1>
      <div className="grid gap-12 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-16">
        <div>
          <p>
            I started selling in retail, moved on to knocking doors for a solar company, and began matching YouTubers with brand sponsors. Each step was a harder room to sell in.
          </p>
          <p>
            Today I&apos;m a Computer Science student at the University of Alberta, the founder of Nexus Partners, and a co-founder of Philo and Solus. I want a role where I can sell, build partnerships and figure out go-to-market at a startup.
          </p>
          <h2 className="mb-4 mt-12 text-4xl">What I do well</h2>
          <Measure items={skills.map((s) => [s.group, s.items] as [string, string])} />
          <h2 className="mb-4 mt-12 text-4xl">Outside of work</h2>
          <ul className="m-0 list-none p-0">
            {leadership.map((l) => (
              <li key={l.role} className="mb-2">
                <span className="font-semibold">{l.role}</span>, {l.org}
              </li>
            ))}
          </ul>
        </div>
        <aside>
          <Measure items={quickFacts} />
        </aside>
      </div>
    </div>
  );
}
