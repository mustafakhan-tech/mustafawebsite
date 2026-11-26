"use client";
import { usePathname } from "next/navigation";
import { person } from "@/lib/content";

export default function SiteFooter() {
  // The home page has its own contact page in the deck.
  if (usePathname() === "/") return null;
  return (
    <footer className="mx-auto mt-28 max-w-page px-6 md:px-12">
      <div className="border-t border-[color:var(--rule)] py-12">
        <p className="ui mb-3 text-[17px] text-money">Have a role or a deal in mind?</p>
        <a href={`mailto:${person.email}`} className="wide block break-words text-[clamp(1.6rem,5.2vw,3.6rem)] leading-[1.05] no-underline hover:text-money">
          {person.email}
        </a>
        <ul className="ui mt-8 flex list-none flex-wrap gap-x-8 gap-y-2 p-0 text-[17px]">
          {person.links.map((l) => (
            <li key={l.href}><a className="link" href={l.href} rel="noopener noreferrer" target="_blank">{l.label}</a></li>
          ))}
          <li className="text-ink/70">{person.place}</li>
        </ul>
      </div>
    </footer>
  );
}
