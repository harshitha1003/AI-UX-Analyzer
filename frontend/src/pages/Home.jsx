import { ArrowRight, BarChart3, BrainCircuit, FileText, Flame } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const features = [
    { icon: BrainCircuit, title: "BERT Sentiment", text: "Classifies feedback as positive, negative, or neutral with confidence." },
    { icon: Flame, title: "UX Issue Detection", text: "Flags navigation, performance, UI, accessibility, bug, and usability patterns." },
    { icon: BarChart3, title: "Interactive Analytics", text: "Shows sentiment mix, issue frequency, trends, and simulated heatmaps." },
    { icon: FileText, title: "CSV Workflow", text: "Uploads app reviews, survey exports, and feedback datasets for batch analysis." },
  ];

  return (
    <div className="space-y-6">
      <section className="grid gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">AI-Powered UX Feedback Analyzer</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Turn raw user comments into product decisions.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            Analyze reviews, survey answers, and CSV datasets for sentiment, UX problem categories, and actionable recommendations.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/analyze" className="focus-ring inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-3 font-semibold text-white hover:bg-blue-700">
              Analyze feedback <ArrowRight size={18} />
            </Link>
            <Link to="/dashboard" className="focus-ring inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-3 font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-slate-800">
              View dashboard
            </Link>
          </div>
        </div>
        <div className="rounded-lg bg-slate-950 p-5 text-slate-100">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-300">Live Insight</span>
            <span className="rounded bg-emerald-400/20 px-2 py-1 text-xs font-semibold text-emerald-200">High priority</span>
          </div>
          <p className="text-lg font-semibold">"The navigation is confusing and the page loads slowly."</p>
          <div className="mt-5 space-y-3">
            {["Negative sentiment: 0.91", "Navigation issue detected", "Performance issue detected"].map((item) => (
              <div key={item} className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => (
          <article key={feature.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
            <feature.icon className="text-brand" size={24} />
            <h2 className="mt-4 text-lg font-bold">{feature.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{feature.text}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
