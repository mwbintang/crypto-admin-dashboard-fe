import { apiClient } from "../lib/apiClient";

export async function loginService(data) {
  return apiClient("users/login", {
    method: "POST",
    body: data
  });
}