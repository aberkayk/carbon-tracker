import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import type { ReactNode } from "react";

export function GuestRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}
