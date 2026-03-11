import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button, Input } from '../ui';
import { useAuthStore } from '../../stores/authStore';

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
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user && password === user.password) {
      setPassword('');
      setError('');
      onConfirm();
    } else {
      setError(t('auth.loginError'));
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('profile.editAccount')}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button onClick={handleSubmit}>{t('common.edit')}</Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <p className="text-sm text-gray-600 mb-4">
          {t('profile.confirmPassword')}
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
          label={t('auth.password')}
          showPasswordToggle
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError('');
          }}
        />
      </form>
    </Modal>
  );
}
