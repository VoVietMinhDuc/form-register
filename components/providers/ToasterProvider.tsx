"use client";

import { Toaster } from "react-hot-toast";

export const ToasterProvider = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "#121212",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.1)",
        },
        success: {
          style: { borderColor: "#22c55e" },
        },
        error: {
          style: { borderColor: "#ef4444" },
        },
      }}
    />
  );
};

