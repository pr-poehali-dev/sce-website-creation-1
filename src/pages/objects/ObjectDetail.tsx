import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { Shield, Clock, User, Edit, ChevronLeft, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const ObjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { sceObjects } = useData();
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  const sceObject = sceObjects.find(obj => obj.id === id);

  if (!sceObject) {
    return (
      <Layout>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-sm border border-sce-lightgray p-8 text-center">
            <Shield className="h-16 w-16 text-sce-lightgray mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-sce-primary mb-4">Объект не найден</h2>
            <p className="text-sce-secondary mb-6">
              Запрашиваемый SCE объект не существует или был удален.
            </p>
            <Button onClick={() => navigate('/objects')}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Вернуться к списку объектов
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const getClassColor = (classification: string) => {
    switch (classification) {
      case 'SAFE': return 'bg-green-100 text-green-800';
      case 'EUCLID': return 'bg-yellow-100 text-yellow-800';
      case 'KETER': return 'bg-red-100 text-red-800';
      case 'THAUMIEL': return 'bg-purple-100 text-purple-800';
      case 'NEUTRALIZED': return 'bg-gray-100 text-gray-800';
      case 'APOLLYON': return 'bg-red-900 text-white';
      case 'ARCHON': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <Link 
            to="/objects"
            className="inline-flex items-center text-sce-primary hover:text-sce-secondary"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Вернуться к списку объектов
          </Link>
        </div>

        <div className="bg-white rounded-sm border border-sce-lightgray overflow-hidden mb-8">
          <div className="border-b border-sce-lightgray p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
              <div className="flex items-center mb-4 md:mb-0">
                <span className="font-mono text-sce-primary font-semibold text-xl mr-4">
                  {sceObject.number}
                </span>
                <span className={`text-sm px-2.5 py-1 rounded-sm ${getClassColor(sceObject.classification)}`}>
                  {sceObject.classification}
                </span>
              </div>
              
              {isAdmin || (user && user.id === sceObject.author.id) ? (
                <Link to={`/admin/objects/edit/${sceObject.id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Редактировать
                  </Button>
                </Link>
              ) : null}
            </div>
            
            <h1 className="text-3xl font-bold text-sce-primary">{sceObject.name}</h1>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-sce-lightgray p-4 rounded-sm">
                <h3 className="font-bold mb-2">Класс содержания</h3>
                <p>{sceObject.containmentClass}</p>
              </div>
              <div className="bg-sce-lightgray p-4 rounded-sm">
                <h3 className="font-bold mb-2">Класс разрушения</h3>
                <p>{sceObject.disruptionClass}</p>
              </div>
              <div className="bg-sce-lightgray p-4 rounded-sm">
                <h3 className="font-bold mb-2">Класс риска</h3>
                <p>{sceObject.riskClass}</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-sce-primary border-b border-sce-lightgray pb-2">
                Специальные условия содержания
              </h2>
              <div className="prose max-w-none">
                {sceObject.specialContainmentProcedures.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-sce-primary border-b border-sce-lightgray pb-2">
                Описание
              </h2>
              <div className="prose max-w-none">
                {sceObject.description.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
            
            <div className="border-t border-sce-lightgray pt-4 flex flex-col md:flex-row justify-between text-sm text-sce-accent">
              <div className="flex items-center mb-2 md:mb-0">
                <User className="mr-1 h-4 w-4" />
                <span>Автор: {sceObject.author.username}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                <span>
                  Создано: {new Date(sceObject.createdAt).toLocaleDateString('ru-RU')}
                  {sceObject.createdAt !== sceObject.updatedAt && 
                    ` (обновлено: ${new Date(sceObject.updatedAt).toLocaleDateString('ru-RU')})`}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <Lock className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Напоминание о безопасности</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Помните, что несанкционированное разглашение информации о SCE объектах 
                  является нарушением протоколов безопасности Фонда и может повлечь 
                  дисциплинарные меры.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ObjectDetail;
