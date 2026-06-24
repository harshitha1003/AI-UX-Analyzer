import { useEffect, useMemo, useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Download, Frown, MessageSquare, Smile, Meh } from "lucide-react";
import ChartPanel from "../components/ChartPanel.jsx";
import HeatmapPanel from "../components/HeatmapPanel.jsx";
import StatCard from "../components/StatCard.jsx";
import { exportResultsUrl, getDashboard } from "../services/api.js";

ChartJS.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, LineElement, PointElement, Tooltip);

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getDashboard().then(setData).catch((err) => setError(err.response?.data?.error || "Unable to load dashboard."));
  }, []);

  const chartData = useMemo(() => {
    const sentiments = data?.sentiment_counts || {};
    const issues = data?.issue_counts || {};
    const trend = data?.trend || [];
    return {
      sentiment: {
        labels: ["Positive", "Negative", "Neutral"],
        datasets: [{ data: [sentiments.Positive || 0, sentiments.Negative || 0, sentiments.Neutral || 0], backgroundColor: ["#10b981", "#f43f5e", "#f59e0b"] }],
      },
      issues: {
        labels: Object.keys(issues),
        datasets: [{ label: "Issue count", data: Object.values(issues), backgroundColor: "#2563eb", borderRadius: 6 }],
      },
      trend: {
        labels: trend.map((item) => item.date),
        datasets: [
          { label: "Positive", data: trend.map((item) => item.Positive || 0), borderColor: "#10b981", backgroundColor: "#10b981", tension: 0.35 },
          { label: "Negative", data: trend.map((item) => item.Negative || 0), borderColor: "#f43f5e", backgroundColor: "#f43f5e", tension: 0.35 },
          { label: "Neutral", data: trend.map((item) => item.Neutral || 0), borderColor: "#f59e0b", backgroundColor: "#f59e0b", tension: 0.35 },
        ],
      },
    };
  }, [data]);

  if (error) return <p className="rounded-lg bg-rose-50 p-4 text-rose-700 dark:bg-rose-950 dark:text-rose-200">{error}</p>;
  if (!data) return <p className="rounded-lg bg-white p-5 shadow-soft dark:bg-slate-900">Loading dashboard...</p>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Sentiment, issue categories, trends, and UX heatmap.</p>
          {data.demo && (
            <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-950 dark:text-amber-200">
              Showing demo data because the Flask API is not reachable from this page.
            </p>
          )}
        </div>
        <a href={exportResultsUrl} className="focus-ring inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-3 font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
          <Download size={18} /> Export CSV
        </a>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Feedback" value={data.statistics.total_feedback} icon={MessageSquare} />
        <StatCard label="Positive %" value={`${data.statistics.positive_percent}%`} tone="green" icon={Smile} />
        <StatCard label="Negative %" value={`${data.statistics.negative_percent}%`} tone="red" icon={Frown} />
        <StatCard label="Neutral %" value={`${data.statistics.neutral_percent}%`} tone="amber" icon={Meh} />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <ChartPanel title="Sentiment Distribution"><Pie data={chartData.sentiment} options={{ maintainAspectRatio: false }} /></ChartPanel>
        <ChartPanel title="UX Issue Categories"><Bar data={chartData.issues} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} /></ChartPanel>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <ChartPanel title="Feedback Trend"><Line data={chartData.trend} options={{ maintainAspectRatio: false }} /></ChartPanel>
        <HeatmapPanel data={data.heatmap} />
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-4 text-lg font-bold">Recent Feedback</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="text-xs uppercase text-slate-500">
              <tr><th className="py-2">Source</th><th className="py-2">Feedback</th><th className="py-2">Created</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {data.feedback.map((item) => (
                <tr key={item.id}>
                  <td className="py-3 font-medium">{item.source}</td>
                  <td className="py-3 text-slate-600 dark:text-slate-300">{item.text}</td>
                  <td className="py-3 text-slate-500">{item.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
