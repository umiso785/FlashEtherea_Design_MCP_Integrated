import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Server, Activity, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface MCPAdapter {
  name: string;
  status: 'healthy' | 'warning' | 'error';
  latency: string;
  description: string;
}

const mockAdapters: MCPAdapter[] = [
  {
    name: 'ollama',
    status: 'healthy',
    latency: '45ms',
    description: 'Local LLM inference server'
  },
  {
    name: 'deepseek',
    status: 'warning',
    latency: '120ms',
    description: 'DeepSeek API integration'
  },
  {
    name: 'local_llm',
    status: 'error',
    latency: 'timeout',
    description: 'Local model processing'
  }
];

export default function MCPPanel() {
  const [adapters] = useState<MCPAdapter[]>(mockAdapters);
  const [serverStatus] = useState({
    uptime: '2h 34m',
    requests: 1247,
    errors: 3,
    avgLatency: '67ms'
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default:
        return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-400';
      case 'warning':
        return 'text-yellow-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="h-full bg-gray-800 text-white flex flex-col">
      <div className="p-3 border-b border-gray-700">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-primary-500" />
          <h3 className="text-sm font-medium text-gray-200 uppercase tracking-wide">MCP Server</h3>
        </div>
        
        {/* Server Status */}
        <div className="bg-gray-900 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Server className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium">Server Status</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-gray-400" />
              <span className="text-gray-400">Uptime:</span>
              <span className="text-green-400">{serverStatus.uptime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-gray-400" />
              <span className="text-gray-400">Requests:</span>
              <span className="text-blue-400">{serverStatus.requests}</span>
            </div>
            <div className="flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-gray-400" />
              <span className="text-gray-400">Errors:</span>
              <span className="text-red-400">{serverStatus.errors}</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-gray-400" />
              <span className="text-gray-400">Avg Latency:</span>
              <span className="text-yellow-400">{serverStatus.avgLatency}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3">
        <h4 className="text-sm font-medium text-gray-300 mb-3">AI Adapters</h4>
        <div className="space-y-2">
          {adapters.map((adapter) => (
            <motion.div
              key={adapter.name}
              className="bg-gray-900 rounded-lg p-3 hover:bg-gray-700 transition-colors cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(adapter.status)}
                  <span className="text-sm font-medium">{adapter.name}</span>
                </div>
                <span className={`text-xs ${getStatusColor(adapter.status)}`}>
                  {adapter.latency}
                </span>
              </div>
              <p className="text-xs text-gray-400">{adapter.description}</p>
              <div className="mt-2 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  adapter.status === 'healthy' ? 'bg-green-400' :
                  adapter.status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'
                }`} />
                <span className={`text-xs capitalize ${getStatusColor(adapter.status)}`}>
                  {adapter.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Quick Actions */}
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <motion.button
              className="w-full p-2 bg-primary-600 hover:bg-primary-700 rounded text-sm transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Restart All Adapters
            </motion.button>
            <motion.button
              className="w-full p-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Logs
            </motion.button>
            <motion.button
              className="w-full p-2 bg-yellow-600 hover:bg-yellow-700 rounded text-sm transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Emergency Rollback
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}