import type { Metadata } from "next";
import ProjectRow from "@/components/ProjectRow";
import { projects } from "@/lib/content";

export const metadata: Metadata = { title: "Projects" };

export default function Projects() {
  return (
    <div className="mx-auto max-w-page px-6 pt-10 md:px-12 md:pt-16">
      <h1 className="wide mb-6 text-[clamp(2.8rem,8vw,6rem)] leading-none">Projects</h1>
      <p className="prose-w mb-10 text-[1.2rem]">Tools I&apos;ve designed and built for sales, partnerships and growth.</p>
      <div className="divide-y divide-[color:var(--rule)] border-y border-[color:var(--rule)]">
        {projects.map((p) => (
          <ProjectRow key={p.name} project={p} />
        ))}
      </div>
    </div>
  );
}
