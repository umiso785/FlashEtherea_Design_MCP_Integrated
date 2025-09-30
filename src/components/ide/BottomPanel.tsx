import { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Bug, AlertCircle, X, Maximize2 } from 'lucide-react';
import { useEffect } from 'react';

interface Props {
  height: number;
  onResize: (height: number) => void;
  onClose: () => void;
  logs: string[];
}

export default function BottomPanel({ height, onResize, onClose, logs }: Props) {
  const [activeTab, setActiveTab] = useState('terminal');
  const [isResizing, setIsResizing] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState([
    '🚀 FlashEtherea MCP IDE initialized',
    '📡 Connecting to MCP server at localhost:8000...',
    '✅ MCP server connection established',
    '🔧 Loading AI adapters...',
    '   - ollama: healthy (45ms)',
    '   - deepseek: warning (120ms)', 
    '   - local_llm: error (timeout)',
    '🛡️ Do-No-Harm policies activated',
    '📊 KPI monitoring started',
    '',
    'flashetherea@ide:~$ '
  ]);

  // MCP 로그를 터미널에 추가
  useEffect(() => {
    if (logs.length > 0) {
      const latestLog = logs[logs.length - 1];
      setTerminalOutput(prev => [...prev.slice(0, -1), latestLog, 'flashetherea@ide:~$ ']);
    }
  }, [logs]);
  // MCP 로그를 터미널에 추가
  useEffect(() => {
    if (logs.length > 0) {
      const latestLog = logs[logs.length - 1];
      setTerminalOutput(prev => [...prev.slice(0, -1), latestLog, 'flashetherea@ide:~$ ']);
    }
  }, [logs]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    const startY = e.clientY;
    const startHeight = height;

    const handleMouseMove = (e: MouseEvent) => {
      const newHeight = Math.max(100, Math.min(400, startHeight - (e.clientY - startY)));
      onResize(newHeight);
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
    { id: 'terminal', icon: Terminal, label: 'Terminal', count: null },
    { id: 'problems', icon: AlertCircle, label: 'Problems', count: 2 },
    { id: 'debug', icon: Bug, label: 'Debug Console', count: null },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Resize Handle */}
      <div
        className={`h-1 bg-gray-700 hover:bg-primary-500 cursor-row-resize transition-colors ${
          isResizing ? 'bg-primary-500' : ''
        }`}
        onMouseDown={handleMouseDown}
      />
      
      <div className="flex-1 bg-gray-800 text-white flex flex-col">
        {/* Tab Bar */}
        <div className="flex items-center justify-between border-b border-gray-700">
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm border-r border-gray-700 ${
                    activeTab === tab.id
                      ? 'bg-gray-900 text-white border-b-2 border-primary-500'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                  whileHover={{ backgroundColor: activeTab === tab.id ? undefined : 'rgb(55, 65, 81)' }}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {tab.count && (
                    <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      {tab.count}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
          
          <div className="flex items-center gap-1 px-2">
            <motion.button
              className="p-1 hover:bg-gray-700 rounded"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Maximize2 className="w-4 h-4 text-gray-400" />
            </motion.button>
            <motion.button
              onClick={onClose}
              className="p-1 hover:bg-gray-700 rounded"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-4 h-4 text-gray-400" />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'terminal' && (
            <div className="h-full bg-gray-900 p-4 font-mono text-sm overflow-y-auto">
              {terminalOutput.map((line, index) => (
                <div key={index} className="text-green-400 whitespace-pre-wrap">
                  {line}
                  {index === terminalOutput.length - 1 && (
                    <motion.span
                      className="bg-green-400 w-2 h-4 inline-block ml-1"
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'problems' && (
            <div className="h-full p-4 overflow-y-auto">
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <div className="flex-1">
                    <div className="text-sm text-red-400">Type 'string' is not assignable to type 'number'</div>
                    <div className="text-xs text-gray-400">src/components/Editor.tsx:45:12</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded">
                  <AlertCircle className="w-4 h-4 text-yellow-400" />
                  <div className="flex-1">
                    <div className="text-sm text-yellow-400">Unused variable 'result'</div>
                    <div className="text-xs text-gray-400">src/services/api.ts:23:7</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'debug' && (
            <div className="h-full p-4 overflow-y-auto">
              <div className="text-sm text-gray-400">
                Debug console is ready. Start debugging to see output.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}