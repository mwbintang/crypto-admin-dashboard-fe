// env.ts
const getEnv = (key, fallback = "") => {
  const value = process.env[key];
  if (!value) {
    if (fallback !== "") return fallback;
    console.warn(`Environment variable ${key} is not set`);
  }
  return value || fallback;
};

export const API_BASE_URL = getEnv("REACT_APP_API_BASE_URL", "");