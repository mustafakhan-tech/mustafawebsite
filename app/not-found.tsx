import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-page px-6 py-20 md:px-12">
      <h1 className="wide mb-6 text-[clamp(2.8rem,8vw,6rem)] leading-none">Page not found</h1>
      <p>That page doesn&apos;t exist. Try the <Link className="link" href="/work">case studies</Link> or go <Link className="link" href="/">home</Link>.</p>
    </div>
  );
}
