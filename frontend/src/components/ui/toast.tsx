"use client"

import { toast as hotToast } from "react-hot-toast"

export const toast = {
  success: (message: string) =>
    hotToast.success(message, {
      duration: 4000,
      style: {
        background: "#10B981",
        color: "#fff",
      },
    }),
  error: (message: string) =>
    hotToast.error(message, {
      duration: 4000,
      style: {
        background: "#EF4444",
        color: "#fff",
      },
    }),
  loading: (message: string) => hotToast.loading(message),
}
