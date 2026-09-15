import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProgress } from "../context/ProgressContext";
import Breadcrumbs from "./Breadcrumbs";
import ErrorBoundary from "./ErrorBoundary";

const navItems = [
  { to: "/", label: "Разделы", icon: "📚", end: true },
  { to: "/review", label: "Повторение", icon: "🔁" },
  { to: "/tasks", label: "Задачи", icon: "💻" },
  { to: "/react-trainer", label: "React Тренажёр", icon: "⚛️" },
  { to: "/ts-trainer", label: "TS Тренажёр", icon: "🔷" },
  { to: "/interview", label: "Интервью", icon: "🎤" },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const { stats } = useProgress();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Закрывать меню при переходе на другую страницу
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Блокировать скролл фона, когда меню открыто
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
      isActive
        ? "bg-ink-700 text-accent-css"
        : "text-mist-300 hover:bg-ink-800 hover:text-mist-100"
    }`;

  return (
    <div className="min-h-screen">
      {/* ═══════════ HEADER ═══════════ */}
      <header className="sticky top-0 z-40 border-b border-ink-600 bg-ink-900/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4">
          {/* ─── Мобильная шапка (< md) ─── */}
          <div className="flex items-center justify-between py-3 md:hidden">
            <Link
              to="/"
              className="font-display text-base font-bold tracking-tight"
            >
              <span className="text-accent-css">&lt;/&gt;</span> Repetitions
            </Link>

            <div className="flex items-center gap-2">
              {stats.due > 0 && (
                <Link
                  to="/review"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-lvl-0/50 bg-lvl-0/10 font-mono text-xs text-lvl-0"
                  aria-label={`${stats.due} вопросов к повтору`}
                >
                  {stats.due}
                </Link>
              )}

              {/* Бургер-кнопка */}
              <button
                onClick={() => setMenuOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-600 text-mist-300 transition hover:border-mist-400 hover:text-mist-100"
                aria-label="Открыть меню"
                aria-expanded={menuOpen}
              >
                {/* Иконка бургера */}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M3 5h14M3 10h14M3 15h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* ─── Десктопная шапка (≥ md) ─── */}
          <div className="hidden flex-wrap items-center justify-between gap-3 py-3 md:flex">
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
              <span className="hidden max-w-[180px] truncate text-xs text-mist-500 lg:block">
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

      {/* ═══════════ МОБИЛЬНОЕ МЕНЮ ═══════════ */}
      {/* Оверлей */}
      <div
        className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Панель */}
      <aside
        className={`fixed inset-y-0 right-0 z-50 flex w-[85%] max-w-[320px] flex-col border-l border-ink-600 bg-ink-850 transition-transform duration-300 ease-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Заголовок панели */}
        <div className="flex items-center justify-between border-b border-ink-600 px-4 py-4">
          <span className="font-display text-sm font-bold">
            <span className="text-accent-css">&lt;/&gt;</span> Меню
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-600 text-mist-400 transition hover:border-mist-400 hover:text-mist-100"
            aria-label="Закрыть меню"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M4 4l10 10M14 4L4 14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Бейдж повторов */}
        {stats.due > 0 && (
          <Link
            to="/review"
            className="mx-4 mt-4 flex items-center justify-between rounded-lg border border-lvl-0/40 bg-lvl-0/10 px-4 py-3 text-sm font-medium text-lvl-0"
          >
            <span>🔔 Пора повторить</span>
            <span className="font-mono font-bold">{stats.due}</span>
          </Link>
        )}

        {/* Навигация */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={navLinkClass}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Низ панели: пользователь */}
        <div className="border-t border-ink-600 p-4 pb-safe">
          <p className="mb-3 truncate text-xs text-mist-500">{user?.email}</p>
          <button
            onClick={logout}
            className="w-full rounded-lg border border-ink-600 px-4 py-2.5 text-sm font-medium text-mist-300 transition hover:border-lvl-0 hover:text-lvl-0"
          >
            Выйти из аккаунта
          </button>
        </div>
      </aside>

      {/* ═══════════ MAIN ═══════════ */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Breadcrumbs />
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>

      <footer className="mx-auto max-w-6xl px-4 pb-8 pt-4 pb-safe">
        <p className="font-mono text-xs text-mist-500">
          // отвечай вслух → сверяйся → оценивай себя честно
        </p>
      </footer>
    </div>
  );
}
