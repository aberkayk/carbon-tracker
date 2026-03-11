export function validateRequired(value: string): string | null {
  if (!value || value.trim() === "") return "validation.required";
  return null;
}

export function validateEmail(value: string): string | null {
  if (!value || value.trim() === "") return "validation.required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) return "validation.invalidEmail";
  return null;
}

export function validatePositiveNumber(value: number): string | null {
  if (isNaN(value)) return "validation.mustBeNumber";
  if (value <= 0) return "validation.mustBePositive";
  return null;
}

export function validateDate(value: string): string | null {
  if (!value || value.trim() === "") return "validation.required";
  const date = new Date(value);
  if (isNaN(date.getTime())) return "validation.invalidDate";
  return null;
}

export function validateFlightNo(value: string): string | null {
  if (!value || value.trim() === "") return "validation.required";
  return null;
}

export function validateGroupName(value: string): string | null {
  return validateRequired(value);
}

export function validateSignUpForm(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  termsAccepted: boolean;
}): Record<string, string> {
  const errors: Record<string, string> = {};
  const fn = validateRequired(data.firstName);
  if (fn) errors.firstName = fn;
  const ln = validateRequired(data.lastName);
  if (ln) errors.lastName = ln;
  const em = validateEmail(data.email);
  if (em) errors.email = em;
  const pw = validateRequired(data.password);
  if (pw) errors.password = pw;
  if (!data.termsAccepted) errors.termsAccepted = "validation.termsRequired";
  return errors;
}

export function validateLoginForm(data: {
  email: string;
  password: string;
}): Record<string, string> {
  const errors: Record<string, string> = {};
  const em = validateEmail(data.email);
  if (em) errors.email = em;
  const pw = validateRequired(data.password);
  if (pw) errors.password = pw;
  return errors;
}

export function validateLeg(data: {
  from: string;
  to: string;
  flightNo: string;
  date: string;
  weightKg: number;
  distanceKm: number;
}): Record<string, string> {
  const errors: Record<string, string> = {};
  const f = validateRequired(data.from);
  if (f) errors.from = f;
  const t = validateRequired(data.to);
  if (t) errors.to = t;
  const fl = validateFlightNo(data.flightNo);
  if (fl) errors.flightNo = fl;
  const d = validateDate(data.date);
  if (d) errors.date = d;
  const w = validatePositiveNumber(data.weightKg);
  if (w) errors.weightKg = w;
  const dist = validatePositiveNumber(data.distanceKm);
  if (dist) errors.distanceKm = dist;
  return errors;
}
