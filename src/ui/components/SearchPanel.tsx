import { useState } from 'react';
import { Search, Replace, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SearchPanel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [replaceTerm, setReplaceTerm] = useState('');
  const [showReplace, setShowReplace] = useState(false);

  return (
    <div className="h-full bg-gray-800 text-white flex flex-col">
      <div className="p-3 border-b border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-200 uppercase tracking-wide">Search</h3>
          <button
            onClick={() => setShowReplace(!showReplace)}
            className="p-1 hover:bg-gray-700 rounded"
          >
            <Replace className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-700 border border-gray-600 rounded text-sm text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
            />
          </div>
          
          {showReplace && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="relative"
            >
              <Replace className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Replace..."
                value={replaceTerm}
                onChange={(e) => setReplaceTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-700 border border-gray-600 rounded text-sm text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
              />
            </motion.div>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3">
        {searchTerm ? (
          <div className="space-y-2">
            <div className="text-xs text-gray-400 mb-3">
              3 results in 2 files
            </div>
            
            <div className="space-y-3">
              <div className="bg-gray-900 rounded p-2">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-300">src/App.tsx</span>
                  <span className="text-xs text-gray-500">2 matches</span>
                </div>
                <div className="space-y-1 ml-6">
                  <div className="text-xs text-gray-400 hover:bg-gray-700 p-1 rounded cursor-pointer">
                    Line 15: const <span className="bg-yellow-400 text-black px-1">{searchTerm}</span> = useState();
                  </div>
                  <div className="text-xs text-gray-400 hover:bg-gray-700 p-1 rounded cursor-pointer">
                    Line 23: return <span className="bg-yellow-400 text-black px-1">{searchTerm}</span>;
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8">
            <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Enter search term to find matches</p>
          </div>
        )}
      </div>
    </div>
  );
}