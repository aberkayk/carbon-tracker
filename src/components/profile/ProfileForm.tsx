import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Card } from '../ui';
import { useAuthStore } from '../../stores/authStore';
import { useTransportStore } from '../../stores/transportStore';
import { SUPPORTED_CURRENCIES } from '../../lib/constants';

interface ProfileFormProps {
  isUnlocked: boolean;
}

export function ProfileForm({ isUnlocked }: ProfileFormProps) {
  const { t } = useTranslation();
  const user = useAuthStore((s) => s.user);
  const updateUser = useAuthStore((s) => s.updateUser);
  const recalculateAllAmounts = useTransportStore(
    (s) => s.recalculateAllAmounts
  );

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    currency: 'EUR',
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
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label={t('auth.firstName')}
            value={form.firstName}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, firstName: e.target.value }))
            }
            disabled={!isUnlocked}
          />
          <Input
            label={t('auth.lastName')}
            value={form.lastName}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, lastName: e.target.value }))
            }
            disabled={!isUnlocked}
          />
        </div>
        <div className="mt-4">
          <Input
            label={t('auth.email')}
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, email: e.target.value }))
            }
            disabled={!isUnlocked}
          />
        </div>
        <div className="mt-4">
          <Input
            label={t('auth.password')}
            showPasswordToggle
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, password: e.target.value }))
            }
            disabled={!isUnlocked}
          />
        </div>
        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700 block mb-1">
            {t('profile.currency')}
          </label>
          <select
            value={form.currency}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, currency: e.target.value }))
            }
            disabled={!isUnlocked}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
          >
            {SUPPORTED_CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          {t('profile.notifications')}
        </h3>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={form.notificationOptIn}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                notificationOptIn: e.target.checked,
              }))
            }
            disabled={!isUnlocked}
          />
          {t('profile.notifications')}
        </label>
      </Card>

      <Card className="p-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          {t('profile.socialConnections')}
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Google</span>
            <Button
              variant={form.googleConnected ? 'outline' : 'primary'}
              size="sm"
              disabled={!isUnlocked}
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  googleConnected: !prev.googleConnected,
                }))
              }
            >
              {form.googleConnected
                ? t('profile.disconnectGoogle')
                : t('profile.connectGoogle')}
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Facebook</span>
            <Button
              variant={form.facebookConnected ? 'outline' : 'primary'}
              size="sm"
              disabled={!isUnlocked}
              onClick={() =>
                setForm((prev) => ({
                  ...prev,
                  facebookConnected: !prev.facebookConnected,
                }))
              }
            >
              {form.facebookConnected
                ? t('profile.disconnectFacebook')
                : t('profile.connectFacebook')}
            </Button>
          </div>
        </div>
      </Card>

      {isUnlocked && (
        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg">
            {t('common.save')}
          </Button>
        </div>
      )}
    </div>
  );
}
