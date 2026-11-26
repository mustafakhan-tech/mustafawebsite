import Image from "next/image";
import type { CaseStudy } from "@/lib/content";

export default function LogoTile({ study, size = "md" }: { study: CaseStudy; size?: "md" | "sm" }) {
  const box = size === "md" ? "h-16 w-16 md:h-[88px] md:w-[88px]" : "h-12 w-12";
  if (study.logo) {
    return (
      <span className={`${box} relative block overflow-hidden rounded-2xl ${study.logo.dark ? "bg-black" : "bg-mint"}`}>
        <Image src={study.logo.src} alt={study.logo.alt} fill sizes="88px" className={study.logo.dark ? "object-contain" : "object-contain p-1"} />
      </span>
    );
  }
  return (
    <span aria-hidden="true" className={`${box} flex items-center justify-center rounded-2xl bg-ink font-serif text-paper ${size === "md" ? "text-2xl md:text-3xl" : "text-xl"} italic`}>
      {study.name[0]}
    </span>
  );
}
