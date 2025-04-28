import React, { useState } from 'react';
import {
  Building2,
  Users,
  FolderTree,
  Calendar,
  Bell,
  Search,
  Menu,
  Settings,
  HelpCircle,
  User,
  FileText,
  Eye,
  MessageSquare,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Box,
} from 'lucide-react';
import ModelViewer from './components/IFCViewer';
import TeamPage from './components/TeamPage';
import SchedulePage from './components/SchedulePage';
import DocumentsPage from './components/DocumentsPage';
import SettingsPage from './components/SettingsPage';
import SupportPage from './components/SupportPage';

function App() {
  const [activeProject, setActiveProject] = useState('Проект Альфа');
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    if (activeTab === 'models') {
      return <ModelViewer />;
    }

    if (activeTab === 'team') {
      return <TeamPage />;
    }

    if (activeTab === 'schedule') {
      return <SchedulePage />;
    }
    
    if (activeTab === 'documents') {
      return <DocumentsPage />;
    }
    
    if (activeTab === 'settings') {
      return <SettingsPage />;
    }
    
    if (activeTab === 'support') {
      return <SupportPage />;
    }

    return (
      <>
        {/* Project Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Eye, label: 'Активные проверки', value: '24', status: 'normal' },
            { icon: MessageSquare, label: 'Открытые вопросы', value: '15', status: 'warning' },
            { icon: AlertTriangle, label: 'Обнаружено коллизий', value: '8', status: 'error' },
            { icon: CheckCircle2, label: 'Утверждено документов', value: '45', status: 'success' },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${
                  {
                    normal: 'bg-blue-50 text-blue-600',
                    warning: 'bg-yellow-50 text-yellow-600',
                    error: 'bg-red-50 text-red-600',
                    success: 'bg-green-50 text-green-600',
                  }[stat.status]
                }`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
              <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Последние действия</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                {
                  user: 'Алексей Чен',
                  action: 'загрузил новую версию модели',
                  file: 'structural-model-v2.rvt',
                  time: '10 минут назад',
                },
                {
                  user: 'Мария Гарсия',
                  action: 'разрешила коллизию',
                  file: 'MEP-architectural.nwd',
                  time: '1 час назад',
                },
                {
                  user: 'Давид Ким',
                  action: 'начал новую проверку',
                  file: 'facade-details.dwg',
                  time: '2 часа назад',
                },
                {
                  user: 'Сара Вильсон',
                  action: 'утвердила документ',
                  file: 'foundation-plan.pdf',
                  time: '3 часа назад',
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-medium">
                        {activity.user.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {activity.user} <span className="text-gray-500">{activity.action}</span>
                      </p>
                      <p className="text-sm text-blue-600">{activity.file}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a365d] text-white hidden md:flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Building2 className="h-8 w-8" />
            BIM Hub
          </h1>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {[
              { icon: Building2, text: 'Проекты', id: 'dashboard', active: activeTab === 'dashboard' },
              { icon: Box, text: 'Модели', id: 'models', active: activeTab === 'models' },
              { icon: FolderTree, text: 'Управление документами', id: 'documents', active: activeTab === 'documents' },
              { icon: Users, text: 'Команда', id: 'team', active: activeTab === 'team' },
              { icon: Calendar, text: 'Расписание', id: 'schedule', active: activeTab === 'schedule' },
              { icon: Settings, text: 'Настройки', id: 'settings', active: activeTab === 'settings' },
              { icon: HelpCircle, text: 'Поддержка', id: 'support', active: activeTab === 'support' },
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm ${
                    item.active
                      ? 'bg-white/10 text-white'
                      : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск проектов, документов или участников команды..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100">
                <User className="h-6 w-6 text-gray-600" />
                <span className="hidden md:inline text-sm text-gray-700">Иван Петров</span>
              </button>
            </div>
          </div>
        </header>

        {/* Project Content */}
        <div className="p-6 max-w-7xl mx-auto">
          {/* Project Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{activeProject}</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Загрузить файлы
                </button>
                <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                  Поделиться
                </button>
              </div>
            </div>
            <div className="flex gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                12 участников
              </span>
              <span className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                156 документов
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Обновлено 2 часа назад
              </span>
            </div>
          </div>

          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;