import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { Users, Search, Edit, Trash2, Shield, UserX, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { UserRole } from '@/types';

const UsersAdmin: React.FC = () => {
  const { getUsers, updateUser, deleteUser } = useData();
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState(() => getUsers());
  const [searchQuery, setSearchQuery] = useState('');
  const [processing, setProcessing] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<{ id: string, role: UserRole, clearanceLevel: number } | null>(null);

  // Обновление списка пользователей при изменениях
  const refreshUsers = () => {
    setUsers(getUsers());
  };

  // Фильтрация пользователей
  const filteredUsers = users
    .filter(u => 
      u.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      // Администраторы в начале списка
      if (a.role === 'ADMIN' && b.role !== 'ADMIN') return -1;
      if (a.role !== 'ADMIN' && b.role === 'ADMIN') return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  const handleEditUser = (user: { id: string, role: UserRole, clearanceLevel: number }) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;
    
    try {
      setProcessing(editingUser.id);
      setError(null);
      await updateUser(editingUser.id, {
        role: editingUser.role,
        clearanceLevel: editingUser.clearanceLevel
      });
      refreshUsers();
      setEditingUser(null);
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Ошибка при обновлении пользователя');
    } finally {
      setProcessing(null);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этого пользователя? Это действие нельзя отменить.')) {
      try {
        setProcessing(id);
        setError(null);
        await deleteUser(id);
        refreshUsers();
      } catch (err) {
        console.error('Error deleting user:', err);
        setError('Ошибка при удалении пользователя');
      } finally {
        setProcessing(null);
      }
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold flex items-center mb-6">
        <Users className="mr-2 h-6 w-6 text-sce-primary" />
        Управление пользователями
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

      {/* Поиск пользователей */}
      <div className="bg-white p-4 rounded-sm border border-sce-lightgray mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sce-accent h-4 w-4" />
          <input
            type="text"
            placeholder="Поиск по имени, email или роли..."
            className="sce-input pl-10 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Редактирование пользователя (модальное окно) */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-sm p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-sce-primary">Редактирование пользователя</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-sce-secondary mb-1">
                Роль пользователя
              </label>
              <select
                className="sce-input w-full"
                value={editingUser.role}
                onChange={(e) => setEditingUser({
                  ...editingUser,
                  role: e.target.value as UserRole
                })}
              >
                {Object.values(UserRole).map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-sce-secondary mb-1">
                Уровень доступа
              </label>
              <select
                className="sce-input w-full"
                value={editingUser.clearanceLevel}
                onChange={(e) => setEditingUser({
                  ...editingUser,
                  clearanceLevel: parseInt(e.target.value)
                })}
              >
                {[1, 2, 3, 4, 5].map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setEditingUser(null)}
                disabled={processing === editingUser.id}
              >
                Отмена
              </Button>
              <Button
                onClick={handleUpdateUser}
                disabled={processing === editingUser.id}
              >
                {processing === editingUser.id ? 'Сохранение...' : 'Сохранить'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Таблица пользователей */}
      <div className="bg-white rounded-sm border border-sce-lightgray overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-sce-lightgray">
            <thead className="bg-sce-lightgray">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sce-secondary uppercase tracking-wider">
                  Пользователь
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sce-secondary uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sce-secondary uppercase tracking-wider">
                  Роль
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sce-secondary uppercase tracking-wider">
                  Уровень доступа
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-sce-secondary uppercase tracking-wider">
                  Дата регистрации
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-sce-secondary uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-sce-lightgray">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-sce-lightgray/30">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-sce-secondary text-white rounded-full flex items-center justify-center">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-sce-primary">{user.username}</div>
                        {user.id === currentUser?.id && (
                          <div className="text-xs text-sce-accent">(Текущий пользователь)</div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sce-secondary">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-medium ${
                      user.role === 'ADMIN' 
                        ? 'bg-red-100 text-red-800' 
                        : user.role === 'MODERATOR'
                        ? 'bg-blue-100 text-blue-800'
                        : user.role === 'RESEARCHER'
                        ? 'bg-green-100 text-green-800'
                        : user.role === 'AGENT'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sce-secondary">
                    {user.clearanceLevel}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-sce-secondary">
                    {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditUser({
                          id: user.id,
                          role: user.role as UserRole,
                          clearanceLevel: user.clearanceLevel
                        })}
                        disabled={processing === user.id || user.id === currentUser?.id}
                        className="text-sce-accent hover:text-sce-primary"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {user.id !== currentUser?.id && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={processing === user.id}
                          className="text-sce-accent hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UsersAdmin;
