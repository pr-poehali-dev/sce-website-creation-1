import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { Bell, Save, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const CreateNews: React.FC = () => {
  const { createNews } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация
    if (!formData.title || !formData.content) {
      setError('Пожалуйста, заполните все обязательные поля');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      if (!user) {
        throw new Error('Пользователь не авторизован');
      }
      
      await createNews({
        ...formData,
        author: user
      });
      
      navigate('/admin/news');
    } catch (error) {
      console.error('Error creating news:', error);
      setError('Произошла ошибка при создании новости');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Bell className="mr-2 h-6 w-6 text-sce-primary" />
          Создание новости
        </h1>
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/news')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Назад к списку
        </Button>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-sm border border-sce-lightgray p-6 mb-6">
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-sce-secondary mb-1">
              Заголовок новости *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="sce-input w-full"
              placeholder="Введите заголовок новости"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-sce-secondary mb-1">
              Содержание новости *
            </label>
            <textarea
              id="content"
              name="content"
              rows={12}
              className="sce-input w-full"
              placeholder="Введите текст новости..."
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            className="mr-4"
            onClick={() => navigate('/admin/news')}
            disabled={isSubmitting}
          >
            Отмена
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              'Сохранение...'
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Создать новость
              </>
            )}
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default CreateNews;
