import React, { useState } from 'react';
import { 
  User, 
  Bell, 
  Shield, 
  Monitor, 
  Layers, 
  Save,
  Globe,
  Mail,
  Phone,
  Building,
  Settings,
  ToggleLeft,
  ToggleRight,
  ExternalLink,
  Check,
  X,
  Info,
  AlertTriangle
} from 'lucide-react';

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

interface IntegrationSetting {
  id: string;
  name: string;
  icon: string;
  status: 'connected' | 'disconnected';
  lastSync?: string;
}

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [language, setLanguage] = useState('ru');
  const [darkMode, setDarkMode] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    {
      id: 'document_updates',
      label: 'Обновления документов',
      description: 'Уведомления об изменениях в документах',
      enabled: true
    },
    {
      id: 'comments',
      label: 'Комментарии',
      description: 'Уведомления о новых комментариях',
      enabled: true
    },
    {
      id: 'deadlines',
      label: 'Дедлайны',
      description: 'Напоминания о приближающихся сроках',
      enabled: true
    },
    {
      id: 'mentions',
      label: 'Упоминания',
      description: 'Уведомления при упоминании вас в комментариях',
      enabled: true
    },
    {
      id: 'project_updates',
      label: 'Обновления проектов',
      description: 'Уведомления о общих изменениях в проектах',
      enabled: false
    }
  ]);
  
  const [integrations, setIntegrations] = useState<IntegrationSetting[]>([
    {
      id: 'revit',
      name: 'Autodesk Revit',
      icon: 'AR',
      status: 'connected',
      lastSync: '10 октября 2023'
    },
    {
      id: 'autocad',
      name: 'AutoCAD',
      icon: 'AC',
      status: 'connected',
      lastSync: '8 октября 2023'
    },
    {
      id: 'navisworks',
      name: 'Navisworks',
      icon: 'NW',
      status: 'disconnected'
    },
    {
      id: 'sketchup',
      name: 'SketchUp',
      icon: 'SU',
      status: 'disconnected'
    }
  ]);

  const [userInfo, setUserInfo] = useState({
    name: 'Иван Петров',
    email: 'ivan.petrov@bimhub.ru',
    phone: '+7 (999) 123-45-67',
    position: 'BIM-менеджер',
    department: 'BIM-отдел',
    company: 'BIM Hub Ltd.'
  });

  const [projectSettings, setProjectSettings] = useState({
    measurementUnit: 'metric',
    timezone: 'Europe/Moscow',
    dateFormat: 'DD.MM.YYYY',
    coordinateSystem: 'WGS 84',
    autoSave: true
  });

  const toggleNotification = (id: string) => {
    setNotificationSettings(prev =>
      prev.map(setting =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const toggleIntegration = (id: string) => {
    setIntegrations(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              status: item.status === 'connected' ? 'disconnected' : 'connected',
              lastSync: item.status === 'disconnected' ? new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) : item.lastSync
            }
          : item
      )
    );
  };

  const renderTab = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            {/* Profile Information */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Информация профиля</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Должность</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userInfo.position}
                    onChange={(e) => setUserInfo({...userInfo, position: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Отдел</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userInfo.department}
                    onChange={(e) => setUserInfo({...userInfo, department: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Компания</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userInfo.company}
                    onChange={(e) => setUserInfo({...userInfo, company: e.target.value})}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Сохранить изменения
                </button>
              </div>
            </div>

            {/* Avatar */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Аватар</h3>
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-medium text-2xl">ИП</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-3">
                    Загрузите изображение в формате JPG, GIF или PNG. Максимальный размер 2MB.
                  </p>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                      Загрузить
                    </button>
                    <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Language and Region */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Язык и регион</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Язык интерфейса</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                    <option value="de">Deutsch</option>
                    <option value="fr">Français</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Формат даты</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={projectSettings.dateFormat}
                    onChange={(e) => setProjectSettings({...projectSettings, dateFormat: e.target.value})}
                  >
                    <option value="DD.MM.YYYY">DD.MM.YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Часовой пояс</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={projectSettings.timezone}
                    onChange={(e) => setProjectSettings({...projectSettings, timezone: e.target.value})}
                  >
                    <option value="Europe/Moscow">Москва (GMT+3)</option>
                    <option value="Europe/London">Лондон (GMT+0)</option>
                    <option value="America/New_York">Нью-Йорк (GMT-5)</option>
                    <option value="Asia/Tokyo">Токио (GMT+9)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Единицы измерения</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={projectSettings.measurementUnit}
                    onChange={(e) => setProjectSettings({...projectSettings, measurementUnit: e.target.value})}
                  >
                    <option value="metric">Метрическая (м, км)</option>
                    <option value="imperial">Имперская (футы, дюймы)</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Сохранить изменения
                </button>
              </div>
            </div>

            {/* Theme Settings */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Настройки темы</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Темная тема</p>
                  <p className="text-sm text-gray-600">Переключить на темную тему интерфейса</p>
                </div>
                <button 
                  onClick={() => setDarkMode(!darkMode)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  {darkMode ? (
                    <ToggleRight className="h-8 w-8 text-blue-600" />
                  ) : (
                    <ToggleLeft className="h-8 w-8 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            {/* Email Notifications */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Настройки уведомлений</h3>
              <p className="text-gray-600 mb-6">
                Укажите, какие уведомления вы хотите получать по электронной почте и в приложении
              </p>
              <div className="space-y-4">
                {notificationSettings.map((setting) => (
                  <div key={setting.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="font-medium text-gray-900">{setting.label}</p>
                      <p className="text-sm text-gray-600">{setting.description}</p>
                    </div>
                    <button 
                      onClick={() => toggleNotification(setting.id)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      {setting.enabled ? (
                        <ToggleRight className="h-8 w-8 text-blue-600" />
                      ) : (
                        <ToggleLeft className="h-8 w-8 text-gray-400" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Notification Channels */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Каналы уведомлений</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-600">Уведомления на адрес {userInfo.email}</p>
                    </div>
                  </div>
                  <div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                      Активен
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Bell className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Браузер</p>
                      <p className="text-sm text-gray-600">Push-уведомления в браузере</p>
                    </div>
                  </div>
                  <div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                      Разрешите в браузере
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Phone className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">SMS</p>
                      <p className="text-sm text-gray-600">Текстовые сообщения на {userInfo.phone}</p>
                    </div>
                  </div>
                  <div>
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">
                      Неактивен
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-600 text-sm">
                  <Info className="inline h-4 w-4 mr-1 text-blue-600" /> 
                  Для критических уведомлений мы всегда используем все доступные каналы связи.
                </p>
              </div>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6">
            {/* Password Settings */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Изменение пароля</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Текущий пароль</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Введите текущий пароль"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Новый пароль</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Введите новый пароль"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Подтверждение пароля</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Повторите новый пароль"
                  />
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <p>Пароль должен содержать минимум 8 символов, включая цифры, строчные и заглавные буквы.</p>
              </div>
              <div className="mt-6 flex justify-end">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Обновить пароль
                </button>
              </div>
            </div>

            {/* Two-Factor Authentication */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Двухфакторная аутентификация</h3>
                  <p className="text-gray-600 mt-1">
                    Добавьте дополнительный уровень безопасности для вашего аккаунта
                  </p>
                </div>
                <div>
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">
                    Выключено
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  <p className="text-sm text-gray-700">
                    Двухфакторная аутентификация не настроена. Это уменьшает безопасность вашего аккаунта.
                  </p>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Включить двухфакторную аутентификацию
              </button>
            </div>

            {/* Session Management */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Активные сессии</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Monitor className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Windows 10 - Chrome</p>
                      <p className="text-sm text-gray-600">Москва, Россия • Текущая сессия</p>
                    </div>
                  </div>
                  <div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                      Активна
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Monitor className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">macOS - Safari</p>
                      <p className="text-sm text-gray-600">Москва, Россия • Последний вход: 2 дня назад</p>
                    </div>
                  </div>
                  <div>
                    <button className="text-sm text-red-600 hover:text-red-800">
                      Завершить
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <button className="text-sm text-red-600 hover:text-red-800 font-medium">
                  Завершить все другие сессии
                </button>
              </div>
            </div>
          </div>
        );
      case 'integrations':
        return (
          <div className="space-y-6">
            {/* Connected Applications */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Подключенные приложения</h3>
              <p className="text-gray-600 mb-6">
                Управляйте интеграциями с внешними программами и сервисами
              </p>
              <div className="space-y-4">
                {integrations.map((app) => (
                  <div key={app.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium">{app.icon}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{app.name}</p>
                        {app.status === 'connected' && app.lastSync && (
                          <p className="text-xs text-gray-600">Последняя синхронизация: {app.lastSync}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {app.status === 'connected' ? (
                        <>
                          <span className="flex items-center gap-1 text-xs text-green-600">
                            <Check className="h-3 w-3" /> Подключено
                          </span>
                          <button
                            onClick={() => toggleIntegration(app.id)}
                            className="px-3 py-1 border border-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-50"
                          >
                            Отключить
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => toggleIntegration(app.id)}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                        >
                          Подключить
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* API Access */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">API Доступ</h3>
                  <p className="text-gray-600 mt-1">
                    Управление ключами API для программного доступа к платформе
                  </p>
                </div>
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                  Создать ключ API
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Info className="h-5 w-5 text-blue-600" />
                  <p className="text-sm text-gray-700">
                    У вас нет активных ключей API. Создайте ключ для интеграции с внешними системами.
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                  Документация по API <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Webhooks */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Webhooks</h3>
                  <p className="text-gray-600 mt-1">
                    Настройте уведомления о событиях на внешние URL
                  </p>
                </div>
                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                  Добавить webhook
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <Info className="h-5 w-5 text-blue-600" />
                  <p className="text-sm text-gray-700">
                    Webhooks позволяют получать уведомления о событиях в реальном времени
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Settings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Настройки</h2>
          <p className="text-gray-600 mb-4">
            Управляйте своим профилем, настройками уведомлений, безопасностью и интеграциями с другими сервисами
          </p>
          <div className="mt-4">
            <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-800 px-3 py-1 rounded-full text-sm">
              <AlertTriangle className="h-4 w-4" />
              Рекомендуется настроить двухфакторную аутентификацию
            </div>
          </div>
        </div>
      </div>

      {/* Settings Navigation */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {[
              { id: 'profile', label: 'Профиль', icon: User },
              { id: 'notifications', label: 'Уведомления', icon: Bell },
              { id: 'security', label: 'Безопасность', icon: Shield },
              { id: 'integrations', label: 'Интеграции', icon: Layers }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 flex items-center gap-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="p-6">
          {renderTab()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 