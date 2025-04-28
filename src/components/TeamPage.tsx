import React from 'react';
import { User, Mail, Phone, Calendar, Users, MapPin, Award, ArrowUpRight } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  email: string;
  phone: string;
  joined: string;
  department: string;
  location: string;
  expertise: string[];
  avatar: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Алексей Чен',
    position: 'Ведущий архитектор',
    email: 'alexey.chen@bimhub.ru',
    phone: '+7 (999) 123-45-67',
    joined: 'Март 2020',
    department: 'Проектирование',
    location: 'Москва',
    expertise: ['Жилые здания', 'Городская среда', 'Параметрическое проектирование'],
    avatar: 'AC',
  },
  {
    id: 2,
    name: 'Мария Гарсия',
    position: 'Руководитель проекта',
    email: 'maria.garcia@bimhub.ru',
    phone: '+7 (999) 234-56-78',
    joined: 'Июнь 2019',
    department: 'Управление проектами',
    location: 'Санкт-Петербург',
    expertise: ['Управление строительством', 'Бюджетирование', 'Координация команды'],
    avatar: 'МГ',
  },
  {
    id: 3,
    name: 'Давид Ким',
    position: 'Инженер-конструктор',
    email: 'david.kim@bimhub.ru',
    phone: '+7 (999) 345-67-89',
    joined: 'Январь 2021',
    department: 'Конструкторский отдел',
    location: 'Москва',
    expertise: ['Железобетонные конструкции', 'Фундаменты', 'Структурный анализ'],
    avatar: 'ДК',
  },
  {
    id: 4,
    name: 'Сара Вильсон',
    position: 'Инженер MEP',
    email: 'sara.wilson@bimhub.ru',
    phone: '+7 (999) 456-78-90',
    joined: 'Октябрь 2020',
    department: 'Инженерные системы',
    location: 'Екатеринбург',
    expertise: ['Вентиляция', 'Электроснабжение', 'Отопление и кондиционирование'],
    avatar: 'СВ',
  },
  {
    id: 5,
    name: 'Иван Петров',
    position: 'BIM-менеджер',
    email: 'ivan.petrov@bimhub.ru',
    phone: '+7 (999) 567-89-01',
    joined: 'Август 2018',
    department: 'BIM-отдел',
    location: 'Москва',
    expertise: ['Координация BIM', 'Revit', 'Navisworks', 'IFC'],
    avatar: 'ИП',
  },
];

const TeamPage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm md:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Обзор команды</h2>
          <p className="text-gray-600 mb-4">
            Наша команда состоит из 42 специалистов, работающих над 8 активными проектами.
            Объединяя экспертизу в архитектуре, конструкциях и инженерных системах, мы
            создаем инновационные и устойчивые решения для наших клиентов.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Всего сотрудников</p>
              <p className="text-xl font-bold text-blue-600">42</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Отделов</p>
              <p className="text-xl font-bold text-green-600">6</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Активных проектов</p>
              <p className="text-xl font-bold text-purple-600">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Распределение</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Проектирование</span>
                <span className="text-gray-900 font-medium">15</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '36%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Управление проектами</span>
                <span className="text-gray-900 font-medium">8</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '19%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Конструкторский отдел</span>
                <span className="text-gray-900 font-medium">10</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '24%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Инженерные системы</span>
                <span className="text-gray-900 font-medium">7</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-600 h-2 rounded-full" style={{ width: '17%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Другие</span>
                <span className="text-gray-900 font-medium">2</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '4%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Ключевые участники команды</h2>
          <button className="text-blue-600 text-sm font-medium flex items-center gap-1">
            Показать всех <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {teamMembers.map((member) => (
            <div key={member.id} className="p-6 flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 font-medium text-xl">{member.avatar}</span>
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-900">{member.name}</h3>
                  <p className="text-gray-600">{member.position}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4 text-gray-400" />
                    {member.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4 text-gray-400" />
                    {member.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    С нами с {member.joined}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="h-4 w-4 text-gray-400" />
                    {member.department}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    {member.location}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                    <Award className="h-4 w-4 text-gray-400" /> Экспертиза
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage; 