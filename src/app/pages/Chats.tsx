import React, { useState } from 'react';
import { Send, Paperclip, FileText } from 'lucide-react';
import { mockChats, mockMessages } from '../data/mockData';
import { Button } from '../components/ui/Button';

export function Chats() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0]?.id);
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    // Handle send message
    setMessageText('');
  };

  const currentChat = mockChats.find((c) => c.id === selectedChat);

  return (
    <div className="container mx-auto px-4 py-6 h-[calc(100vh-140px)] lg:h-[calc(100vh-100px)]">
      <div className="bg-white rounded-2xl overflow-hidden h-full flex border border-[#E2E8F0]">
        {/* Chat list */}
        <div className="w-full md:w-80 lg:w-96 border-r border-[#E2E8F0] flex flex-col">
          <div className="p-4 border-b border-[#E2E8F0]">
            <h2 className="font-semibold text-[#0B1C3A]">Чаты</h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            {mockChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`
                  w-full p-4 flex items-start gap-3 hover:bg-[#F8FAFC] transition-colors text-left
                  ${selectedChat === chat.id ? 'bg-[#F1F5F9]' : ''}
                `}
              >
                <img
                  src={chat.factoryAvatar}
                  alt={chat.factoryName}
                  className="w-12 h-12 rounded-full object-cover shrink-0 border-2 border-[#E2E8F0]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <span className="font-medium text-[#0B1C3A] truncate">
                      {chat.factoryName}
                    </span>
                    <span className="text-xs text-[#94A3B8] ml-2 shrink-0">
                      {chat.lastMessageTime}
                    </span>
                  </div>
                  <p className="text-sm text-[#64748B] truncate">{chat.lastMessage}</p>
                </div>
                {chat.unreadCount > 0 && (
                  <div className="w-5 h-5 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] rounded-full flex items-center justify-center shrink-0">
                    <span className="text-xs text-[#0B1C3A] font-semibold">{chat.unreadCount}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat window */}
        <div className="hidden md:flex flex-1 flex-col">
          {currentChat ? (
            <>
              {/* Chat header */}
              <div className="p-4 border-b border-[#E2E8F0] flex items-center gap-3">
                <img
                  src={currentChat.factoryAvatar}
                  alt={currentChat.factoryName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#D4AF37]"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-[#0B1C3A]">{currentChat.factoryName}</h3>
                  <p className="text-sm text-[#10B981]">В сети</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FAFC]">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] ${
                        message.sender === 'me'
                          ? 'bg-gradient-to-r from-[#0B1C3A] to-[#1E3A5F] text-white rounded-l-2xl rounded-tr-2xl'
                          : 'bg-white text-[#0B1C3A] rounded-r-2xl rounded-tl-2xl border border-[#E2E8F0]'
                      } px-4 py-3 shadow-sm`}
                    >
                      <p className="text-sm mb-1">{message.text}</p>
                      {message.textEn && message.sender === 'them' && (
                        <p className="text-xs opacity-70 italic">{message.textEn}</p>
                      )}
                      <span className="text-xs opacity-70 mt-1 block">{message.time}</span>
                    </div>
                  </div>
                ))}

                {/* Deal card in chat */}
                <div className="flex justify-center">
                  <div className="max-w-sm w-full border border-[#E2E8F0] rounded-2xl p-4 bg-white shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#0B1C3A] to-[#1E3A5F] rounded-xl flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[#D4AF37]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-[#0B1C3A] mb-1">Сделка #001</h4>
                        <p className="text-sm text-[#64748B] mb-2">Сумма: $15,000</p>
                        <span className="inline-block px-2 py-1 bg-[#FEF3C7] text-[#92400E] text-xs rounded-full font-medium">
                          Ожидает подтверждения
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-[#E2E8F0] bg-white">
                <div className="flex items-end gap-3">
                  <button
                    type="button"
                    className="w-10 h-10 flex items-center justify-center text-[#64748B] hover:bg-[#F1F5F9] rounded-xl transition-colors"
                  >
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Введите сообщение..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!messageText.trim()}
                    className="w-10 h-10 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] hover:from-[#C4A030] hover:to-[#E4C030] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-all shadow-lg"
                  >
                    <Send className="w-5 h-5 text-[#0B1C3A]" />
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[#64748B]">
              Выберите чат
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
