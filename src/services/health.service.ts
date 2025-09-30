const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

export async function checkHealth(): Promise<"healthy" | "warning" | "error"> {
  try {
    const r = await fetch(`${API_BASE}/health/`);
    return r.ok ? "healthy" : "warning";
  } catch {
    return "error";
  }
}