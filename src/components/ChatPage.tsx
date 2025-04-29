import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Send, 
  PaperclipIcon, 
  Users, 
  UserPlus, 
  Settings, 
  Info, 
  Clock, 
  CheckCheck, 
  File
} from 'lucide-react';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isUser: boolean;
  status: 'sent' | 'delivered' | 'read';
  attachments?: {
    name: string;
    size: string;
    type: string;
  }[];
}

interface ChatRoom {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isGroup: boolean;
  participants?: string[];
  avatar?: string;
  isActive: boolean;
}

const initialChats: ChatRoom[] = [
  {
    id: 1,
    name: 'Команда проекта Альфа',
    lastMessage: 'Александр: Загрузил последние чертежи фасада',
    timestamp: '10:45',
    unreadCount: 2,
    isGroup: true,
    participants: ['Александр Н.', 'Мария В.', 'Дмитрий К.', 'Елена С.', 'Вы'],
    isActive: true
  },
  {
    id: 2,
    name: 'Мария Волкова',
    lastMessage: 'Посмотри, пожалуйста, мои комментарии к модели',
    timestamp: 'Вчера',
    unreadCount: 0,
    isGroup: false,
    isActive: false
  },
  {
    id: 3,
    name: 'Техническая поддержка',
    lastMessage: 'Ваша заявка №12345 была обработана',
    timestamp: '25 мая',
    unreadCount: 0,
    isGroup: false,
    isActive: false
  },
  {
    id: 4,
    name: 'Отдел проектирования',
    lastMessage: 'Андрей: Обсудим на следующей неделе',
    timestamp: '24 мая',
    unreadCount: 0,
    isGroup: true,
    participants: ['Андрей М.', 'Наталья П.', 'Сергей В.', 'Вы'],
    isActive: false
  },
  {
    id: 5,
    name: 'Дмитрий Козлов',
    lastMessage: 'Спасибо за информацию!',
    timestamp: '22 мая',
    unreadCount: 0,
    isGroup: false,
    isActive: false
  }
];

const initialMessages: Record<number, Message[]> = {
  1: [
    {
      id: 1,
      sender: 'Александр Н.',
      content: 'Доброе утро всем! Я только что обновил модель конструкций в разделе проекта.',
      timestamp: '9:30',
      isUser: false,
      status: 'read'
    },
    {
      id: 2,
      sender: 'Мария В.',
      content: 'Отлично! Я просмотрю и проверю на соответствие архитектурной модели.',
      timestamp: '9:35',
      isUser: false,
      status: 'read'
    },
    {
      id: 3,
      sender: 'Вы',
      content: 'Спасибо, Александр. Не забудьте также обновить документацию в системе.',
      timestamp: '9:42',
      isUser: true,
      status: 'read'
    },
    {
      id: 4,
      sender: 'Дмитрий К.',
      content: 'Обнаружил несколько коллизий между MEP и конструкциями. Загрузил отчет в раздел "Документы".',
      timestamp: '10:15',
      isUser: false,
      status: 'read',
      attachments: [
        {
          name: 'отчет-коллизии.pdf',
          size: '2.4 МБ',
          type: 'PDF'
        }
      ]
    },
    {
      id: 5,
      sender: 'Елена С.',
      content: 'Спасибо за отчет, Дмитрий. Буду исправлять MEP модель сегодня после обеда.',
      timestamp: '10:22',
      isUser: false,
      status: 'read'
    },
    {
      id: 6,
      sender: 'Александр Н.',
      content: 'Загрузил последние чертежи фасада. Прошу всех ознакомиться и дать комментарии до завтра.',
      timestamp: '10:45',
      isUser: false,
      status: 'delivered',
      attachments: [
        {
          name: 'фасад-в1.dwg',
          size: '5.8 МБ',
          type: 'DWG'
        },
        {
          name: 'фасад-визуализация.jpg',
          size: '3.2 МБ',
          type: 'JPG'
        }
      ]
    }
  ],
  2: [
    {
      id: 1,
      sender: 'Мария Волкова',
      content: 'Привет! Как продвигается работа над моделью конструкций?',
      timestamp: '13:15',
      isUser: false,
      status: 'read'
    },
    {
      id: 2,
      sender: 'Вы',
      content: 'Привет, Мария! Работа идет по плану, уже завершил основные узлы.',
      timestamp: '13:22',
      isUser: true,
      status: 'read'
    },
    {
      id: 3,
      sender: 'Мария Волкова',
      content: 'Отлично! Я добавила несколько комментариев к архитектурной части.',
      timestamp: '13:30',
      isUser: false,
      status: 'read'
    },
    {
      id: 4,
      sender: 'Вы',
      content: 'Спасибо, посмотрю сегодня вечером и внесу корректировки.',
      timestamp: '13:45',
      isUser: true,
      status: 'read'
    },
    {
      id: 5,
      sender: 'Мария Волкова',
      content: 'Посмотри, пожалуйста, мои комментарии к модели',
      timestamp: '18:30',
      isUser: false,
      status: 'delivered'
    }
  ]
};

