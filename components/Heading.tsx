export default function Heading({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="mb-8 text-5xl md:text-7xl">
      {children}
    </h2>
  );
}
