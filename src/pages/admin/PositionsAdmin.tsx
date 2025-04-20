import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { useData } from '@/context/DataContext';
import { Briefcase, Plus, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const PositionsAdmin: React.FC = () => {
  const { positions, createPosition, updatePosition, deletePosition } = useData();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    clearanceLevel: 1
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreatePosition = () => {
    setFormData({
      id: '',
      name: '',
      description: '',
      clearanceLevel: 1
    });
    setShowForm(true);
  };

  const handleEditPosition = (position: any) => {
    setFormData({
      id: position.id,
      name: position.name,
      description: position.description,
      clearanceLevel: position.clearanceLevel
    });
    setShowForm(true);
  };

  const handleDeletePosition = async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить эту должность? Это действие нельзя отменить.')) {
      try {
        setIsDeleting(id);
        setError(null);
        await deletePosition(id);
      } catch (err) {
        console.error('Error deleting position:', err);
        setError('Ошибка при удалении должности');
      } finally {
        setIsDeleting(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      if (formData.id) {
        // Обновление существующей должности
        await updatePosition(formData.id, {
          name: formData.name,
          description: formData.description,
          clearanceLevel: formData.clearanceLevel
        });
      } else {
        // Создание новой должности
        await createPosition({
          name: formData.name,
          description: formData.description,
          clearanceLevel: formData.clearanceLevel
        });
      }
      
      setShowForm(false);
    } catch (error) {
      console.error('Error saving position:', error);
      setError('Произошла ошибка при сохранении должности');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'clearanceLevel' ? parseInt(value) : value
    }));
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Briefcase className="mr-2 h-6 w-6 text-sce-primary" />
          Управление должностями
        </h1>
        <Button
          onClick={handleCreatePosition}
          className="flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Создать должность
        </Button>
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

      {/* Форма создания/редактирования должности */}
      {showForm && (
        <div className="bg-white rounded-sm border border-sce-lightgray p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-sce-primary">
            {formData.id ? 'Редактирование должности' : 'Создание новой должности'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-sce-secondary mb-1">
                Название должности *
              </label>
              <input
                type="text"
                name="name"
                className="sce-input w-full"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-sce-secondary mb-1">
                Описание должности *
              </label>
              <textarea
                name="description"
                rows={4}
                className="sce-input w-full"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-sce-secondary mb-1">
                Уровень доступа *
              </label>
              <select
                name="clearanceLevel"
                className="sce-input w-full"
                value={formData.clearanceLevel}
                onChange={handleChange}
                required
              >
                <option value={1}>1 - Базовый доступ</option>
                <option value={2}>2 - Ограниченный доступ</option>
                <option value={3}>3 - Стандартный доступ</option>
                <option value={4}>4 - Расширенный доступ</option>
                <option value={5}>5 - Полный доступ</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
                disabled={isSubmitting}
              >
                Отмена
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Сохранение...' : 'Сохранить'}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Список должностей */}
      {positions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {positions.map((position) => (
            <div 
              key={position.id}
              className="bg-white border border-sce-lightgray rounded-sm p-5"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-sce-primary">{position.name}</h3>
                <div className="flex space-x-2">
                  <button 
                    className="text-sce-accent hover:text-sce-primary"
                    onClick={() => handleEditPosition(position)}
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button 
                    className="text-sce-accent hover:text-red-600"
                    onClick={() => handleDeletePosition(position.id)}
                    disabled={isDeleting === position.id}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-medium bg-blue-100 text-blue-800">
                    Уровень доступа: {position.clearanceLevel}
                  </span>
                </div>
                
                <p className="text-sm text-sce-secondary">{position.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-sm border border-sce-lightgray p-8 text-center">
          <Briefcase className="h-12 w-12 text-sce-lightgray mx-auto mb-4" />
          <h3 className="text-lg font-medium text-sce-secondary mb-2">Должности не найдены</h3>
          <p className="text-sce-accent mb-6">
            В базе данных пока нет должностей.
          </p>
          <Button onClick={handleCreatePosition}>
            <Plus className="mr-2 h-4 w-4" />
            Создать первую должность
          </Button>
        </div>
      )}
    </AdminLayout>
  );
};

export default PositionsAdmin;
