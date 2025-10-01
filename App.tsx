import React, { useState, useEffect, useRef } from 'react';
import { ModelType, Message, ChatSession } from './types';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';
import Sidebar from './components/Sidebar';
import * as geminiService from './services/geminiService';
import { useAppContext } from './contexts/AppContext';
import type { Chat } from '@google/genai';

const App: React.FC = () => {
  const { t, language } = useAppContext();
  const [activeModel, setActiveModel] = useState<ModelType>(ModelType.BETA);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const chatSessions = useRef<ChatSession>({});

  useEffect(() => {
    // Clear messages and chat session when model or language changes
    setMessages([]);
    if (activeModel === ModelType.CHAT) {
        delete chatSessions.current[ModelType.CHAT];
    }
  }, [activeModel, language]);
  
  const handleClearChat = () => {
    if (window.confirm(t('SIDEBAR_CLEAR_CHAT_CONFIRM'))) {
        setMessages([]);
        delete chatSessions.current[ModelType.CHAT];
    }
  };

  const handleSendMessage = async (userInput: string) => {
    if (!process.env.API_KEY) {
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'error',
            content: t('ERROR_API_KEY')
        }]);
        return;
    }

    const newUserMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userInput,
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsLoading(true);

    const lowerCaseInput = userInput.toLowerCase().trim().replace(/[؟?]/g, '');
    const creatorQueries = [
      'who made you', 'who created you', 'who designed you', 'who developed you', 'who is your creator', 'who trained you', 'who taught you',
      'من صنعك', 'مين صنعك', 'من صممك', 'مين صممك', 'من برمجك', 'مين برمجك', 'من المطور', 'من دربك', 'مين دربك', 'من علمك', 'مين علمك'
    ];

    if (creatorQueries.some(q => lowerCaseInput.includes(q))) {
        setTimeout(() => {
            const botMessage: Message = {
                id: `bot-${Date.now()}`,
                role: 'bot',
                content: t('CREATOR_RESPONSE'),
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
            setIsLoading(false);
        }, 800);
        return;
    }

    try {
      let botResponse: Partial<Message> = {};

      switch (activeModel) {
        case ModelType.BETA:
          const { text, sources } = await geminiService.generateBetaResponse(userInput);
          botResponse = { content: text, sources };
          break;
        
        case ModelType.IMAGE:
          const imageUrl = await geminiService.generateImage(userInput);
          botResponse = { content: t('IMAGE_BOT_RESPONSE', { userInput }), image: imageUrl };
          break;

        case ModelType.CHAT:
          if (!chatSessions.current[ModelType.CHAT]) {
             chatSessions.current[ModelType.CHAT] = geminiService.getChatSession(t('GEMINI_CHAT_SYSTEM_INSTRUCTION'));
          }
          const chatSession = chatSessions.current[ModelType.CHAT] as Chat;
          const chatText = await geminiService.getChatResponse(chatSession, userInput);
          botResponse = { content: chatText };
          break;
      }
      
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: `bot-${Date.now()}`, role: 'bot', ...botResponse } as Message,
      ]);

    } catch (error) {
      console.error(error);
      const errorMessageContent = error instanceof Error && t(error.message) ? t(error.message) : t('ERROR_GENERAL');
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'error',
        content: errorMessageContent,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex bg-gray-100 dark:bg-gray-900 overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeModel={activeModel}
        setActiveModel={setActiveModel}
        onClearChat={handleClearChat}
      />
      <main className="flex-1 flex flex-col h-full">
        <Header activeModel={activeModel} onMenuClick={() => setIsSidebarOpen(true)} />
        <ChatWindow messages={messages} isLoading={isLoading} activeModel={activeModel} />
        <InputBar onSendMessage={handleSendMessage} isLoading={isLoading} activeModel={activeModel} />
      </main>
    </div>
  );
};

export default App;