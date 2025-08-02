// Configuration helper to get URLs dynamically
export const config = {
  // API URL - uses your specific Cloud Run URL
  apiUrl:
    process.env.NEXT_PUBLIC_API_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://threshold-1054224705034.us-east4.run.app"
      : "http://localhost:5000"),

  // Frontend URL - your Cloud Run URL
  frontendUrl:
    process.env.NEXT_PUBLIC_APP_URL ||
    (typeof window !== "undefined"
      ? window.location.origin
      : process.env.NODE_ENV === "production"
        ? "https://threshold-1054224705034.us-east4.run.app"
        : "http://localhost:3000"),

  // Environment
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
}

// Helper function to get the current frontend URL
export const getFrontendUrl = (): string => {
  // In browser, use window.location.origin
  if (typeof window !== "undefined") {
    return window.location.origin
  }

  // In server-side rendering, use your Cloud Run URL in production
  if (process.env.NODE_ENV === "production") {
    return "https://threshold-1054224705034.us-east4.run.app"
  }

  // Development fallback
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
}

// Helper function to get API URL
export const getApiUrl = (): string => {
  return config.apiUrl
}
