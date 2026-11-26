import Link from "next/link";
import type { CaseStudy } from "@/lib/content";

export default function WorkRow({ study }: { study: CaseStudy }) {
  return (
    <Link href={`/work/${study.slug}`} className="work-row">
      <div className="grid gap-x-8 gap-y-2 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          <h3 className="row-title text-5xl md:text-6xl">{study.title}</h3>
          <p className="mt-2 italic">
            {study.role}, {study.years}
          </p>
        </div>
        <div>
          <p className="mb-2">{study.summary}</p>
          <p className="mb-0 font-semibold">{study.stage}</p>
        </div>
      </div>
    </Link>
  );
}
