import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Button, Checkbox, Input, Card } from "../ui";
import { GoogleButton, FacebookButton } from "../auth/SocialButtons";
import { useAuthStore } from "../../stores/authStore";
import { useTransportStore } from "../../stores/transportStore";
import { SUPPORTED_CURRENCIES } from "../../lib/constants";
import { LockIconSvg, UnlockIconSvg, ChevronIconSvg } from "../../assets/icons";

interface ProfileFormProps {
  isUnlocked: boolean;
  onEditClick: () => void;
}

export function ProfileForm({ isUnlocked, onEditClick }: ProfileFormProps) {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const updateUser = useAuthStore((s) => s.updateUser);
  const logout = useAuthStore((s) => s.logout);
  const recalculateAllAmounts = useTransportStore(
    (s) => s.recalculateAllAmounts,
  );

  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    currency: "EUR",
    notificationOptIn: false,
    googleConnected: false,
    facebookConnected: false,
  });

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        currency: user.currency,
        notificationOptIn: user.notificationOptIn,
        googleConnected: user.social.googleConnected,
        facebookConnected: user.social.facebookConnected,
      });
    }
  }, [user]);

  const handleSave = () => {
    const currencyChanged = user?.currency !== form.currency;
    updateUser({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      currency: form.currency,
      notificationOptIn: form.notificationOptIn,
      social: {
        googleConnected: form.googleConnected,
        facebookConnected: form.facebookConnected,
      },
    });
    if (currencyChanged) {
      recalculateAllAmounts(form.currency);
    }
    onEditClick();
  };

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <Card className="p-6 bg-grey-50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl lg:text-2xl font-bold font-display text-darkblue-100">
            {t("profile.title")}
          </h2>
          <Button variant="ghost" size="sm" onClick={onEditClick}>
            {!isUnlocked && <span>{t("common.edit")}</span>}
            {isUnlocked ? (
              <UnlockIconSvg className="size-5" />
            ) : (
              <LockIconSvg className="size-5" />
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label={t("auth.firstName")}
            value={form.firstName}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, firstName: e.target.value }))
            }
            disabled={!isUnlocked}
          />
          <Input
            label={t("auth.lastName")}
            value={form.lastName}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, lastName: e.target.value }))
            }
            disabled={!isUnlocked}
          />
          <Input
            label={t("auth.email")}
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
            disabled={!isUnlocked}
          />
          <Input
            label={t("auth.password")}
            showPasswordToggle
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
            disabled={!isUnlocked}
          />
        </div>

        <div className="mt-4 w-full sm:max-w-64">
          <label className="text-sm font-normal text-darkblue-100 block mb-1.5">
            {t("profile.currency")}
          </label>
          <div className="relative">
            <select
              value={form.currency}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, currency: e.target.value }))
              }
              disabled={!isUnlocked}
              className="w-full md:max-w-sm px-4 py-2 bg-white border-transparent rounded-xl text-sm text-darkblue-100 focus-ring appearance-none disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {SUPPORTED_CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <ChevronIconSvg className="size-4 text-darkblue-100" />
            </div>
          </div>
        </div>

        {isUnlocked && (
          <div className="flex justify-end mt-6">
            <Button variant="primary" size="md" onClick={handleSave}>
              {t("common.save")}
            </Button>
          </div>
        )}
      </Card>

      {/* Connect Card */}
      <Card className="p-6 bg-grey-50">
        <h2 className="text-xl lg:text-2xl font-bold font-display text-darkblue-100 mb-4">
          {t("profile.connect")}
        </h2>

        <p className="text-sm font-semibold text-darkblue-100 mb-3">
          {t("profile.connectSocialMedia")}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <GoogleButton
            fullWidth
            label={
              form.googleConnected
                ? t("profile.disconnectGoogle")
                : t("profile.connectGoogle")
            }
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                googleConnected: !prev.googleConnected,
              }))
            }
          />
          <FacebookButton
            fullWidth
            label={
              form.facebookConnected
                ? t("profile.disconnectFacebook")
                : t("profile.connectFacebook")
            }
            onClick={() =>
              setForm((prev) => ({
                ...prev,
                facebookConnected: !prev.facebookConnected,
              }))
            }
          />
        </div>

        <p className="text-sm font-semibold text-darkblue-100 mb-2">
          {t("profile.notificationSettings")}
        </p>
        <Checkbox
          checked={form.notificationOptIn}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              notificationOptIn: e.target.checked,
            }))
          }
          label={t("profile.notificationOptIn")}
          className="mb-6"
        />
      </Card>
      <div className="flex gap-4 flex-col md:flex-row items-start md:items-center justify-between">
        <Button
          variant="ghost-danger"
          size="sm"
          onClick={() => setShowDeleteAlert(true)}
        >
          {t("profile.deleteAccount")}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowLogoutAlert(true)}
        >
          {t("profile.logoutNow")}
        </Button>
      </div>

      <Alert
        isOpen={showLogoutAlert}
        onClose={() => setShowLogoutAlert(false)}
        onConfirm={() => {
          logout();
          setShowLogoutAlert(false);
        }}
        title={t("profile.logoutNow")}
        description={t("profile.logoutConfirm")}
        confirmLabel={t("profile.logoutNow")}
        cancelLabel={t("common.cancel")}
      />

      <Alert
        isOpen={showDeleteAlert}
        onClose={() => setShowDeleteAlert(false)}
        onConfirm={() => {
          logout();
          setShowDeleteAlert(false);
        }}
        title={t("profile.deleteAccount")}
        description={t("profile.deleteConfirm")}
        confirmLabel={t("profile.deleteAccount")}
        cancelLabel={t("common.cancel")}
        variant="danger"
      />
    </div>
  );
}
