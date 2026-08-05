import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Пароли не совпадают");
      return;
    }
    try {
      await register(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
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
          <h2 className="mb-5 font-display text-lg font-semibold">
            Регистрация
          </h2>
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
            <div>
              <label className="mb-1.5 block text-xs text-mist-400">
                Подтвердите пароль
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="field"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-lvl-3 py-2.5 font-display text-sm font-bold text-ink-950 transition hover:opacity-90"
            >
              Создать аккаунт
            </button>
          </form>
          <p className="mt-4 text-center text-xs text-mist-500">
            Уже есть аккаунт?{" "}
            <Link to="/login" className="text-accent-css hover:underline">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
