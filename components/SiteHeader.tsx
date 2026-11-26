import Link from "next/link";
import { person } from "@/lib/content";

export default function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-page items-center justify-between gap-4 px-6 pb-4 pt-6 md:px-12">
      <Link href="/" className="semi whitespace-nowrap text-lg no-underline">
        Mustafa Khan
      </Link>
      <nav aria-label="Main" className="ui flex items-center gap-4 text-[16px] font-medium sm:gap-5 sm:text-[17px] md:gap-8">
        <Link href="/work" className="link no-underline hover:underline"><span className="sm:hidden">Work</span><span className="hidden sm:inline">Case studies</span></Link>
        <Link href="/projects" className="link no-underline hover:underline">Projects</Link>
        <Link href="/about" className="link no-underline hover:underline">About</Link>
        <a href={`mailto:${person.email}`} className="link hidden no-underline hover:underline sm:inline">Email</a>
      </nav>
    </header>
  );
}
