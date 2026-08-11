import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import Breadcrumbs from "./Breadcrumbs";
import ErrorBoundary from "./ErrorBoundary";

const navItems = [
  { to: "/", label: "Разделы", end: true },
  { to: "/review", label: "Повторение" },
  { to: "/tasks", label: "Задачи" },
  { to: "/react-trainer", label: "⚛️ Тренажёр" },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const { stats } = useProgress();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-ink-600 bg-ink-900/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-center justify-between gap-3 py-3">
            <Link
              to="/"
              className="font-display text-lg font-bold tracking-tight"
            >
              <span className="text-accent-css">&lt;/&gt;</span> Repetitions of
              <span className="text-accent-html"> questions</span>
            </Link>

            <nav className="flex gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-ink-700 text-accent-css"
                        : "text-mist-400 hover:bg-ink-800 hover:text-mist-100"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {stats.due > 0 && (
                <Link
                  to="/review"
                  className="rounded-full border border-lvl-0/50 bg-lvl-0/10 px-3 py-1 font-mono text-xs text-lvl-0 transition hover:bg-lvl-0/20"
                >
                  🔔 {stats.due} к повтору
                </Link>
              )}
              <span className="hidden max-w-[180px] truncate text-xs text-mist-500 sm:block">
                {user?.email}
              </span>
              <button
                onClick={logout}
                className="text-xs font-medium text-mist-400 transition hover:text-lvl-0"
              >
                выйти
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Breadcrumbs />
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>

      <footer className="mx-auto max-w-6xl px-4 pb-8 pt-4">
        <p className="font-mono text-xs text-mist-500">
          // отвечай вслух → сверяйся → оценивай себя честно
        </p>
      </footer>
    </div>
  );
}
