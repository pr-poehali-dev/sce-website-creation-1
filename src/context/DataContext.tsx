import React, { createContext, useContext, useState, useEffect } from 'react';
import { SCEObject, News, Report, RegistrationRequest, Position, User } from '@/types';

interface DataContextType {
  sceObjects: SCEObject[];
  news: News[];
  reports: Report[];
  registrationRequests: RegistrationRequest[];
  positions: Position[];
  
  // SCE объекты
  createSCEObject: (object: Omit<SCEObject, 'id' | 'createdAt' | 'updatedAt'>) => Promise<SCEObject>;
  updateSCEObject: (id: string, object: Partial<SCEObject>) => Promise<SCEObject>;
  deleteSCEObject: (id: string) => Promise<void>;
  
  // Новости
  createNews: (news: Omit<News, 'id' | 'createdAt' | 'updatedAt'>) => Promise<News>;
  updateNews: (id: string, news: Partial<News>) => Promise<News>;
  deleteNews: (id: string) => Promise<void>;
  
  // Отчеты
  createReport: (report: Omit<Report, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Report>;
  updateReport: (id: string, report: Partial<Report>) => Promise<Report>;
  deleteReport: (id: string) => Promise<void>;
  
  // Запросы на регистрацию
  approveRegistration: (id: string) => Promise<void>;
  rejectRegistration: (id: string) => Promise<void>;
  
  // Должности
  createPosition: (position: Omit<Position, 'id'>) => Promise<Position>;
  updatePosition: (id: string, position: Partial<Position>) => Promise<Position>;
  deletePosition: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sceObjects, setSceObjects] = useState<SCEObject[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [registrationRequests, setRegistrationRequests] = useState<RegistrationRequest[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  
  // Загрузка данных из localStorage при инициализации
  useEffect(() => {
    const loadedSceObjects = JSON.parse(localStorage.getItem('sce_objects') || '[]');
    const loadedNews = JSON.parse(localStorage.getItem('sce_news') || '[]');
    const loadedReports = JSON.parse(localStorage.getItem('sce_reports') || '[]');
    const loadedRegistrationRequests = JSON.parse(localStorage.getItem('sce_registration_requests') || '[]');
    const loadedPositions = JSON.parse(localStorage.getItem('sce_positions') || '[]');
    
    setSceObjects(loadedSceObjects);
    setNews(loadedNews);
    setReports(loadedReports);
    setRegistrationRequests(loadedRegistrationRequests);
    setPositions(loadedPositions);
  }, []);
  
  // Функции для работы с SCE объектами
  const createSCEObject = async (object: Omit<SCEObject, 'id' | 'createdAt' | 'updatedAt'>): Promise<SCEObject> => {
    const newObject: SCEObject = {
      ...object,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const updatedObjects = [...sceObjects, newObject];
    setSceObjects(updatedObjects);
    localStorage.setItem('sce_objects', JSON.stringify(updatedObjects));
    
    return newObject;
  };
  
  const updateSCEObject = async (id: string, object: Partial<SCEObject>): Promise<SCEObject> => {
    const index = sceObjects.findIndex(obj => obj.id === id);
    if (index === -1) throw new Error('SCE объект не найден');
    
    const updatedObject = {
      ...sceObjects[index],
      ...object,
      updatedAt: new Date(),
    };
    
    const updatedObjects = [...sceObjects];
    updatedObjects[index] = updatedObject;
    
    setSceObjects(updatedObjects);
    localStorage.setItem('sce_objects', JSON.stringify(updatedObjects));
    
    return updatedObject;
  };
  
  const deleteSCEObject = async (id: string): Promise<void> => {
    const updatedObjects = sceObjects.filter(obj => obj.id !== id);
    setSceObjects(updatedObjects);
    localStorage.setItem('sce_objects', JSON.stringify(updatedObjects));
  };
  
  // Функции для работы с новостями
  const createNews = async (newsItem: Omit<News, 'id' | 'createdAt' | 'updatedAt'>): Promise<News> => {
    const newNews: News = {
      ...newsItem,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const updatedNews = [...news, newNews];
    setNews(updatedNews);
    localStorage.setItem('sce_news', JSON.stringify(updatedNews));
    
    return newNews;
  };
  
  const updateNews = async (id: string, newsItem: Partial<News>): Promise<News> => {
    const index = news.findIndex(item => item.id === id);
    if (index === -1) throw new Error('Новость не найдена');
    
    const updatedNewsItem = {
      ...news[index],
      ...newsItem,
      updatedAt: new Date(),
    };
    
    const updatedNews = [...news];
    updatedNews[index] = updatedNewsItem;
    
    setNews(updatedNews);
    localStorage.setItem('sce_news', JSON.stringify(updatedNews));
    
    return updatedNewsItem;
  };
  
  const deleteNews = async (id: string): Promise<void> => {
    const updatedNews = news.filter(item => item.id !== id);
    setNews(updatedNews);
    localStorage.setItem('sce_news', JSON.stringify(updatedNews));
  };
  
  // Функции для работы с отчетами
  const createReport = async (report: Omit<Report, 'id' | 'createdAt' | 'updatedAt'>): Promise<Report> => {
    const newReport: Report = {
      ...report,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    const updatedReports = [...reports, newReport];
    setReports(updatedReports);
    localStorage.setItem('sce_reports', JSON.stringify(updatedReports));
    
    return newReport;
  };
  
  const updateReport = async (id: string, report: Partial<Report>): Promise<Report> => {
    const index = reports.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Отчет не найден');
    
    const updatedReport = {
      ...reports[index],
      ...report,
      updatedAt: new Date(),
    };
    
    const updatedReports = [...reports];
    updatedReports[index] = updatedReport;
    
    setReports(updatedReports);
    localStorage.setItem('sce_reports', JSON.stringify(updatedReports));
    
    return updatedReport;
  };
  
  const deleteReport = async (id: string): Promise<void> => {
    const updatedReports = reports.filter(r => r.id !== id);
    setReports(updatedReports);
    localStorage.setItem('sce_reports', JSON.stringify(updatedReports));
  };
  
  // Функции для работы с запросами на регистрацию
  const approveRegistration = async (id: string): Promise<void> => {
    const request = registrationRequests.find(r => r.id === id);
    if (!request) throw new Error('Запрос на регистрацию не найден');
    
    // Получаем текущих пользователей
    const usersString = localStorage.getItem('sce_users') || '[]';
    const users = JSON.parse(usersString);
    
    // Создаем нового пользователя
    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      email: request.email,
      username: request.username,
      password: 'default_password', // В реальном приложении должен быть сгенерирован и отправлен на почту
      role: UserRole.READER,
      clearanceLevel: 1,
      createdAt: new Date(),
    };
    
    // Сохраняем пользователя
    const updatedUsers = [...users, newUser];
    localStorage.setItem('sce_users', JSON.stringify(updatedUsers));
    
    // Обновляем статус запроса
    const updatedRequests = registrationRequests.map(r => 
      r.id === id ? { ...r, status: 'APPROVED' as const } : r
    );
    
    setRegistrationRequests(updatedRequests);
    localStorage.setItem('sce_registration_requests', JSON.stringify(updatedRequests));
  };
  
  const rejectRegistration = async (id: string): Promise<void> => {
    const updatedRequests = registrationRequests.map(r => 
      r.id === id ? { ...r, status: 'REJECTED' as const } : r
    );
    
    setRegistrationRequests(updatedRequests);
    localStorage.setItem('sce_registration_requests', JSON.stringify(updatedRequests));
  };
  
  // Функции для работы с должностями
  const createPosition = async (position: Omit<Position, 'id'>): Promise<Position> => {
    const newPosition: Position = {
      ...position,
      id: Date.now().toString(),
    };
    
    const updatedPositions = [...positions, newPosition];
    setPositions(updatedPositions);
    localStorage.setItem('sce_positions', JSON.stringify(updatedPositions));
    
    return newPosition;
  };
  
  const updatePosition = async (id: string, position: Partial<Position>): Promise<Position> => {
    const index = positions.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Должность не найдена');
    
    const updatedPosition = {
      ...positions[index],
      ...position,
    };
    
    const updatedPositions = [...positions];
    updatedPositions[index] = updatedPosition;
    
    setPositions(updatedPositions);
    localStorage.setItem('sce_positions', JSON.stringify(updatedPositions));
    
    return updatedPosition;
  };
  
  const deletePosition = async (id: string): Promise<void> => {
    const updatedPositions = positions.filter(p => p.id !== id);
    setPositions(updatedPositions);
    localStorage.setItem('sce_positions', JSON.stringify(updatedPositions));
  };
  
  return (
    <DataContext.Provider value={{
      sceObjects,
      news,
      reports,
      registrationRequests,
      positions,
      createSCEObject,
      updateSCEObject,
      deleteSCEObject,
      createNews,
      updateNews,
      deleteNews,
      createReport,
      updateReport,
      deleteReport,
      approveRegistration,
      rejectRegistration,
      createPosition,
      updatePosition,
      deletePosition,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
