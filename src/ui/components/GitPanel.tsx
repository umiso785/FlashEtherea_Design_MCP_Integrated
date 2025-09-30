import { GitBranch, GitCommitVertical as GitCommit, Plus, Minus, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function GitPanel() {
  const changes = [
    { file: 'src/App.tsx', type: 'modified', additions: 12, deletions: 3 },
    { file: 'src/ui/layouts/IDELayout.tsx', type: 'added', additions: 78, deletions: 0 },
    { file: 'package.json', type: 'modified', additions: 5, deletions: 1 },
  ];

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'added':
        return <Plus className="w-4 h-4 text-green-400" />;
      case 'modified':
        return <FileText className="w-4 h-4 text-yellow-400" />;
      case 'deleted':
        return <Minus className="w-4 h-4 text-red-400" />;
      default:
        return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="h-full bg-gray-800 text-white flex flex-col">
      <div className="p-3 border-b border-gray-700">
        <div className="flex items-center gap-2 mb-3">
          <GitBranch className="w-5 h-5 text-primary-500" />
          <h3 className="text-sm font-medium text-gray-200 uppercase tracking-wide">Source Control</h3>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-300 mb-3">
          <GitBranch className="w-4 h-4" />
          <span>main</span>
          <span className="text-gray-500">•</span>
          <span className="text-green-400">{changes.length} changes</span>
        </div>
        
        <input
          type="text"
          placeholder="Commit message..."
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-sm text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 mb-2"
        />
        
        <motion.button
          className="w-full p-2 bg-primary-600 hover:bg-primary-700 rounded text-sm transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <GitCommit className="w-4 h-4 inline mr-2" />
          Commit Changes
        </motion.button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3">
        <h4 className="text-sm font-medium text-gray-300 mb-3">Changes ({changes.length})</h4>
        <div className="space-y-1">
          {changes.map((change, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded cursor-pointer"
              whileHover={{ x: 4 }}
            >
              {getChangeIcon(change.type)}
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-300 truncate">{change.file}</div>
                <div className="text-xs text-gray-500">
                  <span className="text-green-400">+{change.additions}</span>
                  {change.deletions > 0 && (
                    <span className="text-red-400 ml-2">-{change.deletions}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}