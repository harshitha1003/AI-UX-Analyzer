import { useState } from "react";
import { Download, UploadCloud } from "lucide-react";
import LoadingButton from "../components/LoadingButton.jsx";
import { exportResultsUrl, uploadFeedbackCsv } from "../services/api.js";

export default function UploadData() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleUpload(event) {
    event.preventDefault();
    if (!file) return;
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const data = await uploadFeedbackCsv(file);
      setMessage(`Uploaded and analyzed ${data.count} feedback rows.`);
    } catch (err) {
      setError(err.response?.data?.error || "Unable to upload CSV.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-bold">Upload Data</h1>
        <form className="mt-5 space-y-4" onSubmit={handleUpload}>
          <label className="flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center dark:border-slate-700 dark:bg-slate-950">
            <UploadCloud className="text-brand" size={36} />
            <span className="mt-3 font-semibold">{file ? file.name : "Choose a CSV file"}</span>
            <span className="mt-1 text-sm text-slate-500">Use a text or feedback column.</span>
            <input type="file" accept=".csv" className="sr-only" onChange={(event) => setFile(event.target.files?.[0] || null)} />
          </label>
          {message && <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-950 dark:text-emerald-200">{message}</p>}
          {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:bg-rose-950 dark:text-rose-200">{error}</p>}
          <div className="flex flex-wrap gap-3">
            <LoadingButton loading={loading} type="submit" disabled={!file}>Upload and analyze</LoadingButton>
            <a href={exportResultsUrl} className="focus-ring inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-3 font-semibold hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800">
              <Download size={18} /> Export results
            </a>
          </div>
        </form>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-xl font-bold">Sample CSV Format</h2>
        <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-100">{`source,text
app_review,The app is slow and crashes.
survey,The navigation labels are unclear.`}</pre>
      </section>
    </div>
  );
}
