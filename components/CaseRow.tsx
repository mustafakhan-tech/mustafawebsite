import Link from "next/link";
import type { CaseStudy } from "@/lib/content";
import LogoTile from "./LogoTile";

export default function CaseRow({ study }: { study: CaseStudy }) {
  return (
    <div>
    <Link href={`/work/${study.slug}`} className="row-link group -mx-4 grid grid-cols-[64px_1fr] items-center gap-x-5 gap-y-3 rounded-xl px-4 py-6 my-1 no-underline md:grid-cols-[88px_1fr_auto] md:gap-x-8">
      <LogoTile study={study} />
      <div>
        <h3 className="semi text-[1.7rem] leading-tight group-hover:underline group-hover:decoration-money group-hover:decoration-2 group-hover:underline-offset-4">{study.name}</h3>
        <p className="ui mb-1 text-[16px] text-money">{study.role}, {study.when}</p>
        <p className="mb-0 max-w-[48ch]">{study.oneLiner}</p>
      </div>
      <div className="col-span-2 md:col-span-1 md:text-right">
        <p className="wide num mb-0 text-[2.6rem] leading-none md:text-[3.2rem]">{study.keyStat.value}</p>
        <p className="ui mb-0 text-[16px] text-ink/75">{study.keyStat.label}</p>
      </div>
    </Link>
    </div>
  );
}
