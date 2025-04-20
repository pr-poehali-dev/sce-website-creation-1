import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/Button';
import { Lock } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при входе');
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
              <Lock size={24} />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center text-sce-primary mb-6">Вход в систему</h1>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm mb-6">
              {error}
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
                disabled={isLoading}
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sce-secondary font-medium mb-2">
                Пароль
              </label>
              <input
                id="password"
                type="password"
                className="sce-input w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <Button
              type="submit"
              className="w-full mb-4"
              disabled={isLoading}
            >
              {isLoading ? 'Вход...' : 'Войти'}
            </Button>
            
            <p className="text-center text-sce-secondary">
              Нет аккаунта?{' '}
              <Link to="/register" className="text-sce-primary hover:text-sce-secondary">
                Зарегистрироваться
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
