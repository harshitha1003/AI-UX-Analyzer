import { LoaderCircle } from "lucide-react";

export default function LoadingButton({ loading, children, className = "", ...props }) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {loading && <LoaderCircle size={18} className="animate-spin" />}
      {children}
    </button>
  );
}
