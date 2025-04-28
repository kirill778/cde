import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Folder, 
  Download, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  Eye,
  MessageSquare,
  MoreVertical,
  ArrowUpRight,
  Users,
  Calendar
} from 'lucide-react';

interface Document {
  id: number;
  name: string;
  type: string;
  category: 'architectural' | 'structural' | 'mechanical' | 'electrical' | 'other';
  status: 'approved' | 'pending' | 'rejected' | 'in-review';
  created: string;
  updated: string;
  author: string;
  size: string;
  version: string;
  comments: number;
  views: number;
}

const documents: Document[] = [
  {
    id: 1,
    name: 'Архитектурная концепция',
    type: 'PDF',
    category: 'architectural',
    status: 'approved',
    created: '12 августа 2023',
    updated: '15 сентября 2023',
    author: 'Алексей Чен',
    size: '12.5 МБ',
    version: '1.4',
    comments: 8,
    views: 24
  },
  {
    id: 2,
    name: 'Расчет фундамента',
    type: 'XLSX',
    category: 'structural',
    status: 'in-review',
    created: '20 августа 2023',
    updated: '5 октября 2023',
    author: 'Давид Ким',
    size: '3.2 МБ',
    version: '2.1',
    comments: 12,
    views: 18
  },
  {
    id: 3,
    name: 'План вентиляции',
    type: 'DWG',
    category: 'mechanical',
    status: 'pending',
    created: '3 сентября 2023',
    updated: '3 сентября 2023',
    author: 'Сара Вильсон',
    size: '18.7 МБ',
    version: '1.0',
    comments: 3,
    views: 7
  },
  {
    id: 4,
    name: 'Расчет электрических нагрузок',
    type: 'XLSX',
    category: 'electrical',
    status: 'rejected',
    created: '8 сентября 2023',
    updated: '14 сентября 2023',
    author: 'Сара Вильсон',
    size: '4.3 МБ',
    version: '1.2',
    comments: 15,
    views: 12
  },
  {
    id: 5,
    name: 'Фасады здания',
    type: 'PDF',
    category: 'architectural',
    status: 'approved',
    created: '25 августа 2023',
    updated: '18 сентября 2023',
    author: 'Алексей Чен',
    size: '24.1 МБ',
    version: '2.0',
    comments: 5,
    views: 31
  },
  {
    id: 6,
    name: 'Сметная документация',
    type: 'XLSX',
    category: 'other',
    status: 'approved',
    created: '1 сентября 2023',
    updated: '10 октября 2023',
    author: 'Мария Гарсия',
    size: '8.7 МБ',
    version: '3.2',
    comments: 22,
    views: 45
  }
];

const categoryMap: Record<string, {label: string, color: string}> = {
  'architectural': { label: 'Архитектура', color: 'bg-blue-100 text-blue-800' },
  'structural': { label: 'Конструкции', color: 'bg-green-100 text-green-800' },
  'mechanical': { label: 'Механика', color: 'bg-yellow-100 text-yellow-800' },
  'electrical': { label: 'Электрика', color: 'bg-red-100 text-red-800' },
  'other': { label: 'Прочее', color: 'bg-purple-100 text-purple-800' }
};

const statusMap: Record<string, {icon: React.ElementType, color: string}> = {
  'approved': { icon: CheckCircle2, color: 'text-green-600' },
  'pending': { icon: Clock, color: 'text-yellow-600' },
  'rejected': { icon: XCircle, color: 'text-red-600' },
  'in-review': { icon: Eye, color: 'text-blue-600' }
};

const statusLabels: Record<string, string> = {
  'approved': 'Утверждено',
  'pending': 'Ожидает проверки',
  'rejected': 'Отклонено',
  'in-review': 'На рассмотрении'
};

const DocumentsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = searchTerm === '' || 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.author.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = selectedCategory === null || doc.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Documents Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm md:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Управление документами</h2>
          <p className="text-gray-600 mb-4">
            В проекте содержится 156 документов разных типов. Текущий статус: 68 документов утверждено,
            42 на рассмотрении, 36 ожидают проверки, 10 отклонено.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Утверждено</p>
              <p className="text-xl font-bold text-green-600">68</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">На рассмотрении</p>
              <p className="text-xl font-bold text-blue-600">42</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Ожидает проверки</p>
              <p className="text-xl font-bold text-yellow-600">36</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Отклонено</p>
              <p className="text-xl font-bold text-red-600">10</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Категории документов</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Архитектура</span>
                <span className="text-gray-900 font-medium">54</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Конструкции</span>
                <span className="text-gray-900 font-medium">42</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '27%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Механика</span>
                <span className="text-gray-900 font-medium">28</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '18%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Электрика</span>
                <span className="text-gray-900 font-medium">22</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full" style={{ width: '14%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Прочее</span>
                <span className="text-gray-900 font-medium">10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '6%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Document Management */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900">Документы проекта</h2>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Поиск документов..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <Filter className="h-5 w-5 text-gray-600" />
              </button>
              <button className="text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Folder className="h-4 w-4" />
                <span className="hidden sm:inline">Добавить</span>
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <button 
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                selectedCategory === null ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              Все
            </button>
            {Object.entries(categoryMap).map(([key, { label, color }]) => (
              <button 
                key={key}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedCategory === key ? 'bg-gray-900 text-white' : color + ' hover:opacity-80'
                }`}
                onClick={() => setSelectedCategory(key as 'architectural' | 'structural' | 'mechanical' | 'electrical' | 'other')}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Название
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Категория
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Статус
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Автор
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Обновлено
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Версия
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Активность
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc) => {
                  const StatusIcon = statusMap[doc.status].icon;
                  return (
                    <tr key={doc.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-blue-50 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                            <div className="text-xs text-gray-500">{doc.type} • {doc.size}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${categoryMap[doc.category].color}`}>
                          {categoryMap[doc.category].label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <StatusIcon className={`h-4 w-4 ${statusMap[doc.status].color}`} />
                          <span className="text-sm text-gray-700">{statusLabels[doc.status]}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {doc.author}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {doc.updated}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        v{doc.version}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Eye className="h-4 w-4" />
                            {doc.views}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <MessageSquare className="h-4 w-4" />
                            {doc.comments}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1 rounded-md hover:bg-gray-100">
                            <Download className="h-4 w-4 text-gray-600" />
                          </button>
                          <button className="p-1 rounded-md hover:bg-gray-100">
                            <MoreVertical className="h-4 w-4 text-gray-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    Документы не найдены. Попробуйте изменить параметры поиска.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredDocuments.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Показано {filteredDocuments.length} из {documents.length} документов
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>
                Предыдущая
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                Следующая
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Recent Activity with Documents */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Последние действия с документами</h2>
          <button className="text-blue-600 text-sm font-medium flex items-center gap-1">
            Показать все <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              {
                user: 'Алексей Чен',
                action: 'обновил документ',
                document: 'Архитектурная концепция',
                time: '2 часа назад',
              },
              {
                user: 'Мария Гарсия',
                action: 'утвердила документ',
                document: 'Сметная документация',
                time: '4 часа назад',
              },
              {
                user: 'Давид Ким',
                action: 'добавил комментарий к',
                document: 'Расчет фундамента',
                time: '6 часов назад',
              },
              {
                user: 'Сара Вильсон',
                action: 'загрузила новую версию',
                document: 'План вентиляции',
                time: '1 день назад',
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
                    <p className="text-sm text-blue-600">{activity.document}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </p>
                      <button className="text-xs text-blue-600">
                        Посмотреть
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsPage; 