import React from "react";

export default class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="p-6 rounded-xl bg-red-950 border border-red-700 text-red-300 font-mono text-sm">
          <h2 className="text-lg font-bold mb-2">Что-то сломалось 😅</h2>
          <pre className="whitespace-pre-wrap">
            {String(this.state.error?.message || this.state.error)}
          </pre>
          <button
            onClick={() => this.setState({ error: null })}
            className="mt-4 px-4 py-2 rounded bg-red-700 text-white"
          >
            Попробовать снова
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}