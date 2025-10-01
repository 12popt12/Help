import React, { useState, useRef, useEffect } from 'react';
import { ModelType } from '../types';
import { MODELS } from '../constants';
import { useAppContext } from '../contexts/AppContext';

interface InputBarProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  activeModel: ModelType;
}

const SendIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);

const InputBar: React.FC<InputBarProps> = ({ onSendMessage, isLoading, activeModel }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { t } = useAppContext();

  const placeholderKey = MODELS.find(m => m.id === activeModel)?.placeholderKey || '';
  const placeholder = t(placeholderKey);

  useEffect(() => {
    if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <div className="bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-sm border-t border-gray-300 dark:border-gray-700 p-4 sticky bottom-0">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex items-end gap-3">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
                if(e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                }
            }}
            placeholder={placeholder}
            disabled={isLoading}
            rows={1}
            className="flex-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-3 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow disabled:opacity-50 max-h-40"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-cyan-500 text-white rounded-full p-3 h-12 w-12 flex-shrink-0 flex items-center justify-center hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 transition-all disabled:bg-gray-500 dark:disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputBar;