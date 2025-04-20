import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { User, Save, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const EditProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { getUserProfile, createUserProfile, updateUserProfile, positions } = useData();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    bio: '',
    position: '',
    department: '',
    contactInfo: ''
  });
  
  useEffect(() => {
    if (userId) {
      // Проверяем, что текущий пользователь редактирует свой профиль
      if (!currentUser || currentUser.id !== userId) {
        navigate('/');
        return;
      }
      
      // Загружаем существующий профиль
      const profile = getUserProfile(userId);
      if (profile) {
        setFormData({
          fullName: profile.fullName || '',
          bio: profile.bio || '',
          position: profile.position || '',
          department: profile.department || '',
          contactInfo: profile.contactInfo || ''
        });
      }
    }
  }, [userId, currentUser, getUserProfile, navigate]);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId || !currentUser) {
      setError('Ошибка: Не удалось идентифицировать пользователя');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      const existingProfile = getUserProfile(userId);
      
      if (existingProfile) {
        // Обновляем существующий профиль
        await updateUserProfile(existingProfile.id, formData);
      } else {
        // Создаем новый профиль
        await createUserProfile({
          userId,
          ...formData,
          joinDate: new Date(),
          lastActive: new Date(),
          contributions: 0,
          badges: ['Новичок']
        });
      }
      
      navigate(`/profile/${userId}`);
    } catch (error) {
      console.error('Error saving profile:', error);
      setError('Произошла ошибка при сохранении профиля');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!currentUser || currentUser.id !== userId) {
    return (
      <Layout>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-sm border border-sce-lightgray p-8 text-center">
            <AlertTriangle className="h-16 w-16 text-sce-lightgray mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-sce-primary mb-4">Доступ запрещен</h2>
            <p className="text-sce-secondary mb-6">
              У вас нет прав для редактирования этого профиля.
            </p>
            <Button onClick={() => navigate('/')}>
              Вернуться на главную
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            <User className="mr-2 h-6 w-6 text-sce-primary" />
            Редактирование профиля
          </h1>
          <Button 
            variant="outline" 
            onClick={() => navigate(`/profile/${userId}`)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Вернуться к профилю
          </Button>
        </div>
        
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-sm">
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
        
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-sm border border-sce-lightgray p-6 mb-6">
            <h2 className="text-xl font-bold mb-6 text-sce-primary border-b border-sce-lightgray pb-2">
              Основная информация
            </h2>
            
            <div className="mb-6">
              <label htmlFor="fullName" className="block text-sm font-medium text-sce-secondary mb-1">
                Полное имя
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="sce-input w-full"
                placeholder="Введите ваше полное имя"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="bio" className="block text-sm font-medium text-sce-secondary mb-1">
                О себе
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                className="sce-input w-full"
                placeholder="Расскажите о себе..."
                value={formData.bio}
                onChange={handleChange}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-sce-secondary mb-1">
                  Должность
                </label>
                <select
                  id="position"
                  name="position"
                  className="sce-input w-full"
                  value={formData.position}
                  onChange={handleChange}
                >
                  <option value="">Выберите должность</option>
                  {positions.map((position) => (
                    <option key={position.id} value={position.name}>
                      {position.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-sce-secondary mb-1">
                  Отдел
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  className="sce-input w-full"
                  placeholder="Укажите ваш отдел"
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="contactInfo" className="block text-sm font-medium text-sce-secondary mb-1">
                Контактная информация
              </label>
              <input
                type="text"
                id="contactInfo"
                name="contactInfo"
                className="sce-input w-full"
                placeholder="Дополнительная контактная информация"
                value={formData.contactInfo}
                onChange={handleChange}
              />
              <p className="text-xs text-sce-accent mt-1">
                Будет видна только авторизованным пользователям
              </p>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              className="mr-4"
              onClick={() => navigate(`/profile/${userId}`)}
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
                  Сохранить профиль
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditProfile;
