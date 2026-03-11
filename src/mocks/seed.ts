import { seedUser, seedGroups } from "./data";

/**
 * Resets localStorage with mock data on every load.
 *
 * - Replaces "registered_users" with seedUser (keeps other users).
 * - Always overwrites "transport-storage" with seed groups.
 *
 * Login: john@example.com / password123
 */
export function seedLocalStorage() {
  // Reset registered users: keep non-seed users, always ensure seed user is present
  const existingUsers = JSON.parse(
    localStorage.getItem("registered_users") || "[]",
  ) as Array<{ email: string }>;

  const otherUsers = existingUsers.filter((u) => u.email !== seedUser.email);
  localStorage.setItem(
    "registered_users",
    JSON.stringify([seedUser, ...otherUsers]),
  );

  // Always reset transport groups to seed data
  localStorage.setItem(
    "transport-storage",
    JSON.stringify({ state: { groups: seedGroups }, version: 0 }),
  );
}
