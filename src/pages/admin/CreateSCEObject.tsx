import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { Shield, Save, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import {
  Classification,
  ContainmentClass,
  DisruptionClass,
  RiskClass
} from '@/types';

const CreateSCEObject: React.FC = () => {
  const { createSCEObject } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    number: '',
    name: '',
    classification: Classification.UNCLASSIFIED,
    containmentClass: ContainmentClass.PENDING,
    disruptionClass: DisruptionClass.DARK,
    riskClass: RiskClass.NOTICE,
    description: '',
    specialContainmentProcedures: ''
  });

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
    
    // Валидация
    if (!formData.number || !formData.name || !formData.description || !formData.specialContainmentProcedures) {
      setError('Пожалуйста, заполните все обязательные поля');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      if (!user) {
        throw new Error('Пользователь не авторизован');
      }
      
      await createSCEObject({
        ...formData,
        author: user
      });
      
      navigate('/admin/objects');
    } catch (error) {
      console.error('Error creating SCE object:', error);
      setError('Произошла ошибка при создании объекта');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Shield className="mr-2 h-6 w-6 text-sce-primary" />
          Создание нового SCE объекта
        </h1>
        <Button 
          variant="outline" 
          onClick={() => navigate('/admin/objects')}
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
          <h2 className="text-xl font-bold mb-4 text-sce-primary">Основная информация</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="number" className="block text-sm font-medium text-sce-secondary mb-1">
                Номер объекта *
              </label>
              <input
                type="text"
                id="number"
                name="number"
                className="sce-input w-full"
                placeholder="SCE-001"
                value={formData.number}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-sce-secondary mb-1">
                Название объекта *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="sce-input w-full"
                placeholder="Название объекта"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div>
              <label htmlFor="classification" className="block text-sm font-medium text-sce-secondary mb-1">
                Основная классификация
              </label>
              <select
                id="classification"
                name="classification"
                className="sce-input w-full"
                value={formData.classification}
                onChange={handleChange}
              >
                {Object.values(Classification).map((classification) => (
                  <option key={classification} value={classification}>
                    {classification}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="containmentClass" className="block text-sm font-medium text-sce-secondary mb-1">
                Класс содержания
              </label>
              <select
                id="containmentClass"
                name="containmentClass"
                className="sce-input w-full"
                value={formData.containmentClass}
                onChange={handleChange}
              >
                {Object.values(ContainmentClass).map((containmentClass) => (
                  <option key={containmentClass} value={containmentClass}>
                    {containmentClass}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="disruptionClass" className="block text-sm font-medium text-sce-secondary mb-1">
                Класс разрушения
              </label>
              <select
                id="disruptionClass"
                name="disruptionClass"
                className="sce-input w-full"
                value={formData.disruptionClass}
                onChange={handleChange}
              >
                {Object.values(DisruptionClass).map((disruptionClass) => (
                  <option key={disruptionClass} value={disruptionClass}>
                    {disruptionClass}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="riskClass" className="block text-sm font-medium text-sce-secondary mb-1">
                Класс риска
              </label>
              <select
                id="riskClass"
                name="riskClass"
                className="sce-input w-full"
                value={formData.riskClass}
                onChange={handleChange}
              >
                {Object.values(RiskClass).map((riskClass) => (
                  <option key={riskClass} value={riskClass}>
                    {riskClass}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-sm border border-sce-lightgray p-6 mb-6">
          <h2 className="text-xl font-bold mb-4 text-sce-primary">Описание</h2>
          
          <div className="mb-6">
            <label htmlFor="description" className="block text-sm font-medium text-sce-secondary mb-1">
              Описание объекта *
            </label>
            <textarea
              id="description"
              name="description"
              rows={6}
              className="sce-input w-full"
              placeholder="Детальное описание объекта..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="specialContainmentProcedures" className="block text-sm font-medium text-sce-secondary mb-1">
              Специальные условия содержания *
            </label>
            <textarea
              id="specialContainmentProcedures"
              name="specialContainmentProcedures"
              rows={6}
              className="sce-input w-full"
              placeholder="Описание процедур содержания объекта..."
              value={formData.specialContainmentProcedures}
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
            onClick={() => navigate('/admin/objects')}
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
                Создать объект
              </>
            )}
          </Button>
        </div>
      </form>
    </AdminLayout>
  );
};

export default CreateSCEObject;
