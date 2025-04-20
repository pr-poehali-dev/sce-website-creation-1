import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { Bell, Clock, User, Edit, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { news } = useData();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const newsItem = news.find(item => item.id === id);

  if (!newsItem) {
    return (
      <Layout>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-sm border border-sce-lightgray p-8 text-center">
            <Bell className="h-16 w-16 text-sce-lightgray mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-sce-primary mb-4">Новость не найдена</h2>
            <p className="text-sce-secondary mb-6">
              Запрашиваемая новость не существует или была удалена.
            </p>
            <Button onClick={() => navigate('/news')}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Вернуться к списку новостей
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  // Форматирование даты
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Link 
            to="/news"
            className="inline-flex items-center text-sce-primary hover:text-sce-secondary"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Вернуться к списку новостей
          </Link>
        </div>

        <div className="bg-white rounded-sm border border-sce-lightgray overflow-hidden">
          <div className="border-b border-sce-lightgray p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
              <div className="flex items-center mb-4 md:mb-0">
                <Bell className="mr-2 h-6 w-6 text-sce-primary" />
                <span className="text-sm text-sce-secondary">
                  Опубликовано: {formatDate(newsItem.createdAt)}
                </span>
              </div>
              
              {isAdmin || (user && user.id === newsItem.author.id) ? (
                <Link to={`/admin/news/edit/${newsItem.id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Редактировать
                  </Button>
                </Link>
              ) : null}
            </div>
            
            <h1 className="text-3xl font-bold text-sce-primary">{newsItem.title}</h1>
          </div>
          
          <div className="p-6">
            <div className="prose max-w-none mb-8">
              {newsItem.content.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
            <div className="border-t border-sce-lightgray pt-4 flex flex-col md:flex-row justify-between text-sm text-sce-accent">
              <div className="flex items-center mb-2 md:mb-0">
                <User className="mr-1 h-4 w-4" />
                <span>Автор: {newsItem.author.username}</span>
              </div>
              {newsItem.createdAt !== newsItem.updatedAt && (
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>
                    Обновлено: {formatDate(newsItem.updatedAt)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewsDetail;
