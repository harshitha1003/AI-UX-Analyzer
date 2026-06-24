export default function StatCard({ label, value, tone = "blue", icon: Icon }) {
  const tones = {
    blue: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-200",
    green: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200",
    red: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-200",
    amber: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-200",
  };
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
        </div>
        {Icon && (
          <div className={`grid h-11 w-11 place-items-center rounded-lg ${tones[tone]}`}>
            <Icon size={20} />
          </div>
        )}
      </div>
    </section>
  );
}
