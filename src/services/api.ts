const API_BASE = import.meta.env.VITE_API_BASE || "/api";

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API Error: ${res.status} ${res.statusText} - ${errorText}`);
  }
  return res.json() as Promise<T>;
}