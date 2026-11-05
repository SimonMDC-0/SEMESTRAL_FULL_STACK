import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { validarEmail } from '../utils/validaciones';

export interface IniciarSesionProps {
  onNavigateRegister?: () => void;
  onLoginSuccess?: (email: string) => void;
}

export const IniciarSesion: React.FC<IniciarSesionProps> = ({
  onNavigateRegister,
  onLoginSuccess
}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Por favor ingresa tu correo electronico.';
    } else if (!validarEmail(email)) {
      newErrors.email = 'Correo invalido. Usa el formato usuario@dominio.com';
    }

    if (!password) {
      newErrors.password = 'Por favor ingresa tu contrasena.';
    } else if (password.length < 6) {
      newErrors.password = 'La contrasena debe tener al menos 6 caracteres.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Iniciar sesion
    if (onLoginSuccess) {
      onLoginSuccess(email);
    } else {
      alert(`¡Bienvenido de vuelta, ${email}!`);
      navigate('/');
    }
  };

  return (
    <main className="py-5">
      <div className="container">
        <div className="register-container">
          {/* Titulo del formulario */}
          <div className="form-banner">Iniciar Sesion</div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Campo correo */}
            <div className="mb-4">
              <label htmlFor="login-email" className="form-label-custom">
                Correo Electronico
              </label>
              <input
                type="email"
                id="login-email"
                name="email"
                className="form-control form-control-custom"
                placeholder="usuario@ejemplo.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                }}
                required
                autoComplete="email"
                style={{ borderColor: errors.email ? '#c0392b' : undefined }}
              />
              {errors.email && <div className="twy-error-msg">⚠️ {errors.email}</div>}
            </div>

            {/* Campo contrasena */}
            <div className="mb-4">
              <label htmlFor="login-password" className="form-label-custom">
                Contrasena
              </label>
              <input
                type="password"
                id="login-password"
                name="password"
                className="form-control form-control-custom"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                }}
                required
                autoComplete="current-password"
                style={{ borderColor: errors.password ? '#c0392b' : undefined }}
              />
              {errors.password && <div className="twy-error-msg">⚠️ {errors.password}</div>}
            </div>

            {/* Recordarme y enlace olvidar contrasena */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="login-remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <label
                  className="form-check-label"
                  htmlFor="login-remember"
                  style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}
                >
                  Recordarme
                </label>
              </div>
              <a
                href="#olvide-pass"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Se ha enviado un enlace de recuperacion a tu correo si este existe.');
                }}
                style={{ color: 'var(--color-primary)', fontSize: '0.9rem', textDecoration: 'none' }}
              >
                ¿Olvidaste tu contrasena?
              </a>
            </div>

            {/* Boton enviar */}
            <div className="d-grid mb-3">
              <Button type="submit" variant="register">
                Ingresar
              </Button>
            </div>

            {/* Enlace a registro */}
            <p className="text-center mb-0" style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
              ¿No tienes cuenta?{' '}
              {onNavigateRegister ? (
                <a
                  href="#registrar"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateRegister();
                  }}
                  style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}
                >
                  Registrate aqui
                </a>
              ) : (
                <Link
                  to="/registrar"
                  style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 600 }}
                >
                  Registrate aqui
                </Link>
              )}
            </p>
          </form>
        </div>
      </div>
    </main>
  );
};

export default IniciarSesion;
