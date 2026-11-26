import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Measure from "@/components/Measure";
import KnockButton from "@/components/KnockButton";
import { caseStudies } from "@/lib/content";

const published = () => caseStudies.filter((c) => c.published);

export function generateStaticParams() {
  return published().map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = published().find((x) => x.slug === params.slug);
  return c ? { title: c.title, description: c.summary } : {};
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const c = published().find((x) => x.slug === params.slug);
  if (!c) notFound();
  return (
    <article className="mx-auto max-w-6xl px-5 py-10 md:px-10">
      <p className="mb-4">
        <Link href="/work">Back to work</Link>
      </p>
      <h1 className="mb-10 text-7xl md:text-[10rem] md:leading-[0.85]">{c.title}</h1>
      <div className="grid gap-12 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-16">
        <div>
          <p className="font-display text-3xl font-bold uppercase leading-tight md:text-4xl">{c.summary}</p>
          {c.sections.map((s) => (
            <section key={s.heading} className="mt-10">
              <h2 className="mb-4 text-4xl">{s.heading}</h2>
              {s.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </section>
          ))}
        </div>
        <aside>
          <Measure items={c.facts} />
          <div className="mt-10">
            <KnockButton label="Talk to me about it" />
          </div>
        </aside>
      </div>
    </article>
  );
}
