import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Shield, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="bg-white border-b border-sce-lightgray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Shield className="h-8 w-8 text-sce-primary" />
              <span className="ml-2 text-2xl font-bold text-sce-primary">SCE Foundation</span>
            </Link>
            
            <nav className="hidden md:ml-10 md:flex space-x-8">
              <Link to="/objects" className="text-sce-secondary hover:text-sce-primary px-3 py-2 font-medium">
                SCE Объекты
              </Link>
              <Link to="/news" className="text-sce-secondary hover:text-sce-primary px-3 py-2 font-medium">
                Новости
              </Link>
              <Link to="/about" className="text-sce-secondary hover:text-sce-primary px-3 py-2 font-medium">
                О Нас
              </Link>
              <Link to="/rules" className="text-sce-secondary hover:text-sce-primary px-3 py-2 font-medium">
                Правила
              </Link>
            </nav>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sce-secondary">
                  {user?.username} ({user?.role})
                </span>
                {user?.role === 'ADMIN' && (
                  <Button
                    variant="outline" 
                    onClick={() => navigate('/admin')}
                  >
                    Админ-панель
                  </Button>
                )}
                <Button
                  variant="outline" 
                  onClick={() => logout()}
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline" 
                  onClick={() => navigate('/login')}
                >
                  Войти
                </Button>
                <Button
                  onClick={() => navigate('/register')}
                >
                  Регистрация
                </Button>
              </>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-sce-secondary hover:text-sce-primary focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Мобильное меню */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link 
              to="/objects" 
              className="block px-3 py-2 text-sce-secondary hover:text-sce-primary font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              SCE Объекты
            </Link>
            <Link 
              to="/news" 
              className="block px-3 py-2 text-sce-secondary hover:text-sce-primary font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Новости
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 text-sce-secondary hover:text-sce-primary font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              О Нас
            </Link>
            <Link 
              to="/rules" 
              className="block px-3 py-2 text-sce-secondary hover:text-sce-primary font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Правила
            </Link>
            
            <div className="pt-4 border-t border-sce-lightgray">
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 text-sce-secondary">
                    {user?.username} ({user?.role})
                  </div>
                  {user?.role === 'ADMIN' && (
                    <button
                      className="block w-full text-left px-3 py-2 text-sce-primary hover:bg-sce-lightgray font-medium"
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate('/admin');
                      }}
                    >
                      Админ-панель
                    </button>
                  )}
                  <button
                    className="block w-full text-left px-3 py-2 text-sce-primary hover:bg-sce-lightgray font-medium"
                    onClick={() => {
                      setIsMenuOpen(false);
                      logout();
                    }}
                  >
                    Выйти
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="block w-full text-left px-3 py-2 text-sce-primary hover:bg-sce-lightgray font-medium"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/login');
                    }}
                  >
                    Войти
                  </button>
                  <button
                    className="block w-full text-left px-3 py-2 text-sce-primary hover:bg-sce-lightgray font-medium"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate('/register');
                    }}
                  >
                    Регистрация
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
