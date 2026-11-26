export default function Measure({ items }: { items: [string, string][] }) {
  return (
    <dl className="measure">
      {items.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <span className="leader" aria-hidden="true" />
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}