const ChatPage: React.FC = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>(initialChats);
  const [messages, setMessages] = useState<Record<number, Message[]>>(initialMessages);
  const [activeChatId, setActiveChatId] = useState<number>(1);
  const [newMessage, setNewMessage] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = chatRooms.find(chat => chat.id === activeChatId);
  const currentMessages = messages[activeChatId] || [];

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages, activeChatId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg: Message = {
      id: currentMessages.length + 1,
      sender: 'Вы',
      content: newMessage,
      timestamp: formatTime(new Date()),
      isUser: true,
      status: 'sent'
    };

    setMessages(prev => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), newMsg]
    }));

    setChatRooms(prev => 
      prev.map(chat => 
        chat.id === activeChatId 
          ? {...chat, lastMessage: `Вы: ${newMessage}`, timestamp: 'Сейчас', unreadCount: 0} 
          : chat
      )
    );

    setNewMessage('');

    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [activeChatId]: prev[activeChatId].map(msg => 
          msg.id === newMsg.id ? {...msg, status: 'delivered'} : msg
        )
      }));
    }, 1000);

    // Simulate message read
    setTimeout(() => {
      setMessages(prev => ({
        ...prev,
        [activeChatId]: prev[activeChatId].map(msg => 
          msg.id === newMsg.id ? {...msg, status: 'read'} : msg
        )
      }));
    }, 2000);
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleChatSelect = (chatId: number) => {
    setActiveChatId(chatId);
    setChatRooms(prev => 
      prev.map(chat => 
        chat.id === chatId 
          ? {...chat, unreadCount: 0, isActive: true} 
          : {...chat, isActive: false}
      )
    );
  };

  const filteredChats = chatRooms.filter(chat => 
    chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex">
      {/* Sidebar with chat list */}
      <div className="w-80 bg-white flex flex-col" style={{ borderRight: '1px solid #f3f3f3' }}>
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск чатов..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Чаты</h2>
          <button className="p-2 text-blue-600 rounded-full hover:bg-blue-50">
            <Plus className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <button
                key={chat.id}
                className={`w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-200 ${
                  chat.isActive ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                }`}
                onClick={() => handleChatSelect(chat.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    chat.isGroup ? 'bg-violet-100 text-violet-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {chat.isGroup ? <Users className="h-5 w-5" /> : chat.name.substring(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-medium text-gray-900 truncate">{chat.name}</p>
                      <span className="text-xs text-gray-500">{chat.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unreadCount > 0 && (
                    <div className="h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                      {chat.unreadCount}
                    </div>
                  )}
                </div>
              </button>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              Чаты не найдены
            </div>
          )}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col bg-gray-50 border-r border-gray-200">
        {activeChat ? (
          <>
            {/* Chat header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                    activeChat.isGroup ? 'bg-violet-100 text-violet-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {activeChat.isGroup ? <Users className="h-5 w-5" /> : activeChat.name.substring(0, 2)}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">{activeChat.name}</h2>
                    {activeChat.isGroup && activeChat.participants && (
                      <p className="text-xs text-gray-500">
                        {activeChat.participants.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                    <Search className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                    <Info className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[70%] ${message.isUser ? 'order-1' : 'order-2'}`}>
                    {!message.isUser && (
                      <div className="text-xs text-gray-500 mb-1 ml-1">{message.sender}</div>
                    )}
                    <div className={`
                      rounded-lg px-4 py-2 
                      ${message.isUser 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-800 border border-gray-200'
                      }
                    `}>
                      <p>{message.content}</p>
                      
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {message.attachments.map((attachment, index) => (
                            <div 
                              key={index} 
                              className={`
                                flex items-center gap-2 px-3 py-2 rounded-md
                                ${message.isUser ? 'bg-blue-700' : 'bg-gray-100'}
                              `}
                            >
                              <File className="h-5 w-5" />
                              <div className="flex-1">
                                <p className={`text-sm ${message.isUser ? 'text-white' : 'text-gray-800'}`}>
                                  {attachment.name}
                                </p>
                                <p className={`text-xs ${message.isUser ? 'text-blue-200' : 'text-gray-500'}`}>
                                  {attachment.size} · {attachment.type}
                                </p>
                              </div>
                              <button className={`text-xs ${message.isUser ? 'text-blue-200' : 'text-blue-600'} font-medium`}>
                                Скачать
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <span>{message.timestamp}</span>
                      {message.isUser && (
                        <span className="ml-1">
                          {message.status === 'sent' && <Clock className="h-3 w-3" />}
                          {message.status === 'delivered' && <CheckCheck className="h-3 w-3" />}
                          {message.status === 'read' && <CheckCheck className="h-3 w-3 text-blue-600" />}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input area */}
            <div className="bg-white border-t border-gray-200 p-4">
              <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                <button 
                  type="button" 
                  className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                >
                  <PaperclipIcon className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  placeholder="Введите сообщение..."
                  className="flex-1 py-2 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Выберите чат</h3>
              <p className="text-gray-500">Выберите существующий чат или создайте новый</p>
              <button 
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 mx-auto"
                onClick={() => setChatRooms(prev => [
                  ...prev,
                  {
                    id: Math.max(...prev.map(c => c.id)) + 1,
                    name: 'Новый чат',
                    lastMessage: 'Начните обсуждение',
                    timestamp: 'Сейчас',
                    unreadCount: 0,
                    isGroup: false,
                    isActive: false
                  }
                ])}
              >
                <UserPlus className="h-5 w-5" />
                Создать чат
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage; 