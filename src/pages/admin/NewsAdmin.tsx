import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import { useData } from '@/context/DataContext';
import { Bell, Plus, Search, Edit, Trash2, Eye, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const NewsAdmin: React.FC = () => {
  const { news, deleteNews } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Фильтрация новостей
  const filteredNews = news
    .filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleDeleteNews = async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить эту новость? Это действие нельзя отменить.')) {
      try {
        setIsDeleting(id);
        setError(null);
        await deleteNews(id);
      } catch (err) {
        console.error('Error deleting news:', err);
        setError('Ошибка при удалении новости');
      } finally {
        setIsDeleting(null);
      }
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Bell className="mr-2 h-6 w-6 text-sce-primary" />
          Управление новостями
        </h1>
        <Link to="/admin/news/create">
          <Button className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Создать новость
          </Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Поиск новостей */}
      <div className="bg-white p-4 rounded-sm border border-sce-lightgray mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sce-accent h-4 w-4" />
          <input
            type="text"
            placeholder="Поиск по заголовку или содержанию..."
            className="sce-input pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Таблица новостей */}
      {filteredNews.length > 0 ? (
        <div className="bg-white rounded-sm border border-sce-lightgray overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-sce-lightgray">
              <thead className="bg-sce-lightgray">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sce-secondary uppercase tracking-wider">
                    Заголовок
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sce-secondary uppercase tracking-wider">
                    Автор
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sce-secondary uppercase tracking-wider">
                    Дата публикации
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-sce-secondary uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-sce-lightgray">
                {filteredNews.map((item) => (
                  <tr key={item.id} className="hover:bg-sce-lightgray/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-sce-primary">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-sce-secondary">
                      {item.author.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-sce-secondary">
                      {new Date(item.createdAt).toLocaleDateString('ru-RU')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link to={`/news/${item.id}`}>
                          <button className="text-sce-accent hover:text-sce-primary">
                            <Eye className="h-5 w-5" />
                          </button>
                        </Link>
                        <Link to={`/admin/news/edit/${item.id}`}>
                          <button className="text-sce-accent hover:text-sce-primary">
                            <Edit className="h-5 w-5" />
                          </button>
                        </Link>
                        <button 
                          className="text-sce-accent hover:text-red-600"
                          onClick={() => handleDeleteNews(item.id)}
                          disabled={isDeleting === item.id}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-sm border border-sce-lightgray p-8 text-center">
          <Bell className="h-12 w-12 text-sce-lightgray mx-auto mb-4" />
          <h3 className="text-lg font-medium text-sce-secondary mb-2">Новости не найдены</h3>
          <p className="text-sce-accent mb-6">
            {searchQuery
              ? 'Нет новостей, соответствующих указанным критериям.'
              : 'В базе данных пока нет новостей.'}
          </p>
          <Link to="/admin/news/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Создать первую новость
            </Button>
          </Link>
        </div>
      )}
    </AdminLayout>
  );
};

export default NewsAdmin;
