import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Неверный email или пароль");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <p className="mb-6 text-center font-display text-xl font-bold">
          <span className="text-accent-css">&lt;/&gt;</span> frontend
          <span className="text-accent-html">review</span>
        </p>
        <div className="card p-6">
          <h2 className="mb-5 font-display text-lg font-semibold">Вход</h2>
          {error && (
            <p className="mb-4 rounded-lg border border-lvl-0/40 bg-lvl-0/10 px-3 py-2 text-xs text-lvl-0">
              {error}
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs text-mist-400">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="field"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs text-mist-400">
                Пароль
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="field"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-accent-css py-2.5 font-display text-sm font-bold text-ink-950 transition hover:opacity-90"
            >
              Войти
            </button>
          </form>
          <p className="mt-4 text-center text-xs text-mist-500">
            Нет аккаунта?{" "}
            <Link to="/register" className="text-accent-css hover:underline">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
