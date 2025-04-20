import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useData } from '@/context/DataContext';
import { Bell, Search, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const NewsList: React.FC = () => {
  const { news } = useData();
  const [searchQuery, setSearchQuery] = useState('');

  // Фильтрация новостей
  const filteredNews = news
    .filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

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
        <h1 className="text-3xl font-bold flex items-center mb-8">
          <Bell className="mr-2 h-8 w-8 text-sce-primary" />
          Новости SCE Foundation
        </h1>

        {/* Поиск */}
        <div className="bg-white p-4 rounded-sm border border-sce-lightgray mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sce-accent h-4 w-4" />
            <input
              type="text"
              placeholder="Поиск по новостям..."
              className="sce-input pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Список новостей */}
        {filteredNews.length > 0 ? (
          <div className="space-y-8">
            {filteredNews.map((item) => (
              <div key={item.id} className="bg-white border border-sce-lightgray rounded-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-sce-primary mb-3">
                    <Link 
                      to={`/news/${item.id}`}
                      className="hover:text-sce-secondary transition-colors"
                    >
                      {item.title}
                    </Link>
                  </h2>
                  
                  <div className="flex items-center text-sm text-sce-accent mb-4">
                    <div className="flex items-center mr-4">
                      <Calendar className="mr-1 h-4 w-4" />
                      <span>{formatDate(item.createdAt)}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="mr-1 h-4 w-4" />
                      <span>Автор: {item.author.username}</span>
                    </div>
                  </div>
                  
                  <div className="prose max-w-none mb-4">
                    <p className="line-clamp-3">{item.content}</p>
                  </div>
                  
                  <Link to={`/news/${item.id}`}>
                    <Button variant="outline" size="sm">Читать полностью</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-sm border border-sce-lightgray p-8 text-center">
            <Bell className="h-16 w-16 text-sce-lightgray mx-auto mb-4" />
            <h3 className="text-xl font-medium text-sce-secondary mb-2">Новости не найдены</h3>
            <p className="text-sce-accent mb-6">
              {searchQuery
                ? 'Нет новостей, соответствующих вашему запросу.'
                : 'В настоящее время нет опубликованных новостей.'}
            </p>
            <Button onClick={() => window.location.href = '/'}>
              Вернуться на главную
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default NewsList;
