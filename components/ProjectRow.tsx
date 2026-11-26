import type { Project } from "@/lib/content";

export default function ProjectRow({ project }: { project: Project }) {
  return (
    <article className="grid gap-x-8 gap-y-4 py-8 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
      <div>
        <h3 className="semi text-[1.7rem] leading-tight">{project.name}</h3>
        <p className="ui mb-3 text-[16px] text-money">{project.role}, {project.year}</p>
        <p className="prose-w">{project.summary}</p>
        <ul className="ui m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 text-[17px]">
          {project.links.map((l) => (
            <li key={l.href}>
              <a className="link" href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
            </li>
          ))}
        </ul>
      </div>
      {project.stat && (
      <div className="md:text-right">
        <p className="wide num mb-1 text-[2.6rem] leading-none text-money md:text-[3.2rem]">{project.stat.value}</p>
        <p className="ui mb-0 text-[16px] text-ink/75 md:ml-auto md:max-w-[30ch]">{project.stat.label}</p>
      </div>
      )}
    </article>
  );
}
