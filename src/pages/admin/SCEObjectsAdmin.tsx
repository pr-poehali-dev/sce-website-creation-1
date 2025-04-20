import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import { useData } from '@/context/DataContext';
import { Shield, Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Classification } from '@/types';

const SCEObjectsAdmin: React.FC = () => {
  const { sceObjects, deleteSCEObject } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassification, setSelectedClassification] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Фильтрация объектов
  const filteredObjects = sceObjects
    .filter(obj => 
      (obj.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       obj.number.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedClassification ? obj.classification === selectedClassification : true)
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleDeleteObject = async (id: string) => {
    try {
      setIsDeleting(id);
      await deleteSCEObject(id);
    } catch (error) {
      console.error('Error deleting object:', error);
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Shield className="mr-2 h-6 w-6 text-sce-primary" />
          Управление SCE объектами
        </h1>
        <Link to="/admin/objects/create">
          <Button className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Создать новый объект
          </Button>
        </Link>
      </div>

      {/* Фильтры */}
      <div className="bg-white p-4 rounded-sm border border-sce-lightgray mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sce-accent h-4 w-4" />
              <input
                type="text"
                placeholder="Поиск по номеру или названию..."
                className="sce-input pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="md:w-1/3">
            <select
              className="sce-input w-full"
              value={selectedClassification}
              onChange={(e) => setSelectedClassification(e.target.value)}
            >
              <option value="">Все классификации</option>
              {Object.values(Classification).map((classification) => (
                <option key={classification} value={classification}>
                  {classification}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Таблица объектов */}
      {filteredObjects.length > 0 ? (
        <div className="bg-white rounded-sm border border-sce-lightgray overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-sce-lightgray">
              <thead className="bg-sce-lightgray">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sce-secondary uppercase tracking-wider">
                    Номер
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sce-secondary uppercase tracking-wider">
                    Название
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sce-secondary uppercase tracking-wider">
                    Классификация
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sce-secondary uppercase tracking-wider">
                    Автор
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sce-secondary uppercase tracking-wider">
                    Дата создания
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-sce-secondary uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-sce-lightgray">
                {filteredObjects.map((object) => (
                  <tr key={object.id} className="hover:bg-sce-lightgray/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-sce-primary">
                      {object.number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-sce-secondary">
                      {object.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-medium ${
                        object.classification === 'SAFE' ? 'bg-green-100 text-green-800' :
                        object.classification === 'EUCLID' ? 'bg-yellow-100 text-yellow-800' :
                        object.classification === 'KETER' ? 'bg-red-100 text-red-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {object.classification}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-sce-secondary">
                      {object.author.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-sce-secondary">
                      {new Date(object.createdAt).toLocaleDateString('ru-RU')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link to={`/objects/${object.id}`}>
                          <button className="text-sce-accent hover:text-sce-primary">
                            <Eye className="h-5 w-5" />
                          </button>
                        </Link>
                        <Link to={`/admin/objects/edit/${object.id}`}>
                          <button className="text-sce-accent hover:text-sce-primary">
                            <Edit className="h-5 w-5" />
                          </button>
                        </Link>
                        <button 
                          className="text-sce-accent hover:text-red-600"
                          onClick={() => handleDeleteObject(object.id)}
                          disabled={isDeleting === object.id}
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
          <Shield className="h-12 w-12 text-sce-lightgray mx-auto mb-4" />
          <h3 className="text-lg font-medium text-sce-secondary mb-2">Нет SCE объектов</h3>
          <p className="text-sce-accent mb-6">
            {searchQuery || selectedClassification 
              ? 'Нет объектов, соответствующих указанным критериям.' 
              : 'В базе данных пока нет SCE объектов.'}
          </p>
          <Link to="/admin/objects/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Создать первый объект
            </Button>
          </Link>
        </div>
      )}
    </AdminLayout>
  );
};

export default SCEObjectsAdmin;
