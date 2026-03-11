import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Input } from "../ui";
import { useAuthStore } from "../../stores/authStore";
import { validateLoginForm } from "../../lib/validation";
import { GoogleButton, FacebookButton } from "./SocialButtons";

export function LoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loginError, setLoginError] = useState("");

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setLoginError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(
        Object.fromEntries(
          Object.entries(validationErrors).map(([k, v]) => [k, t(v)]),
        ),
      );
      return;
    }
    const success = login(form.email, form.password);
    if (success) {
      navigate("/dashboard");
    } else {
      setLoginError(t("auth.loginError"));
    }
  };

  return (
    <div className="w-full max-w-[400px]">
      <h1 className="text-[32px] font-bold text-darkblue-100 mb-8">
        {t("auth.welcome")}
      </h1>

      <div className="bg-[#f8f9fa] p-8 rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          {loginError && (
            <div
              className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm"
              role="alert"
            >
              {loginError}
            </div>
          )}
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

          <div className="pt-2">
            <Button type="submit" className="px-10">
              {t("auth.login")}
            </Button>
          </div>

          <div className="pt-4">
            <p className=" text-lg font-bold text-darkblue-100 mb-4">
              {t("auth.orContinueWith")}
            </p>
            <div className="flex gap-4">
              <GoogleButton />
              <FacebookButton />
            </div>
          </div>
        </form>
      </div>

      <p className="text-left text-sm text-gray-500 mt-6 font-medium">
        {t("auth.noAccount")}{" "}
        <Link
          to="/signup"
          className="text-darkblue-100 hover:underline font-bold"
        >
          {t("auth.signUp")}
        </Link>
      </p>
    </div>
  );
}
