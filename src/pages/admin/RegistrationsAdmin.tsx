import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { useData } from '@/context/DataContext';
import { UserPlus, Check, X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const RegistrationsAdmin: React.FC = () => {
  const { registrationRequests, approveRegistration, rejectRegistration } = useData();
  const [processing, setProcessing] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Фильтрация заявок по статусу
  const pendingRequests = registrationRequests.filter(req => req.status === 'PENDING');
  const processedRequests = registrationRequests.filter(req => req.status !== 'PENDING');

  const handleApprove = async (id: string) => {
    try {
      setProcessing(id);
      setError(null);
      await approveRegistration(id);
    } catch (err) {
      console.error('Error approving registration:', err);
      setError('Ошибка при одобрении заявки');
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (id: string) => {
    try {
      setProcessing(id);
      setError(null);
      await rejectRegistration(id);
    } catch (err) {
      console.error('Error rejecting registration:', err);
      setError('Ошибка при отклонении заявки');
    } finally {
      setProcessing(null);
    }
  };

  // Форматирование даты
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold flex items-center mb-6">
        <UserPlus className="mr-2 h-6 w-6 text-sce-primary" />
        Запросы на регистрацию
      </h1>

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

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 border-b border-sce-lightgray pb-2">
          Ожидающие одобрения ({pendingRequests.length})
        </h2>

        {pendingRequests.length > 0 ? (
          <div className="bg-white rounded-sm border border-sce-lightgray overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-sce-lightgray">
                <thead className="bg-sce-lightgray">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sce-secondary uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sce-secondary uppercase tracking-wider">
                      Имя пользователя
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sce-secondary uppercase tracking-wider">
                      Дата заявки
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-sce-secondary uppercase tracking-wider">
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-sce-lightgray">
                  {pendingRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-sce-lightgray/30">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-sce-primary">
                        {request.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-sce-secondary">
                        {request.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-sce-secondary">
                        {formatDate(new Date(request.createdAt))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                            onClick={() => handleApprove(request.id)}
                            disabled={processing === request.id}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Одобрить
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                            onClick={() => handleReject(request.id)}
                            disabled={processing === request.id}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Отклонить
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-sm border border-sce-lightgray p-6 text-center">
            <p className="text-sce-secondary">
              Нет ожидающих запросов на регистрацию.
            </p>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 border-b border-sce-lightgray pb-2">
          Обработанные заявки ({processedRequests.length})
        </h2>

        {processedRequests.length > 0 ? (
          <div className="bg-white rounded-sm border border-sce-lightgray overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-sce-lightgray">
                <thead className="bg-sce-lightgray">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sce-secondary uppercase tracking-wider">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sce-secondary uppercase tracking-wider">
                      Имя пользователя
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sce-secondary uppercase tracking-wider">
                      Дата заявки
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sce-secondary uppercase tracking-wider">
                      Статус
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-sce-lightgray">
                  {processedRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-sce-lightgray/30">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-sce-primary">
                        {request.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-sce-secondary">
                        {request.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-sce-secondary">
                        {formatDate(new Date(request.createdAt))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-medium ${
                          request.status === 'APPROVED' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {request.status === 'APPROVED' ? 'Одобрено' : 'Отклонено'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-sm border border-sce-lightgray p-6 text-center">
            <p className="text-sce-secondary">
              Нет обработанных запросов на регистрацию.
            </p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default RegistrationsAdmin;
