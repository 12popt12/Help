import React from 'react';
import { MODELS } from '../constants';
import { ModelType } from '../types';
import { useAppContext } from '../contexts/AppContext';

interface HeaderProps {
  onMenuClick: () => void;
  activeModel: ModelType;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, activeModel }) => {
  const { t } = useAppContext();
  const modelNameKey = MODELS.find(m => m.id === activeModel)?.nameKey || '';
  const modelName = t(modelNameKey);

  return (
    <header className="bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-sm p-4 border-b border-gray-300 dark:border-gray-700 sticky top-0 z-10 lg:hidden">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold text-gray-800 dark:text-white">{modelName}</h1>
        <button onClick={onMenuClick} className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none" aria-label={t('HEADER_MENU_OPEN_LABEL')}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
