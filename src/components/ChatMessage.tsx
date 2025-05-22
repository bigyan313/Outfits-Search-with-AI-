import React from 'react';
import { MessageCircle, Bot } from 'lucide-react';

interface ChatMessageProps {
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ content, type, timestamp }) => {
  const isUser = type === 'user';
  
  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-gray-100' : 'bg-black'
      }`}>
        {isUser ? (
          <MessageCircle className="w-4 h-4 text-gray-600" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>
      
      <div className={`flex flex-col gap-1 max-w-[80%]`}>
        <div className={`rounded-2xl px-4 py-2 ${
          isUser ? 'bg-gray-100 text-gray-900' : 'bg-black text-white'
        }`}>
          {content}
        </div>
        <span className="text-xs text-gray-500 px-2">
          {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;