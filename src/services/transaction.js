import { apiClient } from "../lib/apiClient";

export async function dashboardService() {
  return apiClient("transactions/statistic", {
    method: "GET"
  });
}

/**
 * Fetch transactions for all users with optional filters & pagination
 * @param {Object} filters - optional filters
 * @param {string} filters.username
 * @param {string} filters.type - "deposit" | "transfer" | "withdrawal"
 * @param {string} filters.status - "PENDING" | "SUCCESS" | "FAILED"
 * @param {string} filters.fromDate - YYYY-MM-DD
 * @param {string} filters.toDate - YYYY-MM-DD
 * @param {number} filters.page
 * @param {number} filters.limit
 */
export async function fetchAllTransactions(filters = {}) {
  const query = new URLSearchParams();

  if (filters.username) query.append("username", filters.username);
  if (filters.type) query.append("type", filters.type);
  if (filters.status) query.append("status", filters.status);
  if (filters.fromDate) query.append("fromDate", filters.fromDate);
  if (filters.toDate) query.append("toDate", filters.toDate);
  if (filters.page) query.append("page", filters.page);
  if (filters.limit) query.append("limit", filters.limit);

  const url = `transactions/all?${query.toString()}`;

  return apiClient(url, { method: "GET" });
}
