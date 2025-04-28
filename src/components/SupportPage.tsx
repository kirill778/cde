import React, { useState } from 'react';
import { 
  Search, 
  HelpCircle, 
  Book, 
  FileText,
  MessageSquare, 
  Phone, 
  Mail, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp,
  ArrowRight,
  CheckCircle2,
  Clock,
  Send,
  Eye
} from 'lucide-react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: 'general' | 'technical' | 'billing' | 'account';
}

interface KnowledgeBaseArticle {
  id: number;
  title: string;
  description: string;
  category: string;
  views: number;
  lastUpdated: string;
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: 'Как добавить нового пользователя в проект?',
    answer: 'Чтобы добавить нового пользователя в проект, перейдите в раздел "Команда", нажмите кнопку "Добавить участника" и введите email нового пользователя. После этого пользователь получит приглашение и сможет присоединиться к проекту.',
    category: 'general'
  },
  {
    id: 2,
    question: 'Какие форматы файлов поддерживает система?',
    answer: 'Система поддерживает различные форматы файлов, включая IFC, RVT, DWG, DXF, PDF, XLSX, DOCX и другие. Для BIM моделей рекомендуется использовать формат IFC для обеспечения совместимости.',
    category: 'technical'
  },
  {
    id: 3,
    question: 'Как изменить права доступа участника проекта?',
    answer: 'Для изменения прав доступа перейдите в раздел "Команда", найдите нужного участника, нажмите на три точки справа и выберите "Изменить роль". В открывшемся модальном окне выберите нужный уровень доступа и нажмите "Сохранить".',
    category: 'account'
  },
  {
    id: 4,
    question: 'Как обнаружить и разрешить коллизии в модели?',
    answer: 'Для обнаружения коллизий загрузите все необходимые модели в раздел "Модели", затем нажмите на кнопку "Проверка на коллизии". Система автоматически проанализирует модели и отобразит список обнаруженных коллизий, которые можно просмотреть и разрешить.',
    category: 'technical'
  },
  {
    id: 5,
    question: 'Как изменить план подписки?',
    answer: 'Для изменения плана подписки перейдите в раздел "Настройки", выберите вкладку "Тарифы и оплата" и нажмите "Изменить план". Выберите подходящий тариф и следуйте инструкциям для завершения процесса.',
    category: 'billing'
  }
];

const knowledgeBaseArticles: KnowledgeBaseArticle[] = [
  {
    id: 1,
    title: 'Руководство по началу работы',
    description: 'Основные шаги настройки и использования платформы для новых пользователей',
    category: 'Начало работы',
    views: 1245,
    lastUpdated: '5 дней назад'
  },
  {
    id: 2,
    title: 'Совместная работа с BIM моделями',
    description: 'Как эффективно организовать совместную работу команды над BIM моделями',
    category: 'Совместная работа',
    views: 892,
    lastUpdated: '2 недели назад'
  },
  {
    id: 3,
    title: 'Обнаружение и разрешение коллизий',
    description: 'Подробное руководство по проверке и устранению коллизий в проекте',
    category: 'BIM',
    views: 753,
    lastUpdated: '3 дня назад'
  },
  {
    id: 4,
    title: 'Управление версиями документов',
    description: 'Система контроля версий и управления изменениями в документации',
    category: 'Документы',
    views: 621,
    lastUpdated: '1 неделю назад'
  },
  {
    id: 5,
    title: 'Интеграция с Revit и AutoCAD',
    description: 'Настройка и использование плагинов для интеграции с популярными САПР',
    category: 'Интеграции',
    views: 547,
    lastUpdated: '4 дня назад'
  }
];

const SupportPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('faq');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [ticketPriority, setTicketPriority] = useState('medium');

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const filterFaqs = () => {
    return faqs.filter(faq => {
      const matchesSearch = searchTerm === '' || 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesCategory = selectedCategory === null || faq.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  };

  const filterArticles = () => {
    return knowledgeBaseArticles.filter(article => 
      searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      article.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const submitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    // В реальном приложении здесь был бы код для отправки тикета
    alert(`Тикет отправлен: ${ticketSubject}`);
    setTicketSubject('');
    setTicketDescription('');
    setTicketPriority('medium');
  };

  return (
    <div className="space-y-8">
      {/* Support Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm md:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Центр поддержки</h2>
          <p className="text-gray-600 mb-6">
            Добро пожаловать в центр поддержки BIM Hub. Здесь вы найдете ответы на часто задаваемые вопросы, 
            сможете просмотреть базу знаний или связаться с командой поддержки.
          </p>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск в базе знаний и FAQ..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Связаться с нами</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Email</p>
                <p className="text-sm text-blue-600">support@bimhub.ru</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <Phone className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Телефон</p>
                <p className="text-sm text-gray-900">+7 (800) 123-45-67</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <MessageSquare className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">Чат</p>
                <p className="text-sm text-gray-900">Пн-Пт, 9:00 - 18:00 МСК</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button
              onClick={() => setActiveTab('ticket')}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-2"
            >
              Создать тикет
            </button>
          </div>
        </div>
      </div>

      {/* Support Content */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {[
              { id: 'faq', label: 'Частые вопросы', icon: HelpCircle },
              { id: 'knowledge', label: 'База знаний', icon: Book },
              { id: 'ticket', label: 'Создать тикет', icon: MessageSquare }
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
          {activeTab === 'faq' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Часто задаваемые вопросы</h3>
                <p className="text-gray-600">
                  Ответы на самые распространенные вопросы пользователей нашей платформы
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <button 
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedCategory === null ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedCategory(null)}
                >
                  Все
                </button>
                {[
                  { id: 'general', label: 'Общие вопросы', color: 'bg-blue-100 text-blue-800' },
                  { id: 'technical', label: 'Технические', color: 'bg-green-100 text-green-800' },
                  { id: 'billing', label: 'Оплата', color: 'bg-yellow-100 text-yellow-800' },
                  { id: 'account', label: 'Учетная запись', color: 'bg-purple-100 text-purple-800' }
                ].map((category) => (
                  <button 
                    key={category.id}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedCategory === category.id ? 'bg-gray-900 text-white' : category.color + ' hover:opacity-80'
                    }`}
                    onClick={() => setSelectedCategory(category.id as 'general' | 'technical' | 'billing' | 'account')}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
              
              <div className="space-y-4">
                {filterFaqs().length > 0 ? (
                  filterFaqs().map((faq) => (
                    <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <button 
                        className="w-full px-6 py-4 flex items-center justify-between text-left"
                        onClick={() => toggleFaq(faq.id)}
                      >
                        <span className="font-medium text-gray-900">{faq.question}</span>
                        {expandedFaq === faq.id ? (
                          <ChevronUp className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      {expandedFaq === faq.id && (
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                          <p className="text-gray-700">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Вопросы не найдены. Попробуйте изменить параметры поиска или создайте новый тикет.
                  </div>
                )}
              </div>
              
              {filterFaqs().length > 0 && (
                <div className="mt-6 text-center">
                  <p className="text-gray-600 mb-3">Не нашли ответ на свой вопрос?</p>
                  <button 
                    onClick={() => setActiveTab('ticket')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-2"
                  >
                    Создать тикет <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'knowledge' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">База знаний</h3>
                <p className="text-gray-600">
                  Полезные статьи, руководства и документация по использованию платформы
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filterArticles().length > 0 ? (
                  filterArticles().map((article) => (
                    <div 
                      key={article.id} 
                      className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md font-medium">
                          {article.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Eye className="h-3 w-3" />
                          {article.views}
                        </div>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{article.title}</h4>
                      <p className="text-sm text-gray-600 mb-4">{article.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Обновлено {article.lastUpdated}
                        </span>
                        <a href="#" className="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center gap-1">
                          Читать <ArrowRight className="h-3 w-3" />
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 col-span-2">
                    Статьи не найдены. Попробуйте изменить параметры поиска.
                  </div>
                )}
              </div>
              
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Популярные категории</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: FileText, title: 'Документация', count: 25 },
                    { icon: Book, title: 'Руководства', count: 18 },
                    { icon: CheckCircle2, title: 'Лучшие практики', count: 12 },
                    { icon: MessageSquare, title: 'Видеоуроки', count: 8 }
                  ].map((category, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <category.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{category.title}</p>
                          <p className="text-xs text-gray-500">{category.count} статей</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ticket' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Создать тикет</h3>
                <p className="text-gray-600">
                  Опишите вашу проблему или вопрос, и наша команда поддержки свяжется с вами в ближайшее время
                </p>
              </div>
              
              <form onSubmit={submitTicket} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="subject">
                    Тема
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Кратко опишите вашу проблему"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="category">
                    Категория
                  </label>
                  <select
                    id="category"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="technical">Технический вопрос</option>
                    <option value="billing">Вопрос об оплате</option>
                    <option value="account">Управление учетной записью</option>
                    <option value="feature">Запрос функции</option>
                    <option value="other">Другое</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="priority">
                    Приоритет
                  </label>
                  <select
                    id="priority"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={ticketPriority}
                    onChange={(e) => setTicketPriority(e.target.value)}
                  >
                    <option value="low">Низкий - Общий вопрос</option>
                    <option value="medium">Средний - Требуется помощь</option>
                    <option value="high">Высокий - Проблема влияет на работу</option>
                    <option value="critical">Критичный - Работа невозможна</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
                    Описание
                  </label>
                  <textarea
                    id="description"
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Подробно опишите вашу проблему, включая все необходимые детали..."
                    value={ticketDescription}
                    onChange={(e) => setTicketDescription(e.target.value)}
                    required
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="attachments">
                    Приложения (опционально)
                  </label>
                  <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <p className="text-gray-600 mb-2">Перетащите файлы сюда или</p>
                    <button type="button" className="text-blue-600 font-medium">
                      выберите файлы
                    </button>
                    <p className="text-xs text-gray-500 mt-2">
                      Максимальный размер: 10 МБ. Поддерживаемые форматы: JPG, PNG, PDF, ZIP
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button 
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-flex items-center gap-2"
                  >
                    Отправить <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
              
              <div className="mt-8 bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Время ответа</p>
                    <p className="text-sm text-gray-600">
                      Мы обычно отвечаем на тикеты в течение 24 часов в рабочие дни. 
                      Для критичных запросов время ответа составляет до 4 часов.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Support Status */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Статус системы</h3>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <p className="text-sm text-gray-600">Все системы работают нормально</p>
            </div>
          </div>
          <a 
            href="#" 
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            Страница статуса сервиса <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SupportPage; 