import type { Metadata } from "next";
import { experience, person } from "@/lib/content";

export const metadata: Metadata = { title: "Resume" };

export default function Resume() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:px-10">
      <h1 className="mb-8 text-7xl md:text-9xl">Resume</h1>
      <p>
        <a href={person.resume} download className="font-semibold">
          Download the PDF
        </a>
      </p>
      <div className="mt-10">
        {experience.map((e) => (
          <div key={e.org} className="border-t-2 border-ink py-6">
            <h2 className="text-4xl">{e.org}</h2>
            <p className="mb-2 italic">
              {e.role}, {e.when}
            </p>
            <p className="mb-0">{e.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
