import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import { useData } from '@/context/DataContext';
import { 
  Shield, 
  FileText, 
  Users, 
  Bell, 
  AlertTriangle, 
  Clock, 
  LineChart, 
  BookOpen 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const StatCard: React.FC<{
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  change?: string;
}> = ({ title, value, icon: Icon, color, change }) => (
  <div className="bg-white rounded-sm shadow-sm p-6 border-l-4" style={{ borderLeftColor: color }}>
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm text-sce-secondary font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
        {change && (
          <p className="text-xs text-green-500 mt-1">
            {change}
          </p>
        )}
      </div>
      <div className="p-2 rounded-full" style={{ backgroundColor: `${color}20` }}>
        <Icon style={{ color }} size={20} />
      </div>
    </div>
  </div>
);

const AdminDashboard: React.FC = () => {
  const { 
    sceObjects, 
    news, 
    reports, 
    registrationRequests,
    positions 
  } = useData();

  // Фильтруем объекты, требующие внимания (например, недавно обновленные)
  const pendingRegistrations = registrationRequests.filter(req => req.status === 'PENDING');
  const pendingReports = reports.filter(report => report.status === 'SUBMITTED');

  // Получаем последние объекты и новости
  const recentObjects = [...sceObjects]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const recentNews = [...news]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Панель администратора</h1>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="SCE Объекты" 
          value={sceObjects.length} 
          icon={Shield} 
          color="#990000" 
        />
        <StatCard 
          title="Новости" 
          value={news.length} 
          icon={Bell} 
          color="#2c3e50" 
        />
        <StatCard 
          title="Отчеты" 
          value={reports.length} 
          icon={FileText} 
          color="#27ae60" 
        />
        <StatCard 
          title="Должности" 
          value={positions.length} 
          icon={Users} 
          color="#8e44ad" 
        />
      </div>

      {/* Предупреждения и уведомления */}
      {(pendingRegistrations.length > 0 || pendingReports.length > 0) && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Требуется внимание</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <ul className="list-disc pl-5 space-y-1">
                  {pendingRegistrations.length > 0 && (
                    <li>
                      <Link to="/admin/registrations" className="hover:underline">
                        {pendingRegistrations.length} ожидающих запросов на регистрацию
                      </Link>
                    </li>
                  )}
                  {pendingReports.length > 0 && (
                    <li>
                      <Link to="/admin/reports" className="hover:underline">
                        {pendingReports.length} отчетов требуют рассмотрения
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Последние SCE объекты */}
        <div className="bg-white rounded-sm shadow-sm border border-sce-lightgray">
          <div className="p-4 border-b border-sce-lightgray flex justify-between items-center">
            <h2 className="font-bold text-sce-primary flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Последние SCE объекты
            </h2>
            <Link to="/admin/objects">
              <Button variant="ghost" size="sm">Все объекты</Button>
            </Link>
          </div>
          <div className="p-4">
            {recentObjects.length > 0 ? (
              <div className="divide-y divide-sce-lightgray">
                {recentObjects.map((object) => (
                  <div key={object.id} className="py-3">
                    <div className="flex justify-between">
                      <Link 
                        to={`/admin/objects/${object.id}`} 
                        className="font-medium text-sce-primary hover:underline"
                      >
                        {object.number}: {object.name}
                      </Link>
                      <span className={`text-xs px-2 py-1 rounded-sm ${
                        object.classification === 'SAFE' ? 'bg-green-100 text-green-800' :
                        object.classification === 'EUCLID' ? 'bg-yellow-100 text-yellow-800' :
                        object.classification === 'KETER' ? 'bg-red-100 text-red-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {object.classification}
                      </span>
                    </div>
                    <div className="flex items-center mt-1 text-xs text-sce-accent">
                      <Clock className="mr-1 h-3 w-3" />
                      {new Date(object.createdAt).toLocaleDateString('ru-RU')}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sce-secondary text-center py-4">Нет доступных SCE объектов</p>
            )}
          </div>
        </div>

        {/* Последние новости */}
        <div className="bg-white rounded-sm shadow-sm border border-sce-lightgray">
          <div className="p-4 border-b border-sce-lightgray flex justify-between items-center">
            <h2 className="font-bold text-sce-primary flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Последние новости
            </h2>
            <Link to="/admin/news">
              <Button variant="ghost" size="sm">Все новости</Button>
            </Link>
          </div>
          <div className="p-4">
            {recentNews.length > 0 ? (
              <div className="divide-y divide-sce-lightgray">
                {recentNews.map((item) => (
                  <div key={item.id} className="py-3">
                    <Link 
                      to={`/admin/news/${item.id}`} 
                      className="font-medium text-sce-primary hover:underline"
                    >
                      {item.title}
                    </Link>
                    <div className="flex items-center mt-1 text-xs text-sce-accent">
                      <Clock className="mr-1 h-3 w-3" />
                      {new Date(item.createdAt).toLocaleDateString('ru-RU')}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sce-secondary text-center py-4">Нет доступных новостей</p>
            )}
          </div>
        </div>
      </div>

      {/* Быстрые действия */}
      <div className="bg-white rounded-sm shadow-sm border border-sce-lightgray mb-8">
        <div className="p-4 border-b border-sce-lightgray">
          <h2 className="font-bold text-sce-primary flex items-center">
            <BookOpen className="mr-2 h-5 w-5" />
            Быстрые действия
          </h2>
        </div>
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Link to="/admin/objects/create">
            <Button variant="outline" className="w-full justify-center">
              <Shield className="mr-2 h-4 w-4" />
              Создать SCE объект
            </Button>
          </Link>
          <Link to="/admin/news/create">
            <Button variant="outline" className="w-full justify-center">
              <Bell className="mr-2 h-4 w-4" />
              Создать новость
            </Button>
          </Link>
          <Link to="/admin/reports/create">
            <Button variant="outline" className="w-full justify-center">
              <FileText className="mr-2 h-4 w-4" />
              Создать отчет
            </Button>
          </Link>
          <Link to="/admin/positions/create">
            <Button variant="outline" className="w-full justify-center">
              <Users className="mr-2 h-4 w-4" />
              Создать должность
            </Button>
          </Link>
        </div>
      </div>

      {/* Аналитика / График (заглушка) */}
      <div className="bg-white rounded-sm shadow-sm border border-sce-lightgray">
        <div className="p-4 border-b border-sce-lightgray">
          <h2 className="font-bold text-sce-primary flex items-center">
            <LineChart className="mr-2 h-5 w-5" />
            Активность на сайте
          </h2>
        </div>
        <div className="p-4">
          <div className="h-64 flex items-center justify-center bg-sce-lightgray/30 rounded-sm">
            <p className="text-sce-secondary">Графики активности будут доступны после накопления данных</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
