import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Адрес администратора с полным доступом
const ADMIN_EMAIL = 'artemkauniti@gmail.com';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Проверка наличия сохраненного пользователя в localStorage
    const savedUser = localStorage.getItem('sce_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Ошибка при загрузке данных пользователя:', error);
        localStorage.removeItem('sce_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Имитация запроса к API
      // В реальном приложении здесь будет запрос к серверу
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Проверяем, есть ли пользователь в localStorage (имитация базы данных)
      const usersString = localStorage.getItem('sce_users') || '[]';
      const users = JSON.parse(usersString);
      
      const foundUser = users.find((u: any) => u.email === email);
      
      if (!foundUser) {
        throw new Error('Пользователь не найден');
      }
      
      // В реальном приложении пароль должен быть хэширован и сравнен правильно
      if (foundUser.password !== password) {
        throw new Error('Неверный пароль');
      }
      
      // Убираем пароль из объекта пользователя перед сохранением в контексте
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Если это первый пользователь или специальный email, устанавливаем роль ADMIN
      setUser(userWithoutPassword);
      localStorage.setItem('sce_user', JSON.stringify(userWithoutPassword));
      
    } catch (error) {
      console.error('Ошибка при входе:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (email: string, username: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Имитация запроса к API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Проверяем, существует ли пользователь с таким email
      const usersString = localStorage.getItem('sce_users') || '[]';
      const users = JSON.parse(usersString);
      
      if (users.some((user: any) => user.email === email)) {
        throw new Error('Пользователь с таким email уже существует');
      }
      
      // Создаем нового пользователя
      const isFirstUser = users.length === 0;
      const isAdminEmail = email === ADMIN_EMAIL;
      
      const newUser: User & { password: string } = {
        id: Date.now().toString(),
        email,
        username,
        password, // В реальном приложении пароль должен быть хэширован
        role: isFirstUser || isAdminEmail ? UserRole.ADMIN : UserRole.READER,
        clearanceLevel: isFirstUser || isAdminEmail ? 5 : 1,
        createdAt: new Date(),
      };
      
      // Сохраняем пользователя в "базе данных" (localStorage)
      const updatedUsers = [...users, newUser];
      localStorage.setItem('sce_users', JSON.stringify(updatedUsers));
      
      // Если это первый пользователь или специальный email, автоматически входим
      if (isFirstUser || isAdminEmail) {
        const { password: _, ...userWithoutPassword } = newUser;
        setUser(userWithoutPassword);
        localStorage.setItem('sce_user', JSON.stringify(userWithoutPassword));
      }
      
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('sce_user');
  };
  
  const isAuthenticated = !!user;
  const isAdmin = user?.role === UserRole.ADMIN;
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      register, 
      logout, 
      isAuthenticated,
      isAdmin,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
