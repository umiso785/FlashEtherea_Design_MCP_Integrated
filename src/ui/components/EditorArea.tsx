import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Play, HelpCircle } from 'lucide-react';
import { Editor } from '@monaco-editor/react';

interface Tab {
  id: string;
  name: string;
  path: string;
  content: string;
  isDirty: boolean;
  language: string;
}

const initialTabs: Tab[] = [
  {
    id: '1',
    name: 'API_Contracts.md',
    path: '/docs/API_Contracts.md',
    content: `# FlashEtherea API Contracts

## MCP Server Endpoints

### GET /api/kpi/{metric}
Get detailed KPI metric data.

**Path Parameters:**
- \`metric\`: KPI metric name (roi, ctr, detect_rate, uptime)

**Query Parameters:**
- \`range\`: Time range (1h, 6h, 1d, 7d)

**Response:**
\`\`\`json
{
  "metric": "roi",
  "current": 2.15,
  "target": 2.0,
  "status": "healthy",
  "points": [
    ["2025-01-27T03:30:00Z", 2.05],
    ["2025-01-27T03:35:00Z", 2.10]
  ]
}
\`\`\`

### POST /predict
Execute or analyze code through MCP adapters.

**Request:**
\`\`\`json
{
  "code": "console.log('Hello FlashEtherea');"
}
\`\`\`

**Response:**
\`\`\`json
{
  "output": "✅ Code analysis complete: 32 chars, 1 lines"
}
\`\`\``,
    isDirty: false,
    language: 'markdown'
  }
];

export default function EditorArea() {
  const [tabs, setTabs] = useState<Tab[]>(initialTabs);
  const [activeTabId, setActiveTabId] = useState('1');

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  const closeTab = (tabId: string) => {
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);
    
    if (activeTabId === tabId && newTabs.length > 0) {
      setActiveTabId(newTabs[0].id);
    }
  };

  const updateTabContent = (tabId: string, content: string) => {
    setTabs(tabs.map(tab => 
      tab.id === tabId 
        ? { ...tab, content, isDirty: true }
        : tab
    ));
  };

  const handleRunCode = async () => {
    console.log('Run code:', activeTab?.content);
  };

  const handleExplainCode = async () => {
    console.log('Explain code:', activeTab?.content);
  };

  return (
    <div className="h-full bg-gray-900 flex flex-col">
      {/* Tab Bar */}
      <div className="bg-gray-800 border-b border-gray-700 flex items-center">
        <div className="flex-1 flex overflow-x-auto">
          {tabs.map((tab) => (
            <motion.div
              key={tab.id}
              className={`flex items-center gap-2 px-4 py-2 border-r border-gray-700 cursor-pointer group min-w-0 ${
                activeTabId === tab.id 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setActiveTabId(tab.id)}
              whileHover={{ backgroundColor: activeTabId === tab.id ? undefined : 'rgb(55, 65, 81)' }}
            >
              <span className="text-sm truncate">{tab.name}</span>
              {tab.isDirty && (
                <div className="w-2 h-2 bg-primary-500 rounded-full" />
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
                className="opacity-0 group-hover:opacity-100 hover:bg-gray-600 rounded p-0.5 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </div>
        
        <div className="flex items-center px-2 gap-2">
          <motion.button
            onClick={handleRunCode}
            className="flex items-center gap-1 px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            title="Run Code (Ctrl+Enter)"
          >
            <Play className="w-4 h-4" />
            Run
          </motion.button>
          
          <motion.button
            onClick={handleExplainCode}
            className="flex items-center gap-1 px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            title="Explain Code"
          >
            <HelpCircle className="w-4 h-4" />
            Explain
          </motion.button>
          
          <button className="p-2 hover:bg-gray-700 rounded">
            <Plus className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab && (
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="h-full"
            >
              <Editor
                value={activeTab.content}
                language={activeTab.language}
                onChange={(val) => updateTabContent(activeTab.id, val || '')}
                theme="vs-dark"
                options={{
                  minimap: { enabled: true },
                  fontSize: 14,
                  automaticLayout: true,
                  wordWrap: 'on',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}