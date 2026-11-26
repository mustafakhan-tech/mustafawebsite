import Link from "next/link";
import { person } from "@/lib/content";

export default function SiteFooter() {
  return (
    <footer className="mx-auto mt-24 max-w-6xl px-5 md:px-10">
      <div className="border-t-2 border-ink py-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-1 font-display text-4xl font-extrabold uppercase leading-none">Mustafa Khan</p>
          <p className="mb-0">{person.place}</p>
        </div>
        <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
          <li><a href={`mailto:${person.email}`}>{person.email}</a></li>
          <li><Link href="/resume">Resume</Link></li>
          {person.social.map((s) => (
            <li key={s.href}><a href={s.href} rel="noopener noreferrer">{s.label}</a></li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
