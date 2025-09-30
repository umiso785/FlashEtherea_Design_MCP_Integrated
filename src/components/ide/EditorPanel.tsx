import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, MoreHorizontal } from 'lucide-react';
import CodeEditor from './CodeEditor';
import { useEditor } from '../../services/mcp_hooks';

interface Tab {
  id: string;
  name: string;
  path: string;
  content: string;
  isDirty: boolean;
  language: string;
}

interface Props {
  onRunCode: (code: string) => void;
  onExplainCode: (code: string) => void;
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

export default function EditorPanel({ onRunCode, onExplainCode }: Props) {
  const [tabs, setTabs] = useState<Tab[]>(initialTabs);
  const [activeTabId, setActiveTabId] = useState('1');
  const { runCode, explainCode, loading } = useEditor();

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
    if (activeTab) {
      await runCode(activeTab.content);
      onRunCode(activeTab.content);
    }
  };

  const handleExplainCode = async () => {
    if (activeTab) {
      await explainCode(activeTab.content);
      onExplainCode(activeTab.content);
    }
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
        
        <div className="flex items-center px-2">
          <button className="p-2 hover:bg-gray-700 rounded">
            <Plus className="w-4 h-4 text-gray-400" />
          </button>
          <button 
            onClick={handleRunCode}
            disabled={loading}
            className="p-2 hover:bg-gray-700 rounded disabled:opacity-50"
            title="Run Code (Ctrl+Enter)"
          >
            <span className="text-xs text-green-400">▶</span>
          </button>
          <button 
            onClick={handleExplainCode}
            disabled={loading}
            className="p-2 hover:bg-gray-700 rounded disabled:opacity-50"
            title="Explain Code"
          >
            <span className="text-xs text-blue-400">?</span>
          </button>
          <button className="p-2 hover:bg-gray-700 rounded">
            <MoreHorizontal className="w-4 h-4 text-gray-400" />
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
              <CodeEditor
                value={activeTab.content}
                language={activeTab.language}
                onChange={(value) => updateTabContent(activeTab.id, value)}
                onRunCode={handleRunCode}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}