import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-sce-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-bold">SCE Foundation</span>
            </div>
            <p className="mt-2 text-sm">
              Secure. Control. Explore. Мы защищаем мир от аномальных угроз.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-gray-300 transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/objects" className="hover:text-gray-300 transition-colors">
                  SCE Объекты
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-gray-300 transition-colors">
                  Новости
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-300 transition-colors">
                  О Нас
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">Документы</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/rules" className="hover:text-gray-300 transition-colors">
                  Правила Сообщества
                </Link>
              </li>
              <li>
                <Link to="/tos" className="hover:text-gray-300 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-gray-300 transition-colors">
                  Условия Использования
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-center">
          <p>© {new Date().getFullYear()} SCE Foundation. Все права защищены.</p>
          <p className="mt-2">
            SCE Foundation является вымышленной организацией и не имеет отношения к 
            реальным организациям или фондам.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
