import Link from "next/link";
import KnockButton from "./KnockButton";

const nav = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
];

export default function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-6 md:px-10">
      <Link href="/" className="font-display text-3xl font-extrabold uppercase no-underline">
        M. Khan
      </Link>
      <nav aria-label="Main" className="flex items-center gap-5 md:gap-8">
        {nav.map((n) => (
          <Link key={n.href} href={n.href} className="font-display text-2xl font-bold uppercase no-underline hover:underline">
            {n.label}
          </Link>
        ))}
        <span className="hidden md:inline-block">
          <KnockButton label="Knock" />
        </span>
      </nav>
    </header>
  );
}
