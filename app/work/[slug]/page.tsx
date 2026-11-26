import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LogoTile from "@/components/LogoTile";
import { KobaVisual, NexusVisual } from "@/components/visuals";
import { caseStudies } from "@/lib/content";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = caseStudies.find((x) => x.slug === params.slug);
  return c ? { title: c.name, description: c.headline } : {};
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const i = caseStudies.findIndex((x) => x.slug === params.slug);
  if (i < 0) notFound();
  const c = caseStudies[i];
  const next = caseStudies[(i + 1) % caseStudies.length];

  const meta: [string, React.ReactNode][] = [
    ["Role", c.role],
    ["When", c.when],
    ["Status", c.status],
  ];
  if (c.link) meta.push(["Link", <a key="l" className="link" href={c.link.href} target="_blank" rel="noopener noreferrer">{c.link.label}</a>]);

  return (
    <article className="mx-auto max-w-page px-6 md:px-12">
      <header className="pb-10 pt-8 md:pt-12">
        <p className="ui mb-8 text-[17px]"><Link className="link" href="/work">Case studies</Link></p>
        <div className="mb-6 flex items-center gap-4">
          <LogoTile study={c} size="sm" />
          <span className="semi text-xl">{c.name}</span>
        </div>
        <h1 className="semi max-w-[22ch] text-[clamp(2.3rem,5.4vw,4.3rem)] leading-[1.04]">{c.headline}</h1>
        <p className="prose-w mt-8 text-[1.2rem]">{c.lede}</p>
        <dl className="ui mt-10 grid grid-cols-2 gap-x-8 gap-y-5 border-t-2 border-ink pt-5 text-[17px] md:grid-cols-4">
          {meta.map(([k, v]) => (
            <div key={k}>
              <dt className="text-[15px] text-money">{k}</dt>
              <dd className="m-0 font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </header>

      {c.visual === "koba" && <KobaVisual />}
      {c.visual === "nexus" && <NexusVisual />}

      <div className="mt-16 space-y-16">
        {c.blocks.map((b) => (
          <section key={b.heading} className="grid gap-6 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-12">
            <h2 className="semi text-[1.75rem] leading-tight md:text-[2rem]">{b.heading}</h2>
            <div>
              {b.kind === "text" && b.body.map((p, j) => <p key={j} className="prose-w">{p}</p>)}
              {b.kind === "list" && (
                <>
                  {b.intro && <p className="prose-w">{b.intro}</p>}
                  <ol className="m-0 mt-6 list-none space-y-0 p-0">
                    {b.items.map((it, j) => (
                      <li key={it.title} className="grid gap-x-5 border-t border-[color:var(--rule)] py-5 sm:grid-cols-[auto_1fr]">
                        {b.numbered && <span className="wide num text-[1.6rem] leading-none text-money" aria-hidden="true">{j + 1}</span>}
                        <div className={b.numbered ? "" : "sm:col-span-2"}>
                          <h3 className="semi mb-1 text-[1.25rem]">{it.title}</h3>
                          <p className="prose-w mb-0">{it.body}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </>
              )}
            </div>
          </section>
        ))}
      </div>

      <section aria-labelledby="results" className="mt-20 rounded-[28px] bg-ink px-6 py-10 text-paper md:px-10 md:py-12">
        <h2 id="results" className="semi mb-8 text-[1.75rem]">Results</h2>
        <dl className={`m-0 grid grid-cols-2 gap-x-8 gap-y-8 ${c.results.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
          {c.results.map((r) => (
            <div key={r.label}>
              <dt className="sr-only">{r.label}</dt>
              <dd className="m-0">
                <span className="wide num block text-[clamp(2rem,3.4vw,2.9rem)] leading-none text-leaf">{r.value}</span>
                <span className="ui mt-2 block text-[16px] text-paper/80">{r.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <Link href={`/work/${next.slug}`} className="row-link -mx-4 mt-16 block rounded-xl px-4 py-8 no-underline">
        <span className="ui block text-[16px] text-money">Next case study</span>
        <span className="wide block text-[clamp(2rem,5vw,3.6rem)] leading-tight">{next.name}</span>
      </Link>
    </article>
  );
}
