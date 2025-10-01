
import React from 'react';
import { Message as MessageType } from '../types';
import SourceList from './SourceList';
import ImageDisplay from './ImageDisplay';
import { marked } from 'marked';

interface MessageProps {
  message: MessageType;
}

const UserIcon: React.FC = () => (
    <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center font-bold text-white flex-shrink-0">
        أ
    </div>
);

const BotIcon: React.FC = () => (
    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
    </div>
);

const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const isError = message.role === 'error';

  const containerClasses = `flex items-start gap-3 my-4`;
  const bubbleClasses = `max-w-xl p-4 rounded-xl shadow`;

  const createMarkup = (content: string) => {
    // Basic markdown support
    const rawMarkup = marked.parse(content, { gfm: true, breaks: true });
    // Use type assertion as DOMPurify is not available in this environment.
    // In a real app, you would sanitize this.
    return { __html: rawMarkup as string };
  };

  if (isError) {
    return (
      <div className="flex justify-center">
        <div className="bg-red-900/50 text-red-300 border border-red-700 px-4 py-2 rounded-lg text-sm">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      {isUser ? <UserIcon /> : <BotIcon />}
      <div
        className={`${bubbleClasses} ${
          isUser ? 'bg-cyan-600/80 rounded-br-none' : 'bg-gray-700/80 rounded-bl-none'
        }`}
      >
        <div
            className="prose prose-sm prose-invert max-w-none prose-p:my-2 prose-headings:my-3"
            dangerouslySetInnerHTML={createMarkup(message.content)}
        />
        {message.image && <ImageDisplay src={message.image} />}
        {message.sources && message.sources.length > 0 && <SourceList sources={message.sources} />}
      </div>
    </div>
  );
};

export default Message;
