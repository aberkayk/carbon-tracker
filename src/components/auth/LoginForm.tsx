import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Input } from '../ui';
import { useAuthStore } from '../../stores/authStore';
import { validateLoginForm } from '../../lib/validation';

export function LoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loginError, setLoginError] = useState('');

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setLoginError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(
        Object.fromEntries(
          Object.entries(validationErrors).map(([k, v]) => [k, t(v)])
        )
      );
      return;
    }
    const success = login(form.email, form.password);
    if (success) {
      navigate('/dashboard');
    } else {
      setLoginError(t('auth.loginError'));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {loginError && (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm" role="alert">
          {loginError}
        </div>
      )}
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
      <Button type="submit" fullWidth size="lg">
        {t('auth.login')}
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
        {t('auth.noAccount')}{' '}
        <Link to="/signup" className="text-green-600 hover:text-green-700 font-medium">
          {t('auth.signUp')}
        </Link>
      </p>
    </form>
  );
}
