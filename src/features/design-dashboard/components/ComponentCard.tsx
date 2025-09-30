import { motion } from 'framer-motion';
import { Code, AlertTriangle, CheckCircle, Clock, Eye, Edit, Trash2 } from 'lucide-react';
import { ComponentNode } from '../../../shared/types/design.types';

interface Props {
  component: ComponentNode;
}

export default function ComponentCard({ component }: Props) {
  const getStatusIcon = () => {
    switch (component.status) {
      case 'healthy':
        return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default:
        return <Code className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = () => {
    switch (component.status) {
      case 'healthy':
        return 'border-emerald-500/30 bg-emerald-900/10';
      case 'warning':
        return 'border-amber-500/30 bg-amber-900/10';
      case 'error':
        return 'border-red-500/30 bg-red-900/10';
      default:
        return 'border-gray-500/30 bg-gray-900/10';
    }
  };

  const getTypeColor = () => {
    switch (component.type) {
      case 'component':
        return 'bg-blue-500';
      case 'hook':
        return 'bg-green-500';
      case 'service':
        return 'bg-purple-500';
      case 'store':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      className={`bg-[#0f1419] rounded-lg p-4 border ${getStatusColor()} hover:bg-gray-800/50 transition-colors`}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${getTypeColor()}`}></div>
          <h4 className="text-sm font-medium text-white">{component.name}</h4>
        </div>
        {getStatusIcon()}
      </div>
      
      <div className="text-xs text-gray-400 mb-3">
        <div className="flex items-center gap-1 mb-1">
          <Code className="w-3 h-3" />
          <span>{component.type}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{component.lastModified.toLocaleDateString()}</span>
        </div>
      </div>
      
      <div className="text-xs text-gray-500 mb-3">
        <div>Dependencies: {component.dependencies.length}</div>
        <div>Exports: {component.exports.length}</div>
      </div>
      
      <div className="flex items-center gap-2">
        <motion.button
          className="flex items-center gap-1 px-2 py-1 bg-blue-600/20 hover:bg-blue-600/40 rounded text-xs text-blue-300 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Eye className="w-3 h-3" />
          View
        </motion.button>
        
        <motion.button
          className="flex items-center gap-1 px-2 py-1 bg-green-600/20 hover:bg-green-600/40 rounded text-xs text-green-300 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Edit className="w-3 h-3" />
          Edit
        </motion.button>
        
        <motion.button
          className="flex items-center gap-1 px-2 py-1 bg-red-600/20 hover:bg-red-600/40 rounded text-xs text-red-300 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Trash2 className="w-3 h-3" />
          Delete
        </motion.button>
      </div>
    </motion.div>
  );
}