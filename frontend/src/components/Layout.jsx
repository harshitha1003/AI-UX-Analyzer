import { BarChart3, Home, MessageSquareText, Moon, Upload, Lightbulb, Sun } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/analyze", label: "Analyze", icon: MessageSquareText },
  { to: "/upload", label: "Upload", icon: Upload },
  { to: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { to: "/recommendations", label: "Recommendations", icon: Lightbulb },
];

export default function Layout({ children, darkMode, onToggleDark }) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-950 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-slate-200 bg-white px-4 py-5 dark:border-slate-800 dark:bg-slate-900 lg:block">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">AI UX Analyzer</p>
          <h1 className="mt-2 text-2xl font-bold leading-tight">Feedback Intelligence</h1>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-brand text-white shadow-soft"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">Major Project</p>
              <h2 className="text-lg font-bold">AI-Powered UX Feedback Analyzer</h2>
            </div>
            <button
              type="button"
              onClick={onToggleDark}
              className="focus-ring grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              title={darkMode ? "Use light mode" : "Use dark mode"}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                    isActive ? "bg-brand text-white" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                  }`
                }
              >
                <item.icon size={16} />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
