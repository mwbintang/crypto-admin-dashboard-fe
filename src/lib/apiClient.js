import { API_BASE_URL } from "./constants/env";

export async function apiClient(
  endpoint,
  { method = "GET", body, headers = {}, token, ...options } = {}
) {
  const finalHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };

  const authToken = token || localStorage.getItem("token");
  if (authToken) finalHeaders["Authorization"] = `Bearer ${authToken}`;

  const config = {
    method,
    headers: finalHeaders,
    ...options,
  };

  if (body) config.body = typeof body === "string" ? body : JSON.stringify(body);

  const res = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!res.ok) {
    let errorMsg = `API error: ${res.status} ${res.statusText}`;
    try {
      const errData = await res.json();
      errorMsg = errData.message || errorMsg;
    } catch {}
    throw new Error(errorMsg);
  }

  return res.json();
}
