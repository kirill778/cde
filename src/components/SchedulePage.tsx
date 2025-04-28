import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  Users, 
  Building2, 
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  FileText
} from 'lucide-react';

interface ScheduleEvent {
  id: number;
  title: string;
  type: 'meeting' | 'deadline' | 'review' | 'site-visit';
  date: string;
  time: string;
  duration: string;
  participants: string[];
  location: string;
  status: 'upcoming' | 'in-progress' | 'completed';
}

const events: ScheduleEvent[] = [
  {
    id: 1,
    title: 'Координационное совещание',
    type: 'meeting',
    date: '15 октября 2023',
    time: '10:00',
    duration: '1.5 часа',
    participants: ['Иван Петров', 'Алексей Чен', 'Мария Гарсия'],
    location: 'Переговорная №3',
    status: 'upcoming'
  },
  {
    id: 2,
    title: 'Проверка проектной документации',
    type: 'review',
    date: '16 октября 2023',
    time: '14:00',
    duration: '3 часа',
    participants: ['Алексей Чен', 'Давид Ким', 'Сара Вильсон'],
    location: 'Онлайн',
    status: 'upcoming'
  },
  {
    id: 3,
    title: 'Посещение строительной площадки',
    type: 'site-visit',
    date: '18 октября 2023',
    time: '09:30',
    duration: '4 часа',
    participants: ['Мария Гарсия', 'Давид Ким', 'Иван Петров'],
    location: 'Строительная площадка, ул. Строителей, 15',
    status: 'upcoming'
  },
  {
    id: 4,
    title: 'Сдача этапа проекта',
    type: 'deadline',
    date: '20 октября 2023',
    time: '18:00',
    duration: '-',
    participants: ['Вся команда'],
    location: '-',
    status: 'upcoming'
  },
  {
    id: 5,
    title: 'Встреча с заказчиком',
    type: 'meeting',
    date: '22 октября 2023',
    time: '11:00',
    duration: '2 часа',
    participants: ['Мария Гарсия', 'Алексей Чен', 'Иван Петров'],
    location: 'Офис заказчика',
    status: 'upcoming'
  }
];

const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
const currentMonthIndex = 9; // Октябрь
const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

const SchedulePage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(months[currentMonthIndex]);
  
  const getEventTypeStyles = (type: string) => {
    switch(type) {
      case 'meeting':
        return 'bg-blue-100 text-blue-800';
      case 'deadline':
        return 'bg-red-100 text-red-800';
      case 'review':
        return 'bg-purple-100 text-purple-800';
      case 'site-visit':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch(type) {
      case 'meeting':
        return 'Совещание';
      case 'deadline':
        return 'Дедлайн';
      case 'review':
        return 'Проверка';
      case 'site-visit':
        return 'Выезд на объект';
      default:
        return type;
    }
  };

  return (
    <div className="space-y-8">
      {/* Schedule Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm md:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Обзор расписания</h2>
          <p className="text-gray-600 mb-4">
            В этом месяце запланировано 12 мероприятий, включая встречи, проверки и выезды на объекты.
            Следующее мероприятие состоится через 2 дня.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Совещаний</p>
              <p className="text-xl font-bold text-blue-600">8</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Дедлайнов</p>
              <p className="text-xl font-bold text-red-600">3</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Проверок</p>
              <p className="text-xl font-bold text-purple-600">5</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Выездов</p>
              <p className="text-xl font-bold text-green-600">4</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">График</h2>
            <div className="flex items-center">
              <button className="p-1 rounded-lg hover:bg-gray-100">
                <ChevronLeft className="h-5 w-5 text-gray-500" />
              </button>
              <span className="mx-2 text-sm font-medium">{currentMonth} 2023</span>
              <button className="p-1 rounded-lg hover:bg-gray-100">
                <ChevronRight className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => (
              <div key={index} className="text-xs font-medium text-gray-500">{day}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {/* Пустые ячейки для выравнивания календаря - 1 октября 2023 - воскресенье */}
            {Array.from({ length: 6 }, (_, i) => (
              <div key={`empty-${i}`} className="h-8 rounded-lg"></div>
            ))}
            {calendarDays.map((day) => {
              const hasEvent = events.some(event => parseInt(event.date.split(' ')[0]) === day);
              return (
                <div 
                  key={day} 
                  className={`h-8 rounded-lg flex items-center justify-center text-sm
                    ${hasEvent ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-50'}`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Предстоящие мероприятия</h2>
          <button className="text-blue-600 text-sm font-medium flex items-center gap-1">
            Показать все <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
        <div>
          {events.map((event) => (
            <div key={event.id} className="p-6 border-b border-gray-100 last:border-0">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${getEventTypeStyles(event.type)}`}>
                    {getEventTypeLabel(event.type)}
                  </span>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2 text-sm font-medium text-gray-900">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    {event.date}
                  </div>
                  <div className="flex items-center justify-end gap-2 text-sm text-gray-600 mt-1">
                    <Clock className="h-4 w-4 text-gray-500" />
                    {event.time} ({event.duration})
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <Users className="h-4 w-4 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-gray-700 font-medium">Участники:</p>
                    <p className="text-gray-600">{event.participants.join(', ')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Building2 className="h-4 w-4 text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-gray-700 font-medium">Место:</p>
                    <p className="text-gray-600">{event.location}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                    Подтвердить
                  </button>
                  <button className="px-3 py-1 border border-gray-200 text-sm rounded-lg hover:bg-gray-50">
                    Детали
                  </button>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-600">2 документа</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchedulePage; 