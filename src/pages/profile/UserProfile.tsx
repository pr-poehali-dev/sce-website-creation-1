import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { User, Clock, Mail, Shield, Edit, ChevronLeft, Award, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const UserProfile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { getUsers, getUserProfile, sceObjects, reports } = useData();
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [userContributions, setUserContributions] = useState<any[]>([]);
  
  useEffect(() => {
    if (userId) {
      // Получаем данные пользователя
      const users = getUsers();
      const foundUser = users.find(u => u.id === userId);
      setUser(foundUser || null);
      
      // Получаем профиль пользователя
      const userProfile = getUserProfile(userId);
      setProfile(userProfile || null);
      
      // Получаем вклад пользователя (объекты и отчеты)
      const userObjects = sceObjects.filter(obj => obj.author.id === userId);
      const userReports = reports.filter(rep => rep.author.id === userId && rep.status === 'APPROVED');
      
      setUserContributions([
        ...userObjects.map(obj => ({ 
          type: 'object', 
          id: obj.id, 
          title: obj.name, 
          number: obj.number,
          date: obj.createdAt 
        })),
        ...userReports.map(rep => ({ 
          type: 'report', 
          id: rep.id, 
          title: rep.title, 
          date: rep.createdAt 
        }))
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    }
  }, [userId, getUsers, getUserProfile, sceObjects, reports]);
  
  if (!user) {
    return (
      <Layout>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-sm border border-sce-lightgray p-8 text-center">
            <User className="h-16 w-16 text-sce-lightgray mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-sce-primary mb-4">Пользователь не найден</h2>
            <p className="text-sce-secondary mb-6">
              Запрашиваемый пользователь не существует или был удален.
            </p>
            <Button onClick={() => navigate('/')}>
              Вернуться на главную
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  // Функция для определения цвета роли
  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'bg-red-100 text-red-800';
      case 'MODERATOR': return 'bg-blue-100 text-blue-800';
      case 'RESEARCHER': return 'bg-green-100 text-green-800';
      case 'AGENT': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Форматирование даты
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  const isOwnProfile = currentUser && currentUser.id === userId;
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Link 
            to="/"
            className="inline-flex items-center text-sce-primary hover:text-sce-secondary"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Вернуться на главную
          </Link>
        </div>
        
        <div className="bg-white rounded-sm border border-sce-lightgray overflow-hidden mb-8">
          <div className="border-b border-sce-lightgray p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
              <div className="flex items-center mb-4 md:mb-0">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-medium ${getRoleBadgeClass(user.role)}`}>
                  {user.role}
                </span>
                <span className="ml-2 text-sm text-sce-secondary">
                  Уровень доступа: {user.clearanceLevel}
                </span>
              </div>
              
              {isOwnProfile && (
                <Link to={`/profile/edit/${user.id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Редактировать профиль
                  </Button>
                </Link>
              )}
            </div>
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-24 h-24 bg-sce-secondary text-white rounded-full flex items-center justify-center text-4xl font-bold mb-4 md:mb-0 md:mr-6">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-sce-primary">{user.username}</h1>
                <div className="flex items-center mt-2 text-sce-secondary">
                  <Mail className="mr-2 h-4 w-4" />
                  {user.email}
                </div>
                <div className="flex items-center mt-1 text-sce-secondary">
                  <Clock className="mr-2 h-4 w-4" />
                  С нами с {formatDate(user.createdAt)}
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {profile ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2">
                  <h2 className="text-xl font-bold mb-4 text-sce-primary border-b border-sce-lightgray pb-2">
                    О пользователе
                  </h2>
                  {profile.bio ? (
                    <p className="text-sce-secondary mb-6">{profile.bio}</p>
                  ) : (
                    <p className="text-sce-accent italic mb-6">Нет информации</p>
                  )}
                  
                  {profile.position && (
                    <div className="mb-4">
                      <h3 className="font-bold text-sce-secondary mb-1">Должность</h3>
                      <p>{profile.position}</p>
                    </div>
                  )}
                  
                  {profile.department && (
                    <div className="mb-4">
                      <h3 className="font-bold text-sce-secondary mb-1">Отдел</h3>
                      <p>{profile.department}</p>
                    </div>
                  )}
                  
                  {profile.contactInfo && (
                    <div className="mb-4">
                      <h3 className="font-bold text-sce-secondary mb-1">Контактная информация</h3>
                      <p>{profile.contactInfo}</p>
                    </div>
                  )}
                </div>
                
                <div>
                  <h2 className="text-xl font-bold mb-4 text-sce-primary border-b border-sce-lightgray pb-2">
                    Статистика
                  </h2>
                  
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-sce-secondary">Последняя активность</span>
                      <span className="text-sm font-medium">
                        {formatDate(profile.lastActive)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-sce-secondary">Вклад</span>
                      <span className="text-sm font-medium">{profile.contributions}</span>
                    </div>
                  </div>
                  
                  {profile.badges && profile.badges.length > 0 && (
                    <div>
                      <h3 className="font-bold text-sce-secondary mb-2 flex items-center">
                        <Award className="mr-1 h-4 w-4" />
                        Знаки отличия
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.badges.map((badge: string, index: number) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2.5 py-1 rounded-sm text-xs font-medium bg-sce-primary text-white"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <Shield className="h-12 w-12 text-sce-lightgray mx-auto mb-3" />
                <p className="text-sce-secondary mb-2">Профиль пользователя еще не заполнен</p>
                {isOwnProfile && (
                  <Link to={`/profile/edit/${user.id}`}>
                    <Button variant="outline" size="sm">
                      Заполнить профиль
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Вклад пользователя */}
        <div className="bg-white rounded-sm border border-sce-lightgray overflow-hidden">
          <div className="border-b border-sce-lightgray p-4">
            <h2 className="text-xl font-bold text-sce-primary flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Вклад пользователя
            </h2>
          </div>
          
          <div className="p-4">
            {userContributions.length > 0 ? (
              <div className="divide-y divide-sce-lightgray">
                {userContributions.slice(0, 10).map((contribution, index) => (
                  <div key={index} className="py-3">
                    <Link 
                      to={`/${contribution.type === 'object' ? 'objects' : 'reports'}/${contribution.id}`}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <span className="font-medium text-sce-primary hover:text-sce-secondary">
                          {contribution.type === 'object' ? `${contribution.number}: ` : ''}
                          {contribution.title}
                        </span>
                        <div className="text-xs text-sce-accent">
                          {contribution.type === 'object' ? 'SCE Объект' : 'Отчет'}
                        </div>
                      </div>
                      <div className="text-sm text-sce-accent">
                        {formatDate(contribution.date)}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-6 text-sce-secondary">
                У пользователя пока нет публикаций
              </p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
