import type { Metadata } from "next";
import WorkRow from "@/components/WorkRow";
import { caseStudies } from "@/lib/content";

export const metadata: Metadata = { title: "Work" };

export default function WorkIndex() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:px-10">
      <h1 className="mb-6 text-7xl md:text-9xl">Work</h1>
      <p className="mb-12">
        The companies I&apos;ve built or helped build. Each one opens into a case study. New projects get added here as I finish them.
      </p>
      {caseStudies.filter((c) => c.published).map((s) => (
        <WorkRow key={s.slug} study={s} />
      ))}
    </div>
  );
}
