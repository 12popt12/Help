import React, { useEffect, useRef } from 'react';
import { Message as MessageType, ModelType } from '../types';
import Message from './Message';
import { MODELS } from '../constants';
import { useAppContext } from '../contexts/AppContext';

interface ChatWindowProps {
  messages: MessageType[];
  isLoading: boolean;
  activeModel: ModelType;
}

const TypingIndicator: React.FC = () => (
    <div className="flex items-start gap-3 my-4">
        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-500 dark:text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
        </div>
        <div className="max-w-xl p-4 rounded-xl shadow bg-gray-200 dark:bg-gray-700/80 rounded-bl-none flex items-center space-x-2 space-x-reverse">
            <div className="w-2 h-2 bg-cyan-500 dark:bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-cyan-500 dark:bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-cyan-500 dark:bg-cyan-400 rounded-full animate-bounce"></div>
        </div>
    </div>
);

const WelcomeMessage: React.FC<{activeModel: ModelType}> = ({ activeModel }) => {
    const { t } = useAppContext();
    const modelInfo = MODELS.find(m => m.id === activeModel);
    if (!modelInfo) return null;

    const modelName = t(modelInfo.nameKey);
    const modelDescription = t(modelInfo.descriptionKey);

    return (
        <div className="text-center p-8 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-500 dark:text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">{t('WELCOME_MESSAGE_TITLE', { modelName })}</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">{modelDescription}</p>
        </div>
    );
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading, activeModel }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div
      ref={scrollRef}
      className={`flex-1 overflow-y-auto p-4 md:p-6 ${
        activeModel === ModelType.BETA ? 'chat-window-beta-active' : ''
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {messages.length === 0 && !isLoading && <WelcomeMessage activeModel={activeModel} />}
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
      </div>
    </div>
  );
};

export default ChatWindow;