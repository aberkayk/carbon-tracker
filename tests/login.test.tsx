import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./test-utils";
import { LoginForm } from "../src/components/auth/LoginForm";
import { useAuthStore } from "../src/stores/authStore";
import type { User } from "../src/types";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return { ...actual, useNavigate: () => mockNavigate };
});

const mockUser: User = {
  id: "test-1",
  firstName: "Test",
  lastName: "User",
  email: "test@example.com",
  password: "password123",
  currency: "EUR",
  language: "en",
  notificationOptIn: false,
  social: { googleConnected: false, facebookConnected: false },
};

beforeEach(() => {
  mockNavigate.mockReset();
  localStorage.clear();
  useAuthStore.setState({ user: null, isAuthenticated: false });
});

describe("Login Flow", () => {
  it("redirects to dashboard on valid credentials", async () => {
    localStorage.setItem("registered_users", JSON.stringify([mockUser]));
    const user = userEvent.setup();

    renderWithProviders(<LoginForm />);

    await user.type(
      screen.getByPlaceholderText(/email/i),
      mockUser.email,
    );
    await user.type(
      screen.getByPlaceholderText(/password/i),
      mockUser.password,
    );
    await user.click(screen.getByRole("button", { name: /^login$/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("shows alert on invalid credentials", async () => {
    localStorage.setItem("registered_users", JSON.stringify([]));
    const user = userEvent.setup();

    renderWithProviders(<LoginForm />);

    await user.type(screen.getByPlaceholderText(/email/i), "wrong@test.com");
    await user.type(screen.getByPlaceholderText(/password/i), "wrongpass");
    await user.click(screen.getByRole("button", { name: /^login$/i }));

    const alerts = await screen.findAllByRole("alert");
    expect(alerts.length).toBeGreaterThan(0);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("shows validation error when fields are empty", async () => {
    const user = userEvent.setup();

    renderWithProviders(<LoginForm />);

    // Submit without filling in any fields
    await user.click(screen.getByRole("button", { name: /^login$/i }));

    const alerts = await screen.findAllByRole("alert");
    expect(alerts.length).toBeGreaterThan(0);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
