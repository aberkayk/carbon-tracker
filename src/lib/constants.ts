import type { CalculationConfig } from "../types";

export const DEFAULT_CONFIG: CalculationConfig = {
  baseCurrency: "EUR",
  basePricePerKg: 0.5,
  emissionFactor: 0.000012,
  fxRates: {
    EUR: 1,
    USD: 1.08,
    TRY: 34.5,
    GBP: 0.86,
  },
  equivalencyFactors: {
    kmDrivenPerKgCo2e: 0.12823,
    seaIceM3PerKgCo2e: 0.00008985,
    lightbulbDaysPerKgCo2e: 0.10724,
    beefKgPerKgCo2e: 0.00089883,
  },
};

export const MAX_LEGS_PER_GROUP = 15;

export const SUPPORTED_CURRENCIES = ["EUR", "USD", "TRY", "GBP"] as const;
export const SUPPORTED_LANGUAGES = ["en", "tr"] as const;

export const LANGUAGES_CONFIG = [
  { code: "en", label: "English" },
  { code: "tr", label: "Turkish" },
] as const;

export const FOOTER_LINKS = [
  { labelKey: "footer.privacyPolicy", href: "/" },
  { labelKey: "footer.termsAndConditions", href: "/" },
  { labelKey: "footer.faq", href: "/" },
  { labelKey: "footer.contact", href: "/" },
] as const;

export const NAV_LINKS = [
  { name: "WEB", labelKey: "common.nav.web" },
  { name: "TABLET", labelKey: "common.nav.tablet" },
  { name: "MOBILE", labelKey: "common.nav.mobile" },
] as const;
