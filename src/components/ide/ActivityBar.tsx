import { 
  Files, 
  Search, 
  GitBranch, 
  Bug, 
  Package, 
  Zap,
  Settings,
  User
} from 'lucide-react';
import { motion } from 'framer-motion';
import { PanelType } from '../../layouts/IDELayout';

interface Props {
  activePanel: PanelType;
  onPanelChange: (panel: PanelType) => void;
  onToggleSidePanel: () => void;
}

const activities = [
  { id: 'explorer' as PanelType, icon: Files, label: 'Explorer' },
  { id: 'search' as PanelType, icon: Search, label: 'Search' },
  { id: 'git' as PanelType, icon: GitBranch, label: 'Source Control' },
  { id: 'debug' as PanelType, icon: Bug, label: 'Run and Debug' },
  { id: 'extensions' as PanelType, icon: Package, label: 'Extensions' },
  { id: 'mcp' as PanelType, icon: Zap, label: 'MCP Server' },
];

export default function ActivityBar({ activePanel, onPanelChange, onToggleSidePanel }: Props) {
  return (
    <div className="w-12 bg-gray-900 border-r border-gray-700 flex flex-col">
      {/* Logo */}
      <div className="h-12 flex items-center justify-center border-b border-gray-700">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center"
        >
          <Zap className="w-5 h-5 text-white" />
        </motion.div>
      </div>

      {/* Activity Icons */}
      <div className="flex-1 py-2">
        {activities.map((activity) => {
          const Icon = activity.icon;
          const isActive = activePanel === activity.id;
          
          return (
            <motion.button
              key={activity.id}
              onClick={() => {
                if (isActive) {
                  onToggleSidePanel();
                } else {
                  onPanelChange(activity.id);
                }
              }}
              className={`w-full h-12 flex items-center justify-center relative group ${
                isActive ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={activity.label}
            >
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 w-0.5 h-6 bg-primary-500 rounded-r"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <Icon className="w-6 h-6" />
              
              {/* Tooltip */}
              <div className="absolute left-12 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                {activity.label}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="border-t border-gray-700 py-2">
        <motion.button
          className="w-full h-12 flex items-center justify-center text-gray-400 hover:text-white group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Settings"
        >
          <Settings className="w-6 h-6" />
          <div className="absolute left-12 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
            Settings
          </div>
        </motion.button>
        
        <motion.button
          className="w-full h-12 flex items-center justify-center text-gray-400 hover:text-white group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Account"
        >
          <User className="w-6 h-6" />
          <div className="absolute left-12 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
            Account
          </div>
        </motion.button>
      </div>
    </div>
  );
}