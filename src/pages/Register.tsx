import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/Button';
import { UserPlus } from 'lucide-react';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !username || !password || !confirmPassword) {
      setError('Пожалуйста, заполните все поля');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      await register(email, username, password);
      setSuccess(true);
      
      // Перенаправляем на главную страницу через 2 секунды
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при регистрации');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto my-12 px-4 sm:px-6">
        <div className="bg-white rounded-sm shadow-sm border border-sce-lightgray p-6">
          <div className="flex justify-center mb-6">
            <div className="bg-sce-primary rounded-full p-3 text-white">
              <UserPlus size={24} />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center text-sce-primary mb-6">Регистрация</h1>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm mb-6">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-sm mb-6">
              Регистрация успешно завершена! Перенаправление...
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sce-secondary font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="sce-input w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading || success}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="username" className="block text-sce-secondary font-medium mb-2">
                Имя пользователя
              </label>
              <input
                id="username"
                type="text"
                className="sce-input w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading || success}
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="password" className="block text-sce-secondary font-medium mb-2">
                Пароль
              </label>
              <input
                id="password"
                type="password"
                className="sce-input w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading || success}
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sce-secondary font-medium mb-2">
                Подтверждение пароля
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="sce-input w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isLoading || success}
              />
            </div>
            
            <Button
              type="submit"
              className="w-full mb-4"
              disabled={isLoading || success}
            >
              {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
            </Button>
            
            <p className="text-center text-sce-secondary">
              Уже есть аккаунт?{' '}
              <Link to="/login" className="text-sce-primary hover:text-sce-secondary">
                Войти
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
