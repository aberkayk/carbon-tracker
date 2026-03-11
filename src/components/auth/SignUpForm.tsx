import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Input, Checkbox } from "../ui";
import { useAuthStore } from "../../stores/authStore";
import { validateSignUpForm } from "../../lib/validation";
import { GoogleButton, FacebookButton } from "./SocialButtons";

export function SignUpForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const signUp = useAuthStore((s) => s.signUp);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateSignUpForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(
        Object.fromEntries(
          Object.entries(validationErrors).map(([k, v]) => [k, t(v)]),
        ),
      );
      return;
    }
    signUp({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
    });
    navigate("/dashboard");
  };

  return (
    <div className="w-full max-w-[400px]">
      <h1 className="text-[32px] font-bold text-darkblue-100 mb-8">
        {t("auth.createAccount")}
      </h1>

      <div className="bg-[#f8f9fa] p-8 rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              placeholder={t("auth.firstName")}
              value={form.firstName}
              hideLabel
              onChange={(e) => handleChange("firstName", e.target.value)}
              error={errors.firstName}
            />
            <Input
              placeholder={t("auth.lastName")}
              value={form.lastName}
              hideLabel
              onChange={(e) => handleChange("lastName", e.target.value)}
              error={errors.lastName}
            />
          </div>
          <Input
            placeholder={t("auth.email")}
            type="email"
            value={form.email}
            hideLabel
            onChange={(e) => handleChange("email", e.target.value)}
            error={errors.email}
          />
          <Input
            placeholder={t("auth.password")}
            showPasswordToggle
            value={form.password}
            hideLabel
            onChange={(e) => handleChange("password", e.target.value)}
            error={errors.password}
          />

          <Checkbox
            id="terms"
            checked={form.termsAccepted}
            onChange={(e) => handleChange("termsAccepted", e.target.checked)}
            error={errors.termsAccepted}
            label={
              <p className="text-darkblue-100 leading-tight">
                I have read the{" "}
                <span className="font-bold">Terms & Conditions</span> and agree
                to them. The <span className="font-bold">privacy policy</span>{" "}
                applies.
              </p>
            }
          />

          <div className="pt-2">
            <Button type="submit" className="px-10">
              {t("auth.signUp")}
            </Button>
          </div>

          <div className="pt-4">
            <p className="text-lg font-bold text-darkblue-100 mb-4">
              {t("auth.orCreateWith")}
            </p>
            <div className="flex gap-4">
              <GoogleButton />
              <FacebookButton />
            </div>
          </div>
        </form>
      </div>

      <p className="text-left text-sm text-gray-500 mt-6 font-medium">
        {t("auth.hasAccount")}{" "}
        <Link
          to="/login"
          className="text-darkblue-100 hover:underline font-bold"
        >
          {t("auth.login")}
        </Link>
      </p>
    </div>
  );
}
