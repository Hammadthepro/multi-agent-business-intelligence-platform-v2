const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(p: string) => request<T>(p),
  post: <T>(p: string, body: unknown) =>
    request<T>(p, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(p: string, body: unknown) =>
    request<T>(p, { method: "PUT", body: JSON.stringify(body) }),
  del: <T>(p: string) => request<T>(p, { method: "DELETE" }),
};

// Domain endpoints — backend implementation lives in a separate FastAPI service.
export const endpoints = {
  marketResearch: (payload: unknown) => api.post("/agents/market-research", payload),
  competitors: (payload: unknown) => api.post("/agents/competitors", payload),
  leads: (params: string) => api.get(`/agents/leads${params}`),
  websiteAudit: (payload: unknown) => api.post("/agents/website-audit", payload),
  opportunities: (payload: unknown) => api.post("/agents/opportunities", payload),
  outreach: (payload: unknown) => api.post("/agents/outreach", payload),
  reports: () => api.get("/reports"),
};
