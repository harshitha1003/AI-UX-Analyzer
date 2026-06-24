import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Lightbulb } from "lucide-react";
import { getRecommendations } from "../services/api.js";

export default function Recommendations() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getRecommendations().then(setItems).catch((err) => setError(err.response?.data?.error || "Unable to load recommendations."));
  }, []);

  const priorityStyles = {
    High: "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-200",
    Medium: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-200",
    Low: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200",
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold">Recommendations</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">AI-generated UX actions grouped by feedback and priority.</p>
      </div>
      {error && <p className="rounded-lg bg-rose-50 p-4 text-rose-700 dark:bg-rose-950 dark:text-rose-200">{error}</p>}
      {!error && !items.length && <p className="rounded-lg bg-white p-5 shadow-soft dark:bg-slate-900">No recommendations yet. Analyze feedback or upload a CSV first.</p>}
      <section className="grid gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <article key={item.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="text-brand" size={20} />
                <h2 className="font-bold">{item.category}</h2>
              </div>
              <span className={`rounded px-2 py-1 text-xs font-bold ${priorityStyles[item.priority] || priorityStyles.Medium}`}>
                {item.priority}
              </span>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.recommendation}</p>
            <div className="mt-4 rounded-lg bg-slate-100 p-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              {item.text}
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-500">
              {item.priority === "High" ? <AlertTriangle size={15} /> : <CheckCircle2 size={15} />}
              Created {item.created_at}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
