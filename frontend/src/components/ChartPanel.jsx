export default function ChartPanel({ title, children }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-4 text-base font-bold">{title}</h3>
      <div className="h-72">{children}</div>
    </section>
  );
}
