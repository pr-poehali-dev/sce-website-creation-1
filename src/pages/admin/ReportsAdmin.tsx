import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import { useData } from '@/context/DataContext';
import { FileText, Plus, Search, Edit, Trash2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ReportStatus } from '@/types';

const ReportsAdmin: React.FC = () => {
  const { reports, updateReport, deleteReport } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Фильтрация отчетов
  const filteredReports = reports
    .filter(report => 
      (report.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
       report.content.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (statusFilter ? report.status === statusFilter : true)
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleDeleteReport = async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот отчет? Это действие нельзя отменить.')) {
      try {
        setIsProcessing(id);
        setError(null);
        await deleteReport(id);
      } catch (err) {
        console.error('Error deleting report:', err);
        setError('Ошибка при удалении отчета');
      } finally {
        setIsProcessing(null);
      }
    }
  };

  const handleUpdateStatus = async (id: string, status: ReportStatus) => {
    try {
      setIsProcessing(id);
      setError(null);
      await updateReport(id, { status });
    } catch (err) {
      console.error('Error updating report status:', err);
      setError('Ошибка при обновлении статуса отчета');
    } finally {
      setIsProcessing(null);
    }
  };

  const getStatusBadge = (status: ReportStatus) => {
    switch (status) {
      case 'DRAFT':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-medium bg-gray-100 text-gray-800">Черновик</span>;
      case 'SUBMITTED':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-medium bg-blue-100 text-blue-800">На рассмотрении</span>;
      case 'APPROVED':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-medium bg-green-100 text-green-800">Одобрен</span>;
      case 'REJECTED':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-medium bg-red-100 text-red-800">Отклонен</span>;
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <FileText className="mr-2 h-6 w-6 text-sce-primary" />
          Управление отчетами
        </h1>
        <Link to="/admin/reports/create">
          <Button className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Создать отчет
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

      {/* Фильтры отчетов */}
      <div className="bg-white p-4 rounded-sm border border-sce-lightgray mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
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
          <div className="md:w-1/3">
            <select
              className="sce-input w-full"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Все статусы</option>
              {Object.values(ReportStatus).map((status) => (
                <option key={status} value={status}>
                  {status === 'DRAFT' ? 'Черновик' :
                   status === 'SUBMITTED' ? 'На рассмотрении' :
                   status === 'APPROVED' ? 'Одобрен' : 'Отклонен'}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Таблица отчетов */}
      {filteredReports.length > 0 ? (
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
                    Дата создания
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sce-secondary uppercase tracking-wider">
                    Статус
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-sce-secondary uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-sce-lightgray">
                {filteredReports.map((report) => (
                  <tr key={report.id} className="hover:bg-sce-lightgray/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-sce-primary">
                      {report.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-sce-secondary">
                      {report.author.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-sce-secondary">
                      {new Date(report.createdAt).toLocaleDateString('ru-RU')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(report.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        {report.status === 'SUBMITTED' && (
                          <>
                            <button 
                              className="text-green-500 hover:text-green-700"
                              onClick={() => handleUpdateStatus(report.id, ReportStatus.APPROVED)}
                              disabled={isProcessing === report.id}
                            >
                              <CheckCircle className="h-5 w-5" />
                            </button>
                            <button 
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleUpdateStatus(report.id, ReportStatus.REJECTED)}
                              disabled={isProcessing === report.id}
                            >
                              <XCircle className="h-5 w-5" />
                            </button>
                          </>
                        )}
                        <Link to={`/admin/reports/edit/${report.id}`}>
                          <button className="text-sce-accent hover:text-sce-primary">
                            <Edit className="h-5 w-5" />
                          </button>
                        </Link>
                        <button 
                          className="text-sce-accent hover:text-red-600"
                          onClick={() => handleDeleteReport(report.id)}
                          disabled={isProcessing === report.id}
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
          <FileText className="h-12 w-12 text-sce-lightgray mx-auto mb-4" />
          <h3 className="text-lg font-medium text-sce-secondary mb-2">Отчеты не найдены</h3>
          <p className="text-sce-accent mb-6">
            {searchQuery || statusFilter
              ? 'Нет отчетов, соответствующих указанным критериям.'
              : 'В базе данных пока нет отчетов.'}
          </p>
          <Link to="/admin/reports/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Создать первый отчет
            </Button>
          </Link>
        </div>
      )}
    </AdminLayout>
  );
};

export default ReportsAdmin;
