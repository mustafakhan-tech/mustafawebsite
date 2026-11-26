import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20 md:px-10">
      <h1 className="mb-6 text-8xl">Page not found</h1>
      <p>That page doesn&apos;t exist. Try the <Link href="/work">work</Link> or go <Link href="/">home</Link>.</p>
    </div>
  );
}
