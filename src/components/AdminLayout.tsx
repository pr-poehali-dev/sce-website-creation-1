import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Shield, Users, FileText, Settings, Home, BookOpen, Bell, Database, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-sm shadow-sm max-w-md w-full">
          <h1 className="text-2xl font-bold text-sce-primary mb-4 text-center">Доступ запрещен</h1>
          <p className="text-sce-secondary mb-6">
            У вас нет необходимых прав для доступа к панели администратора.
          </p>
          <div className="flex justify-center">
            <Button onClick={() => navigate('/')}>
              Вернуться на главную
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const navigationItems = [
    { icon: Home, label: 'Обзор', path: '/admin' },
    { icon: Database, label: 'SCE Объекты', path: '/admin/objects' },
    { icon: Bell, label: 'Новости', path: '/admin/news' },
    { icon: FileText, label: 'Отчеты', path: '/admin/reports' },
    { icon: Users, label: 'Пользователи', path: '/admin/users' },
    { icon: BookOpen, label: 'Регистрации', path: '/admin/registrations' },
    { icon: Settings, label: 'Должности', path: '/admin/positions' },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-sce-lightgray">
      {/* Боковая панель для десктопа */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow bg-sce-secondary pt-5 overflow-y-auto">
          <div className="flex items-center px-4">
            <Shield className="h-8 w-8 text-white" />
            <span className="ml-2 text-white text-lg font-bold">SCE Admin</span>
          </div>
          
          <div className="mt-8 flex flex-col flex-1">
            <nav className="flex-1 px-2 space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-sm ${
                    location.pathname === item.path
                      ? 'bg-sce-primary text-white'
                      : 'text-white hover:bg-sce-accent'
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
            
            <div className="p-4 mt-auto">
              <div className="bg-sce-accent rounded-sm p-3">
                <div className="text-white text-sm mb-2">
                  Вы вошли как:
                </div>
                <div className="font-medium text-white mb-1">
                  {user.username}
                </div>
                <div className="text-sm text-white mb-3">
                  {user.role} - Уровень доступа: {user.clearanceLevel}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-transparent border-white text-white hover:bg-white hover:text-sce-secondary"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Выйти
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Мобильная навигация */}
      <div className="md:hidden bg-sce-secondary text-white">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <Shield className="h-6 w-6" />
            <span className="ml-2 font-bold">SCE Admin</span>
          </div>
          <button
            className="text-white"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {isMobileMenuOpen && (
          <nav className="px-2 pt-2 pb-4 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-sm ${
                  location.pathname === item.path
                    ? 'bg-sce-primary text-white'
                    : 'text-white hover:bg-sce-accent'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.label}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-sce-accent">
              <div className="px-2 py-2 text-sm text-white">
                Вы вошли как: {user.username} ({user.role})
              </div>
              <button
                className="w-full flex items-center px-2 py-2 text-sm font-medium text-white hover:bg-sce-accent rounded-sm"
                onClick={handleLogout}
              >
                <LogOut className="mr-3 h-5 w-5" />
                Выйти
              </button>
            </div>
          </nav>
        )}
      </div>
      
      {/* Основное содержимое */}
      <div className="md:pl-64">
        <main className="p-6">
          <div className="bg-white rounded-sm shadow-sm p-4 sm:p-6 min-h-[calc(100vh-3rem)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;