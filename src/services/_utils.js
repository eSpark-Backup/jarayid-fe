import { VITE_BASE_URL } from "../config";

export const prepareHeaders = (headers) => {
  const token = localStorage.getItem("token");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return headers;
};

export const baseUrl = VITE_BASE_URL;
