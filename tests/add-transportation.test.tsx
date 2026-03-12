import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./test-utils";
import { AddTransportationModal } from "../src/components/transportation/AddTransportationModal";
import { useTransportStore } from "../src/stores/transportStore";
import { useAuthStore } from "../src/stores/authStore";
import type { User } from "../src/types";

const mockOnClose = vi.fn();

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
  mockOnClose.mockReset();
  localStorage.clear();
  useTransportStore.setState({ groups: [] });
  useAuthStore.setState({ user: mockUser, isAuthenticated: true });
});

describe("Add Transportation Flow", () => {
  it("saves a new group when form is submitted with valid data", async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <AddTransportationModal isOpen={true} onClose={mockOnClose} />,
    );

    await user.type(screen.getByLabelText(/^name$/i), "Business Trip");
    await user.type(screen.getByLabelText(/^from$/i), "IST");
    await user.type(screen.getByLabelText(/^to$/i), "LHR");
    await user.type(screen.getByLabelText(/flight no/i), "TK1985");
    await user.type(screen.getByLabelText(/^date$/i), "2026-03-01");
    await user.type(screen.getByLabelText(/weight/i), "80");
    await user.type(screen.getByLabelText(/distance/i), "2500");

    await user.click(screen.getByRole("button", { name: /^add$/i }));

    await waitFor(() => {
      const groups = useTransportStore.getState().groups;
      expect(groups).toHaveLength(1);
      expect(groups[0].name).toBe("Business Trip");
      expect(groups[0].legs).toHaveLength(1);
      expect(groups[0].legs[0].from).toBe("IST");
      expect(groups[0].legs[0].to).toBe("LHR");
      expect(groups[0].legs[0].distanceKm).toBe(2500);
      expect(groups[0].legs[0].weightKg).toBe(80);
    });

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calculates emission and amount on save", async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <AddTransportationModal isOpen={true} onClose={mockOnClose} />,
    );

    await user.type(screen.getByLabelText(/^name$/i), "Trip");
    await user.type(screen.getByLabelText(/^from$/i), "A");
    await user.type(screen.getByLabelText(/^to$/i), "B");
    await user.type(screen.getByLabelText(/flight no/i), "XX1");
    await user.type(screen.getByLabelText(/^date$/i), "2026-03-01");
    await user.type(screen.getByLabelText(/weight/i), "100");
    await user.type(screen.getByLabelText(/distance/i), "1000");

    await user.click(screen.getByRole("button", { name: /^add$/i }));

    await waitFor(() => {
      const leg = useTransportStore.getState().groups[0].legs[0];
      // emissionKg = 1000 * 100 * 0.000012 = 1.2
      expect(leg.emissionKg).toBeCloseTo(1.2);
      // amount = 1.2 * 0.5 * 1 (EUR fxRate) = 0.6
      expect(leg.amount).toBeCloseTo(0.6);
    });
  });

  it("shows validation errors on empty form submission", async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <AddTransportationModal isOpen={true} onClose={mockOnClose} />,
    );

    await user.click(screen.getByRole("button", { name: /^add$/i }));

    await waitFor(() => {
      const alerts = screen.getAllByRole("alert");
      expect(alerts.length).toBeGreaterThan(0);
    });

    expect(mockOnClose).not.toHaveBeenCalled();
    expect(useTransportStore.getState().groups).toHaveLength(0);
  });

  it("closes without saving when cancel is clicked", async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <AddTransportationModal isOpen={true} onClose={mockOnClose} />,
    );

    await user.type(screen.getByLabelText(/^name$/i), "Some Trip");
    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(mockOnClose).toHaveBeenCalled();
    expect(useTransportStore.getState().groups).toHaveLength(0);
  });
});
