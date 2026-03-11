import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Input } from '../ui';
import { useAuthStore } from '../../stores/authStore';
import { validateSignUpForm } from '../../lib/validation';

export function SignUpForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const signUp = useAuthStore((s) => s.signUp);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
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
          Object.entries(validationErrors).map(([k, v]) => [k, t(v)])
        )
      );
      return;
    }
    signUp({
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
    });
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label={t('auth.firstName')}
          value={form.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
          error={errors.firstName}
        />
        <Input
          label={t('auth.lastName')}
          value={form.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
          error={errors.lastName}
        />
      </div>
      <Input
        label={t('auth.email')}
        type="email"
        value={form.email}
        onChange={(e) => handleChange('email', e.target.value)}
        error={errors.email}
      />
      <Input
        label={t('auth.password')}
        showPasswordToggle
        value={form.password}
        onChange={(e) => handleChange('password', e.target.value)}
        error={errors.password}
      />
      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="terms"
          checked={form.termsAccepted}
          onChange={(e) => handleChange('termsAccepted', e.target.checked)}
          className="mt-1"
        />
        <label htmlFor="terms" className="text-sm text-gray-600">
          {t('auth.termsConfirmation')}
        </label>
      </div>
      {errors.termsAccepted && (
        <p className="text-xs text-red-500" role="alert">
          {errors.termsAccepted}
        </p>
      )}
      <Button type="submit" fullWidth size="lg">
        {t('auth.signUp')}
      </Button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or</span>
        </div>
      </div>

      <div className="space-y-3">
        <Button type="button" variant="social" fullWidth>
          {t('auth.signInGoogle')}
        </Button>
        <Button type="button" variant="social" fullWidth>
          {t('auth.signInFacebook')}
        </Button>
      </div>

      <p className="text-center text-sm text-gray-600 mt-4">
        {t('auth.hasAccount')}{' '}
        <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
          {t('auth.login')}
        </Link>
      </p>
    </form>
  );
}
