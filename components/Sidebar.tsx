import React, { useState } from 'react';
import { MODELS } from '../constants';
import { ModelType } from '../types';
import { useAppContext } from '../contexts/AppContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeModel: ModelType;
  setActiveModel: (model: ModelType) => void;
  onClearChat: () => void;
}

const StarIcon: React.FC<{ filled: boolean; onClick: () => void }> = ({ filled, onClick }) => (
    <svg onClick={onClick} className={`h-6 w-6 cursor-pointer ${filled ? 'text-yellow-400' : 'text-gray-500 dark:text-gray-600 hover:text-yellow-300'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
);

const Settings: React.FC<{ onClearChat: () => void }> = ({ onClearChat }) => {
    const { t, theme, setTheme, language, setLanguage } = useAppContext();
    const [rating, setRating] = useState(() => Number(localStorage.getItem('appRating')) || 0);
    const [hoverRating, setHoverRating] = useState(0);
    const hasRated = rating > 0;
    
    const handleSetRating = (newRating: number) => {
        if (hasRated) return;
        setRating(newRating);
        localStorage.setItem('appRating', String(newRating));
    }

    return (
        <div className="mt-auto pt-4 border-t border-gray-300 dark:border-gray-700/50">
             <h3 className="text-sm font-semibold text-gray-500 px-2 mb-3">{t('SIDEBAR_SETTINGS_HEADING')}</h3>
             <div className="space-y-4 px-1">
                {/* Theme */}
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">{t('SIDEBAR_THEME')}</span>
                    <div className="flex items-center gap-1 bg-gray-300 dark:bg-gray-700/50 p-1 rounded-md">
                        <button onClick={() => setTheme('light')} className={`px-2 py-1 text-xs rounded ${theme === 'light' ? 'bg-cyan-500 text-white' : 'text-gray-600 dark:text-gray-300'}`}>{t('SIDEBAR_THEME_LIGHT')}</button>
                        <button onClick={() => setTheme('dark')} className={`px-2 py-1 text-xs rounded ${theme === 'dark' ? 'bg-cyan-500 text-white' : 'text-gray-600 dark:text-gray-300'}`}>{t('SIDEBAR_THEME_DARK')}</button>
                    </div>
                </div>
                {/* Language */}
                <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">{t('SIDEBAR_LANGUAGE')}</span>
                    <div className="flex items-center gap-1 bg-gray-300 dark:bg-gray-700/50 p-1 rounded-md">
                        <button onClick={() => setLanguage('en')} className={`px-2 py-1 text-xs rounded ${language === 'en' ? 'bg-cyan-500 text-white' : 'text-gray-600 dark:text-gray-300'}`}>English</button>
                        <button onClick={() => setLanguage('ar')} className={`px-2 py-1 text-xs rounded ${language === 'ar' ? 'bg-cyan-500 text-white' : 'text-gray-600 dark:text-gray-300'}`}>العربية</button>
                    </div>
                </div>
                 {/* Clear Chat */}
                <button onClick={onClearChat} className="w-full text-start text-sm text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-500/10 p-2 rounded-md transition-colors">
                    {t('SIDEBAR_CLEAR_CHAT')}
                </button>
                 {/* Rating */}
                <div className="pt-2">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{t('SIDEBAR_RATE_APP')}</span>
                    <div className="flex items-center gap-1 mt-2" onMouseLeave={() => setHoverRating(0)}>
                        {[1, 2, 3, 4, 5].map(star => (
                            <div key={star} onMouseEnter={() => !hasRated && setHoverRating(star)}>
                                <StarIcon filled={hoverRating >= star || rating >= star} onClick={() => handleSetRating(star)} />
                            </div>
                        ))}
                    </div>
                    {hasRated && <p className="text-xs text-cyan-500 dark:text-cyan-400 mt-2">{t('SIDEBAR_RATE_SUBMITTED')}</p>}
                </div>
             </div>
        </div>
    );
};

const SidebarContent: React.FC<{ activeModel: ModelType; setActiveModel: (model: ModelType) => void; onClearChat: () => void; onSelect?: () => void }> = ({ activeModel, setActiveModel, onClearChat, onSelect }) => {
    const { t } = useAppContext();
    return (
        <div className="p-4 flex flex-col flex-1 h-full">
          <h2 className="text-xl font-bold text-cyan-500 dark:text-cyan-400 mb-6">{t('APP_TITLE')}</h2>
          <nav className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-gray-500 px-2">{t('SIDEBAR_MODELS_HEADING')}</h3>
            {MODELS.map((model) => {
              const isActive = activeModel === model.id;
              const isBetaAndActive = model.id === ModelType.BETA && isActive;
              return (
                <button
                  key={model.id}
                  onClick={() => {
                    setActiveModel(model.id);
                    onSelect?.();
                  }}
                  className={`px-3 py-2 text-start text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none flex flex-col items-start w-full ${
                    isActive ? 'bg-cyan-500/10 text-cyan-400 dark:text-cyan-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-500/10 dark:hover:bg-gray-700/50'
                  } ${isBetaAndActive ? 'beta-active-glitch' : ''}`}
                >
                  <span>{t(model.nameKey)}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{t(model.descriptionKey)}</span>
                </button>
              );
            })}
          </nav>
          <Settings onClearChat={onClearChat} />
        </div>
    );
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, activeModel, setActiveModel, onClearChat }) => {
  const { t, language } = useAppContext();
  const sidebarDirectionClass = language === 'ar' ? 'right-0 border-l' : 'left-0 border-r';
  const desktopSidebarDirectionClass = language === 'ar' ? 'border-l' : 'border-r';
  const transformClass = language === 'ar' 
    ? (isOpen ? 'translate-x-0' : 'translate-x-full')
    : (isOpen ? 'translate-x-0' : '-translate-x-full');
  
  return (
    <>
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 z-30 w-72 bg-gray-100 dark:bg-gray-900 border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:hidden ${sidebarDirectionClass} ${transformClass}`}
        aria-modal="true"
        role="dialog"
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold text-cyan-500 dark:text-cyan-400">{t('APP_TITLE')}</h2>
            <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white" aria-label={t('HEADER_MENU_CLOSE_LABEL')}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
        </div>
        <SidebarContent activeModel={activeModel} setActiveModel={setActiveModel} onClearChat={onClearChat} onSelect={onClose}/>
      </div>
      {/* Backdrop for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/60 z-20 lg:hidden" onClick={onClose}></div>}

      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex lg:flex-col lg:w-72 bg-gray-200/50 dark:bg-gray-800/30 border-gray-300 dark:border-gray-700 h-full ${desktopSidebarDirectionClass}`}>
         <SidebarContent activeModel={activeModel} setActiveModel={setActiveModel} onClearChat={onClearChat} />
      </aside>
    </>
  );
};

export default Sidebar;
