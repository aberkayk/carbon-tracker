import { describe, it, expect } from "vitest";
import {
  validateRequired,
  validateEmail,
  validatePositiveNumber,
  validateDate,
  validateGroupName,
  validateSignUpForm,
  validateLoginForm,
  validateLeg,
} from "./validation";

describe("validateRequired", () => {
  it("returns error for empty string", () => {
    expect(validateRequired("")).toBe("validation.required");
  });
  it("returns error for whitespace only", () => {
    expect(validateRequired("   ")).toBe("validation.required");
  });
  it("returns null for valid value", () => {
    expect(validateRequired("hello")).toBeNull();
  });
});

describe("validateEmail", () => {
  it("returns error for empty string", () => {
    expect(validateEmail("")).toBe("validation.required");
  });
  it("returns error for invalid format", () => {
    expect(validateEmail("notanemail")).toBe("validation.invalidEmail");
    expect(validateEmail("missing@tld")).toBe("validation.invalidEmail");
  });
  it("returns null for valid email", () => {
    expect(validateEmail("user@example.com")).toBeNull();
  });
});

describe("validatePositiveNumber", () => {
  it("returns error for NaN", () => {
    expect(validatePositiveNumber(NaN)).toBe("validation.mustBeNumber");
  });
  it("returns error for zero", () => {
    expect(validatePositiveNumber(0)).toBe("validation.mustBePositive");
  });
  it("returns error for negative", () => {
    expect(validatePositiveNumber(-5)).toBe("validation.mustBePositive");
  });
  it("returns null for positive number", () => {
    expect(validatePositiveNumber(1)).toBeNull();
    expect(validatePositiveNumber(999)).toBeNull();
  });
});

describe("validateDate", () => {
  it("returns error for empty string", () => {
    expect(validateDate("")).toBe("validation.required");
  });
  it("returns error for invalid date", () => {
    expect(validateDate("not-a-date")).toBe("validation.invalidDate");
  });
  it("returns null for valid date", () => {
    expect(validateDate("2026-03-01")).toBeNull();
  });
});

describe("validateGroupName", () => {
  it("returns error for empty name", () => {
    expect(validateGroupName("")).toBe("validation.required");
  });
  it("returns null for valid name", () => {
    expect(validateGroupName("Business Trip")).toBeNull();
  });
});

describe("validateSignUpForm", () => {
  const valid = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: "secret",
    termsAccepted: true,
  };

  it("returns no errors for valid form", () => {
    expect(validateSignUpForm(valid)).toEqual({});
  });

  it("returns error when terms not accepted", () => {
    const errors = validateSignUpForm({ ...valid, termsAccepted: false });
    expect(errors.termsAccepted).toBe("validation.termsRequired");
  });

  it("returns errors for all empty required fields", () => {
    const errors = validateSignUpForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      termsAccepted: false,
    });
    expect(Object.keys(errors).length).toBeGreaterThanOrEqual(4);
  });
});

describe("validateLoginForm", () => {
  it("returns no errors for valid form", () => {
    expect(validateLoginForm({ email: "a@b.com", password: "pass" })).toEqual(
      {},
    );
  });

  it("returns errors for empty fields", () => {
    const errors = validateLoginForm({ email: "", password: "" });
    expect(errors.email).toBeDefined();
    expect(errors.password).toBeDefined();
  });
});

describe("validateLeg", () => {
  const valid = {
    from: "IST",
    to: "LHR",
    flightNo: "TK1985",
    date: "2026-03-01",
    weightKg: 80,
    distanceKm: 2500,
  };

  it("returns no errors for valid leg", () => {
    expect(validateLeg(valid)).toEqual({});
  });

  it("returns errors for all empty/invalid fields", () => {
    const errors = validateLeg({
      from: "",
      to: "",
      flightNo: "",
      date: "",
      weightKg: 0,
      distanceKm: -1,
    });
    expect(errors.from).toBeDefined();
    expect(errors.to).toBeDefined();
    expect(errors.flightNo).toBeDefined();
    expect(errors.date).toBeDefined();
    expect(errors.weightKg).toBeDefined();
    expect(errors.distanceKm).toBeDefined();
  });
});
