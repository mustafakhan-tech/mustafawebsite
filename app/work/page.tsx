import type { Metadata } from "next";
import CaseRow from "@/components/CaseRow";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = { title: "Case studies" };

export default function WorkIndex() {
  return (
    <div className="mx-auto max-w-page px-6 pt-10 md:px-12 md:pt-16">
      <h1 className="wide mb-6 text-[clamp(2.8rem,8vw,6rem)] leading-none">Case studies</h1>
      <p className="prose-w mb-12 text-[1.2rem]">
        How I&apos;ve brought in revenue and users for the companies I&apos;ve built and helped build. New projects get added here as I finish them.
      </p>
      <div className="divide-y divide-[color:var(--rule)] border-y border-[color:var(--rule)]">
        {caseStudies.map((c) => (
          <CaseRow key={c.slug} study={c} />
        ))}
      </div>
    </div>
  );
}
