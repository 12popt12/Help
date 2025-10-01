import React, { useState, useEffect, useRef } from 'react';
import { ModelType, Message, ChatSession } from './types';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';
import * as geminiService from './services/geminiService';
import { ERROR_MESSAGES } from './constants';
import type { Chat } from '@google/genai';

const App: React.FC = () => {
  const [activeModel, setActiveModel] = useState<ModelType>(ModelType.BETA);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatSessions = useRef<ChatSession>({});

  useEffect(() => {
    // Clear messages when model changes
    setMessages([]);
  }, [activeModel]);
  
  const handleSendMessage = async (userInput: string) => {
    if (!process.env.API_KEY) {
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            role: 'error',
            content: ERROR_MESSAGES.API_KEY
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

    // Check for creator query
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
                content: 'لقد تم تصميمي وتطويري بواسطة مروان جابر.',
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
            setIsLoading(false);
        }, 800); // Simulate a small delay
        return; // Prevent API call
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
          botResponse = { content: `هذه هي الصورة التي طلبتها بناءً على: "${userInput}"`, image: imageUrl };
          break;

        case ModelType.CHAT:
          if (!chatSessions.current[ModelType.CHAT]) {
             chatSessions.current[ModelType.CHAT] = geminiService.getChatSession();
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
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'error',
        content: error instanceof Error ? error.message : ERROR_MESSAGES.GENERAL,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900">
      <Header activeModel={activeModel} setActiveModel={setActiveModel} />
      {/* FIX: Corrected typo from `active-model` to `activeModel` to resolve compilation errors. */}
      <ChatWindow messages={messages} isLoading={isLoading} activeModel={activeModel} />
      <InputBar onSendMessage={handleSendMessage} isLoading={isLoading} activeModel={activeModel} />
    </div>
  );
};

export default App;
