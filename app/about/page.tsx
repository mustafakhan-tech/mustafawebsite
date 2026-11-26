import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { experience, firefly } from "@/lib/content";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <div className="mx-auto max-w-page px-6 pt-10 md:px-12 md:pt-16">
      <div className="grid gap-10 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-16">
        <div>
          <h1 className="wide mb-8 text-[clamp(2.8rem,8vw,6rem)] leading-none">About</h1>
          <p className="prose-w text-[1.2rem]">
            I&apos;m Mustafa. I study Computer Science at the University of Alberta, and I&apos;ve spent the last few years selling.
          </p>
          <p className="prose-w">
            I started on the doors at Firefly Solar. Then I started Nexus Partners to broker deals between creators and brands, ran growth for Philo from the day Qendrim built it, and co-founded Koba.
          </p>
          <p className="prose-w">
            I&apos;m looking for a sales, growth or go-to-market role at a startup where I can do more of the same.
          </p>
        </div>
        <div className="relative aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-[28px] md:mt-4">
          <Image src="/img/mustafa.jpg" alt="Mustafa Khan" fill priority sizes="(min-width: 768px) 420px, 100vw" className="object-cover" />
        </div>
      </div>

      <section aria-labelledby="exp" className="pt-20">
        <h2 id="exp" className="wide mb-6 text-[clamp(2rem,4.5vw,3.2rem)] leading-none">Experience</h2>
        <ul className="m-0 list-none border-t-2 border-ink p-0">
          {experience.map((e) => (
            <li key={e.org} className="grid gap-x-8 gap-y-1 border-b border-[color:var(--rule)] py-5 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
              <div>
                <h3 className="semi text-[1.3rem]">
                  {e.href ? <Link className="link" href={e.href}>{e.org}</Link> : e.org}
                </h3>
                <p className="ui mb-0 text-[16px] text-money">{e.role}, {e.when}</p>
              </div>
              {e.body && <p className="prose-w mb-0">{e.body}</p>}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="doors" className="pt-20">
        <div className="mb-6 flex flex-wrap items-center gap-5">
          <h2 id="doors" className="wide text-[clamp(2rem,4.5vw,3.2rem)] leading-none">Where I learned to sell</h2>
          <Image src="/img/firefly.jpg" alt="Firefly Solar logo" width={140} height={79} className="h-10 w-auto rounded-md" />
        </div>
        <p className="prose-w text-[1.15rem]">{firefly.intro}</p>
        <dl className="m-0 mt-8 grid gap-8 border-t-2 border-ink pt-6 md:grid-cols-3">
          {firefly.stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="m-0">
                <span className="wide num block whitespace-nowrap text-[clamp(2rem,3.8vw,3rem)] leading-none text-money">{s.value}</span>
                <span className="ui mt-2 block text-[16px]">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
        <p className="prose-w mt-8">{firefly.outro}</p>
      </section>
    </div>
  );
}
