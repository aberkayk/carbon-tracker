import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../../stores/authStore";
import { ProfileForm, EditAccountModal } from "../../components/profile";

export default function ProfilePage() {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditClick = () => {
    if (isUnlocked) {
      setIsUnlocked(false);
    } else {
      setShowEditModal(true);
    }
  };

  const handleConfirmEdit = () => {
    setIsUnlocked(true);
    setShowEditModal(false);
  };

  return (
    <div className="px-4 md:px-6 lg:px-8 py-8 max-w-3xl mx-auto">
      <h1 className="text-2xl md:text-4xl font-bold lg:text-center font-display text-darkblue-100 mb-8">
        {t("profile.hello", { name: user?.firstName })}
      </h1>

      <ProfileForm isUnlocked={isUnlocked} onEditClick={handleEditClick} />

      <EditAccountModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onConfirm={handleConfirmEdit}
      />
    </div>
  );
}
