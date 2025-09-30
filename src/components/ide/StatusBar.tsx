import { motion } from 'framer-motion';
import { GitBranch, AlertCircle, Zap, Wifi, Settings } from 'lucide-react';

interface Props {
  onToggleBottomPanel: () => void;
  onToggleRightPanel: () => void;
  showBottomPanel: boolean;
  showRightPanel: boolean;
}

export default function StatusBar({ onToggleBottomPanel, onToggleRightPanel, showBottomPanel, showRightPanel }: Props) {
  return (
    <div className="h-6 bg-primary-600 text-white flex items-center justify-between px-4 text-xs">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <motion.div 
          className="flex items-center gap-1 cursor-pointer hover:bg-primary-700 px-2 py-1 rounded"
          whileHover={{ scale: 1.05 }}
        >
          <GitBranch className="w-3 h-3" />
          <span>main</span>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-1 cursor-pointer hover:bg-primary-700 px-2 py-1 rounded"
          onClick={onToggleBottomPanel}
          whileHover={{ scale: 1.05 }}
        >
          <AlertCircle className="w-3 h-3" />
          <span>{showBottomPanel ? 'Hide' : 'Show'} Problems</span>
        </motion.div>
        
        <div className="flex items-center gap-1">
          <Wifi className="w-3 h-3 text-green-300" />
          <span>MCP Connected</span>
        </div>
      </div>

      {/* Center Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Zap className="w-3 h-3 text-yellow-300" />
          <span>FlashEtherea v1.0.0</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <div className="text-gray-200">
          Agent3 IDE
        </div>
        
        <div className="text-gray-200">
          MCP Connected
        </div>
        
        <div className="text-gray-200">
          {showRightPanel ? 'Panel On' : 'Panel Off'}
        </div>
        
        <motion.button
          className="flex items-center gap-1 hover:bg-primary-700 px-2 py-1 rounded"
          whileHover={{ scale: 1.05 }}
        >
          <Settings className="w-3 h-3" />
        </motion.button>
      </div>
    </div>
  );
}