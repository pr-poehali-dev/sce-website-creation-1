import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useData } from '@/context/DataContext';
import { Shield, Search, Filter, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Classification } from '@/types';

const ObjectsList: React.FC = () => {
  const { sceObjects } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClassification, setSelectedClassification] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Фильтрация и сортировка объектов
  const filteredObjects = sceObjects
    .filter(obj => 
      (obj.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       obj.number.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedClassification ? obj.classification === selectedClassification : true)
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.number.localeCompare(b.number, undefined, { numeric: true });
      } else {
        return b.number.localeCompare(a.number, undefined, { numeric: true });
      }
    });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h1 className="text-3xl font-bold flex items-center mb-4 md:mb-0">
            <Shield className="mr-2 h-8 w-8 text-sce-primary" />
            Архив SCE объектов
          </h1>
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleSortOrder}
              className="flex items-center text-sce-secondary hover:text-sce-primary"
            >
              <ArrowUpDown className="mr-1 h-4 w-4" />
              {sortOrder === 'asc' ? 'По возрастанию' : 'По убыванию'}
            </button>
          </div>
        </div>

        {/* Фильтры */}
        <div className="bg-white p-4 rounded-sm border border-sce-lightgray mb-8">
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
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sce-accent h-4 w-4" />
                <select
                  className="sce-input pl-10 w-full appearance-none"
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
        </div>

        {/* Список объектов */}
        {filteredObjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredObjects.map((object) => (
              <Link 
                key={object.id} 
                to={`/objects/${object.id}`}
                className="bg-white border border-sce-lightgray rounded-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-sce-primary font-semibold">{object.number}</span>
                  <span className={`text-xs px-2 py-1 rounded-sm ${getClassColor(object.classification)}`}>
                    {object.classification}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">{object.name}</h3>
                <p className="text-sce-secondary mb-4 line-clamp-3">{object.description}</p>
                <div className="flex items-center justify-between text-sm text-sce-accent">
                  <span>Автор: {object.author.username}</span>
                  <span>{new Date(object.createdAt).toLocaleDateString('ru-RU')}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-sm border border-sce-lightgray p-8 text-center">
            <Shield className="h-16 w-16 text-sce-lightgray mx-auto mb-4" />
            <h3 className="text-xl font-medium text-sce-secondary mb-2">Объекты не найдены</h3>
            <p className="text-sce-accent mb-6">
              {searchQuery || selectedClassification 
                ? 'Нет объектов, соответствующих указанным критериям.' 
                : 'В базе данных пока нет SCE объектов.'}
            </p>
            {!searchQuery && !selectedClassification && (
              <Button onClick={() => window.location.href = '/'}>
                Вернуться на главную
              </Button>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ObjectsList;
