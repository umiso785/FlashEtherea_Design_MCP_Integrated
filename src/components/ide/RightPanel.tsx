import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Files, Search, GitBranch } from 'lucide-react';

interface Props {
  width: number;
  onResize: (width: number) => void;
  onClose: () => void;
}

export default function RightPanel({ width, onResize, onClose }: Props) {
  const [activeTab, setActiveTab] = useState('files');
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    const startX = e.clientX;
    const startWidth = width;

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = Math.max(200, Math.min(600, startWidth - (e.clientX - startX)));
      onResize(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const tabs = [
    { id: 'files', icon: Files, label: 'Files' },
    { id: 'search', icon: Search, label: 'Search Results' },
    { id: 'git', icon: GitBranch, label: 'Git Changes' },
  ];

  return (
    <div className="h-full flex">
      {/* Resize Handle */}
      <div
        className={`w-1 bg-gray-700 hover:bg-primary-500 cursor-col-resize transition-colors ${
          isResizing ? 'bg-primary-500' : ''
        }`}
        onMouseDown={handleMouseDown}
      />
      
      <div className="flex-1 bg-gray-800 text-white flex flex-col">
        {/* Header */}
        <div className="p-3 border-b border-gray-700 flex items-center justify-between">
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-1 rounded text-sm ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>
          <motion.button
            onClick={onClose}
            className="p-1 hover:bg-gray-700 rounded"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-4 h-4 text-gray-400" />
          </motion.button>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          {activeTab === 'files' && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-300 mb-3">Project Files</h4>
              <div className="space-y-1">
                {[
                  'package.json',
                  'vite.config.ts',
                  'tailwind.config.js',
                  'tsconfig.json',
                  'README.md'
                ].map((file) => (
                  <motion.div
                    key={file}
                    className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer"
                    whileHover={{ x: 4 }}
                  >
                    <Files className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">{file}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'search' && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-300 mb-3">Search Results</h4>
              <div className="text-sm text-gray-400">
                No search results to display
              </div>
            </div>
          )}
          
          {activeTab === 'git' && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-300 mb-3">Git Changes</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2 p-2 bg-green-900/20 rounded">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-400">Modified: src/App.tsx</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-blue-900/20 rounded">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-blue-400">Added: src/components/ide/</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}