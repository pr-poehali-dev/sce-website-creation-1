import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/Button';
import { Shield, File, Bell, LockKeyhole } from 'lucide-react';

const Home: React.FC = () => {
  const { sceObjects, news } = useData();
  
  // Получаем последние 3 SCE объекта
  const latestObjects = [...sceObjects]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);
  
  // Получаем последние 3 новости
  const latestNews = [...news]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <Layout>
      {/* Герой секция */}
      <section className="bg-sce-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className="inline-block h-16 w-16 mb-4" />
            <h1 className="text-4xl font-bold mb-4">SCE Foundation</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Secure. Control. Explore. Мы обеспечиваем безопасность и изучение аномальных явлений по всему миру.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="secondary" 
                size="lg"
                onClick={() => window.location.href = '/objects'}
              >
                SCE Объекты
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-transparent border-white text-white hover:bg-white hover:text-sce-primary"
                onClick={() => window.location.href = '/about'}
              >
                О Нас
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Информационные блоки */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 border border-sce-lightgray rounded-sm text-center">
              <File className="h-12 w-12 mx-auto mb-4 text-sce-primary" />
              <h2 className="text-xl font-bold mb-2">SCE Объекты</h2>
              <p className="text-sce-secondary mb-4">
                Каталог аномальных объектов, находящихся под наблюдением и контролем Фонда SCE.
              </p>
              <Button 
                variant="ghost"
                onClick={() => window.location.href = '/objects'}
              >
                Просмотреть →
              </Button>
            </div>
            
            <div className="p-6 border border-sce-lightgray rounded-sm text-center">
              <Bell className="h-12 w-12 mx-auto mb-4 text-sce-primary" />
              <h2 className="text-xl font-bold mb-2">Последние Новости</h2>
              <p className="text-sce-secondary mb-4">
                Будьте в курсе последних событий, открытий и мероприятий Фонда SCE.
              </p>
              <Button 
                variant="ghost"
                onClick={() => window.location.href = '/news'}
              >
                Читать новости →
              </Button>
            </div>
            
            <div className="p-6 border border-sce-lightgray rounded-sm text-center">
              <LockKeyhole className="h-12 w-12 mx-auto mb-4 text-sce-primary" />
              <h2 className="text-xl font-bold mb-2">Правила Сообщества</h2>
              <p className="text-sce-secondary mb-4">
                Ознакомьтесь с правилами и нормами нашего сообщества исследователей.
              </p>
              <Button 
                variant="ghost"
                onClick={() => window.location.href = '/rules'}
              >
                Ознакомиться →
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Последние SCE объекты */}
      <section className="py-12 bg-sce-lightgray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 border-b border-sce-accent pb-2">Последние SCE объекты</h2>
          
          {latestObjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestObjects.map((object) => (
                <Link 
                  key={object.id} 
                  to={`/objects/${object.id}`}
                  className="bg-white border border-sce-lightgray rounded-sm p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-sce-primary font-semibold">{object.number}</span>
                    <span className={`text-sm px-2 py-1 rounded-sm ${
                      object.classification === 'SAFE' ? 'bg-green-100 text-green-800' :
                      object.classification === 'EUCLID' ? 'bg-yellow-100 text-yellow-800' :
                      object.classification === 'KETER' ? 'bg-red-100 text-red-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {object.classification}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-1">{object.name}</h3>
                  <p className="text-sce-secondary line-clamp-3">{object.description}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-sce-lightgray rounded-sm p-6 text-center">
              <p className="text-sce-secondary">В данный момент нет доступных SCE объектов.</p>
            </div>
          )}
          
          {latestObjects.length > 0 && (
            <div className="mt-8 text-center">
              <Button variant="outline" onClick={() => window.location.href = '/objects'}>
                Просмотреть все объекты
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Последние новости */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 border-b border-sce-accent pb-2">Последние новости</h2>
          
          {latestNews.length > 0 ? (
            <div className="space-y-6">
              {latestNews.map((item) => (
                <Link 
                  key={item.id} 
                  to={`/news/${item.id}`}
                  className="block bg-white border border-sce-lightgray rounded-sm p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sce-secondary mb-3 line-clamp-2">{item.content}</p>
                  <div className="flex justify-between items-center text-sm text-sce-accent">
                    <span>Автор: {item.author.username}</span>
                    <span>
                      {new Date(item.createdAt).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white border border-sce-lightgray rounded-sm p-6 text-center">
              <p className="text-sce-secondary">В данный момент нет доступных новостей.</p>
            </div>
          )}
          
          {latestNews.length > 0 && (
            <div className="mt-8 text-center">
              <Button variant="outline" onClick={() => window.location.href = '/news'}>
                Читать все новости
              </Button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Home;
