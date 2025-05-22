import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { ChatMessage as ChatMessageType } from '../types';
import { supabase } from '../services/supabase';

interface ChatPanelProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
  travelPlan: any;
  onRequestAuth: () => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ onSubmit, isLoading, travelPlan, onRequestAuth }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessageType[]>([
    {
      id: '1',
      content: "Welcome to ADHIKARI. I'm your personal AI stylist. How may I assist you today?",
      type: 'assistant',
      timestamp: new Date()
    }
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
    };
    
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const fetchChatHistory = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: messages, error } = await supabase
        .from('chat_messages')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching chat history:', error);
        return;
      }

      if (messages) {
        setChatHistory(messages.map(msg => ({
          id: msg.id,
          content: msg.content,
          type: msg.type as 'user' | 'assistant',
          timestamp: new Date(msg.created_at)
        })));
      }
    };

    if (isAuthenticated) {
      fetchChatHistory();

      const subscription = supabase
        .channel('chat_messages')
        .on('postgres_changes', { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'chat_messages' 
        }, payload => {
          const newMessage = payload.new;
          setChatHistory(prev => [...prev, {
            id: newMessage.id,
            content: newMessage.content,
            type: newMessage.type as 'user' | 'assistant',
            timestamp: new Date(newMessage.created_at)
          }]);
        })
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (travelPlan) {
      let newMessage = '';

      if (travelPlan.status === 'success') {
        if (travelPlan.type === 'travel') {
          newMessage = `Here are your curated selections for ${travelPlan.destination} on ${new Date(travelPlan.date).toLocaleDateString()}. Each piece has been chosen with consideration for the weather and your comfort.`;
        } else if (travelPlan.type === 'event') {
          newMessage = `I've curated a selection of pieces for ${travelPlan.event}. Each ensemble has been carefully composed to ensure you make a lasting impression.`;
        }
      } else if (travelPlan.status === 'warning') {
        newMessage = `I've selected pieces for ${travelPlan.destination}, however, please note: ${travelPlan.warning}`;
      } else if (travelPlan.status === 'error') {
        newMessage = `My apologies, I encountered an issue: ${travelPlan.error}. Please try again with a different request.`;
      }

      if (newMessage && isAuthenticated) {
        const saveMessage = async () => {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) return;

          const { error } = await supabase
            .from('chat_messages')
            .insert({
              user_id: user.id,
              content: newMessage,
              type: 'assistant'
            });

          if (error) {
            console.error('Error saving message:', error);
          }
        };

        saveMessage();
      }
    }
  }, [travelPlan, isAuthenticated]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    if (!isAuthenticated) {
      onRequestAuth();
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      onRequestAuth();
      return;
    }

    const { error } = await supabase
      .from('chat_messages')
      .insert({
        user_id: user.id,
        content: message,
        type: 'user'
      });

    if (error) {
      console.error('Error saving message:', error);
      return;
    }

    onSubmit(message);
    setMessage('');
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col h-full max-h-[90vh] bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-light tracking-[0.2em] text-gray-900 uppercase">Personal Stylist</h2>
        <p className="text-xs tracking-wider text-gray-500 uppercase mt-1">
          Curated recommendations
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 bg-white" ref={chatContainerRef}>
        <div className="space-y-6">
          {chatHistory.map((msg) => (
            <ChatMessage
              key={msg.id}
              content={msg.content}
              type={msg.type}
              timestamp={msg.timestamp}
            />
          ))}
        </div>
      </div>

      <div className="p-6 border-t border-gray-200 bg-white">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your style requirements..."
            className="flex-1 px-4 py-3 bg-transparent border-b border-gray-200 focus:outline-none focus:border-gray-900 transition-colors text-sm tracking-wide text-gray-900 placeholder-gray-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`p-3 ${
              isLoading || !message.trim()
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-900'
            } transition-colors duration-200`}
            disabled={isLoading || !message.trim()}
          >
            {isLoading ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel;