import React from 'react';
import { GroundingSource } from '../types';
import { useAppContext } from '../contexts/AppContext';

interface SourceListProps {
  sources: GroundingSource[];
}

const SourceIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 me-2 inline-block text-cyan-500 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
);

const SourceList: React.FC<SourceListProps> = ({ sources }) => {
  const { t } = useAppContext();
  const validSources = sources.filter(source => source.web && source.web.uri && source.web.title);

  if (validSources.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 border-t border-gray-300 dark:border-gray-700 pt-3">
      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">{t('SOURCES_HEADING')}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {validSources.map((source, index) => (
          <a
            key={index}
            href={source.web!.uri}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-cyan-600 dark:text-cyan-400 bg-gray-200/50 dark:bg-gray-800/50 p-2 rounded-lg hover:bg-gray-300/50 dark:hover:bg-gray-700 transition-colors truncate"
            title={source.web!.title}
          >
            <SourceIcon />
            {source.web!.title || new URL(source.web!.uri).hostname}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SourceList;