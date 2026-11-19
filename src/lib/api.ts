import axios, { AxiosError } from "axios";

// The single Axios instance for the whole site. Every network call goes through it.
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "/api",
  timeout: 15_000,
  headers: { "Content-Type": "application/json" },
});

// Turns any failed request into one readable message for toasts and form errors.
export function apiErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as { message?: string } | undefined;
    if (data?.message) return data.message;
    if (error.code === "ECONNABORTED") return "The request took too long. Please try again.";
    if (!error.response) return "No connection. Check your internet and try again.";
  }
  return "Something went wrong. Please try again.";
}
