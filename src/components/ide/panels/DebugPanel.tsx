import { Play, Square, RotateCcw, Bug } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DebugPanel() {
  return (
    <div className="h-full bg-gray-800 text-white flex flex-col">
      <div className="p-3 border-b border-gray-700">
        <div className="flex items-center gap-2 mb-3">
          <Bug className="w-5 h-5 text-primary-500" />
          <h3 className="text-sm font-medium text-gray-200 uppercase tracking-wide">Run and Debug</h3>
        </div>
        
        <div className="flex gap-2 mb-3">
          <motion.button
            className="flex items-center gap-2 px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Play className="w-4 h-4" />
            Start
          </motion.button>
          
          <motion.button
            className="flex items-center gap-2 px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Square className="w-4 h-4" />
            Stop
          </motion.button>
          
          <motion.button
            className="flex items-center gap-2 px-3 py-1 bg-gray-600 hover:bg-gray-700 rounded text-sm transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RotateCcw className="w-4 h-4" />
            Restart
          </motion.button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Variables</h4>
            <div className="bg-gray-900 rounded p-2 text-xs">
              <div className="text-gray-400">No variables to display</div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Watch</h4>
            <div className="bg-gray-900 rounded p-2 text-xs">
              <div className="text-gray-400">No watch expressions</div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Call Stack</h4>
            <div className="bg-gray-900 rounded p-2 text-xs">
              <div className="text-gray-400">Not debugging</div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-2">Breakpoints</h4>
            <div className="bg-gray-900 rounded p-2 text-xs">
              <div className="text-gray-400">No breakpoints set</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}