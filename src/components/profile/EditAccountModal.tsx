import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Button, Input } from "../ui";
import { useAuthStore } from "../../stores/authStore";

interface EditAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function EditAccountModal({
  isOpen,
  onClose,
  onConfirm,
}: EditAccountModalProps) {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setPassword("");
      setError("");
    }
  }, [isOpen]);

  const handleVerify = () => {
    if (user && password === user.password) {
      setPassword("");
      setError("");
      onConfirm();
    } else {
      setError(t("auth.loginError"));
    }
  };

  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleVerify();
  };

  return (
    <Modal
      className="max-w-lg"
      isOpen={isOpen}
      onClose={onClose}
      title={t("profile.editAccount")}
      footer={
        <>
          <Button variant="ghost" className="border" onClick={onClose}>
            {t("common.cancel")}
          </Button>
          <Button onClick={handleVerify}>{t("common.edit")}</Button>
        </>
      }
    >
      <form onSubmit={handleFormSubmit}>
        <p className="text-sm text-gray-600 mb-4">
          {t("profile.confirmPassword")}
        </p>
        {error && (
          <div
            className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm mb-4"
            role="alert"
          >
            {error}
          </div>
        )}
        <Input
          label={t("auth.password")}
          showPasswordToggle
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />
      </form>
    </Modal>
  );
}
