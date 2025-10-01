
import React from 'react';
import { APP_TITLE, MODELS } from '../constants';
import { ModelType } from '../types';

interface HeaderProps {
  activeModel: ModelType;
  setActiveModel: (model: ModelType) => void;
}

const Header: React.FC<HeaderProps> = ({ activeModel, setActiveModel }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm p-4 border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-cyan-400">{APP_TITLE}</h1>
        <div className="flex bg-gray-900 rounded-full p-1 border border-gray-700">
          {MODELS.map((model) => {
            const isActive = activeModel === model.id;
            const isBetaAndActive = model.id === ModelType.BETA && isActive;

            return (
              <button
                key={model.id}
                onClick={() => setActiveModel(model.id)}
                className={`px-4 py-1 text-sm font-medium rounded-full transition-colors duration-200 focus:outline-none ${
                  isActive
                    ? 'bg-cyan-500 text-white shadow'
                    : 'text-gray-300 hover:bg-gray-700'
                } ${isBetaAndActive ? 'beta-active-glitch' : ''}`}
              >
                {model.name}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
