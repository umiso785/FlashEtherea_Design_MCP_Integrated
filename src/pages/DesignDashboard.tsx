import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Send, 
  Code, 
  Eye, 
  Folder, 
  File, 
  ChevronRight, 
  ChevronDown,
  Search,
  Plus,
  Settings,
  BarChart3,
  FileText,
  Layers,
  Zap,
  Bot,
  User,
  Copy,
  Download,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Terminal,
  Lightbulb,
  Hash,
  MessageSquare
} from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileNode[];
  isOpen?: boolean;
  language?: string;
}

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    type: 'assistant',
    content: '안녕하세요! 👋 FlashEtherea 설계 도우미입니다.\n\n어떤 도움이 필요하신가요?\n• API 설계 검토\n• 컴포넌트 구조 분석\n• 보안 검토\n• 성능 최적화',
    timestamp: new Date(Date.now() - 300000)
  }
];

const mockFiles: FileNode[] = [
  {
    name: 'src',
    type: 'folder',
    path: '/src',
    isOpen: true,
    children: [
      {
        name: 'components',
        type: 'folder',
        path: '/src/components',
        isOpen: true,
        children: [
          { name: 'ActivityBar.tsx', type: 'file', path: '/src/components/ActivityBar.tsx', language: 'typescript' },
          { name: 'CodeEditor.tsx', type: 'file', path: '/src/components/CodeEditor.tsx', language: 'typescript' },
          { name: 'Navigation.tsx', type: 'file', path: '/src/components/Navigation.tsx', language: 'typescript' },
        ]
      },
      {
        name: 'pages',
        type: 'folder',
        path: '/src/pages',
        isOpen: true,
        children: [
          { name: 'Dashboard.tsx', type: 'file', path: '/src/pages/Dashboard.tsx', language: 'typescript' },
          { name: 'DesignDashboard.tsx', type: 'file', path: '/src/pages/DesignDashboard.tsx', language: 'typescript' },
          { name: 'ExecutionDashboard.tsx', type: 'file', path: '/src/pages/ExecutionDashboard.tsx', language: 'typescript' },
          { name: 'Settings.tsx', type: 'file', path: '/src/pages/Settings.tsx', language: 'typescript' },
        ]
      },
      { name: 'App.tsx', type: 'file', path: '/src/App.tsx', language: 'typescript' },
      { name: 'main.tsx', type: 'file', path: '/src/main.tsx', language: 'typescript' },
    ]
  },
  {
    name: 'docs',
    type: 'folder',
    path: '/docs',
    isOpen: true,
    children: [
      { name: 'API_Contracts.md', type: 'file', path: '/docs/API_Contracts.md', language: 'markdown' },
      { name: 'UI_Playbook.md', type: 'file', path: '/docs/UI_Playbook.md', language: 'markdown' },
    ]
  },
  { name: 'package.json', type: 'file', path: '/package.json', language: 'json' },
  { name: 'vite.config.ts', type: 'file', path: '/vite.config.ts', language: 'typescript' },
];

const apiContractContent = `# FlashEtherea API Contracts

## GET /api/signals/stream
Real-time KPI metrics streaming endpoint.

**Query Parameters:**
- \`metrics\`: Comma-separated list (roi,ctr,detect_rate,uptime)
- \`window\`: Time window (1m, 5m, 1h, 1d)

**Response:**
\`\`\`json
{
  "series": [
    {
      "metric": "roi",
      "points": [
        ["2025-01-27T03:30:00Z", 2.05],
        ["2025-01-27T03:35:00Z", 2.10]
      ]
    }
  ],
  "flowlog_samples": [
    {
      "ts": "2025-01-27T03:35:00Z",
      "route": "conversion_branch_a",
      "user_agent": "Mozilla/5.0...",
      "detected": false,
      "score": 0.92
    }
  ]
}
\`\`\`

## POST /predict
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
\`\`\`

## Security Considerations

### Authentication
- Bearer token required for all endpoints
- Token validation with JWT
- Refresh token mechanism

### Rate Limiting
- 100 requests per minute per IP
- 1000 requests per hour per authenticated user
- Burst protection with sliding window

### Data Validation
- Strict input parameter validation
- SQL injection prevention
- XSS protection with content sanitization`;

export default function DesignDashboard() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [files, setFiles] = useState<FileNode[]>(mockFiles);
  const [selectedFile, setSelectedFile] = useState<string>('/docs/API_Contracts.md');
  const [activeView, setActiveView] = useState<'code' | 'preview'>('preview');
  const [searchTerm, setSearchTerm] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // 시뮬레이션된 AI 응답
    setTimeout(() => {
      setIsTyping(false);
      const aiResponses = [
        `네, "${newMessage}"에 대해 분석해보겠습니다! 🔍\n\nFlashEtherea 시스템에서 이 요청을 처리하기 위해 관련 컴포넌트와 API를 검토했습니다.\n\n**분석 결과:**\n• 현재 구조가 잘 설계되어 있습니다\n• 몇 가지 개선점을 제안드립니다\n• 보안 강화가 필요합니다`,
        `좋은 질문입니다! 💡\n\n"${newMessage}"와 관련하여 다음과 같이 제안드립니다:\n\n**1. 아키텍처 개선**\n• 모듈화 강화\n• 의존성 최적화\n• 성능 향상\n\n**2. 보안 강화**\n• 인증 체계 개선\n• 데이터 검증 강화\n• 모니터링 추가\n\n더 자세한 내용이 필요하시면 말씀해주세요!`,
        `"${newMessage}"에 대한 FlashEtherea 관점에서의 답변입니다! ⚡\n\n**현재 상태:**\n✅ 기본 구조 완성\n⚠️ 최적화 필요\n🔧 개선 진행 중\n\n**다음 단계:**\n1. 코드 리뷰 진행\n2. 테스트 케이스 추가\n3. 문서화 완료\n\n어떤 부분부터 시작하시겠습니까?`
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleFolder = (path: string) => {
    const updateNode = (nodes: FileNode[]): FileNode[] => {
      return nodes.map(node => {
        if (node.path === path && node.type === 'folder') {
          return { ...node, isOpen: !node.isOpen };
        }
        if (node.children) {
          return { ...node, children: updateNode(node.children) };
        }
        return node;
      });
    };
    setFiles(updateNode(files));
  };

  const getFileIcon = (name: string, type: string) => {
    if (type === 'folder') return Folder;
    if (name.endsWith('.tsx') || name.endsWith('.ts')) return Code;
    if (name.endsWith('.json')) return Settings;
    if (name.endsWith('.md')) return FileText;
    return File;
  };

  const renderFileNode = (node: FileNode, depth = 0) => {
    const Icon = getFileIcon(node.name, node.type);
    const isSelected = selectedFile === node.path;

    return (
      <div key={node.path}>
        <motion.div
          className={`flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-gray-700/50 transition-colors ${
            isSelected ? 'bg-blue-600/20 border-r-2 border-blue-500' : ''
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.path);
            } else {
              setSelectedFile(node.path);
            }
          }}
          whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
          whileTap={{ scale: 0.98 }}
        >
          {node.type === 'folder' && (
            <motion.div
              animate={{ rotate: node.isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </motion.div>
          )}
          {node.type === 'file' && <div className="w-4" />}
          <Icon className={`w-4 h-4 ${
            node.type === 'folder' ? 'text-blue-400' : 'text-gray-300'
          }`} />
          <span className={`text-sm ${isSelected ? 'text-white font-medium' : 'text-gray-300'}`}>
            {node.name}
          </span>
        </motion.div>
        
        <AnimatePresence>
          {node.type === 'folder' && node.isOpen && node.children && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: 'hidden' }}
            >
              {node.children.map(child => renderFileNode(child, depth + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="h-screen bg-[#1e1e1e] text-white flex flex-col">
      {/* 상단 네비게이션 바 */}
      <div className="h-12 bg-[#2d2d2d] border-b border-gray-700 flex items-center px-4">
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">F</span>
          </div>
          <span className="text-sm font-medium text-white">FlashEtherea_Design_환경오류</span>
        </div>
        
        <div className="flex-1 flex items-center justify-center gap-4">
          <button className="px-3 py-1 text-xs text-gray-300 hover:text-white transition-colors">
            Preview
          </button>
          <button className="px-3 py-1 text-xs text-gray-300 hover:text-white transition-colors">
            Console
          </button>
          <button className="px-3 py-1 text-xs text-orange-400 border-b border-orange-400">
            API_Contracts.md
          </button>
          <button className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-white">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-32 h-7 pl-7 pr-2 bg-[#3a3a3a] border border-gray-600 rounded text-xs text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
            />
          </div>
          <button className="w-7 h-7 flex items-center justify-center bg-[#3a3a3a] rounded hover:bg-gray-600">
            <Settings className="w-3 h-3 text-gray-400" />
          </button>
          <button className="w-7 h-7 flex items-center justify-center bg-[#3a3a3a] rounded hover:bg-gray-600">
            <User className="w-3 h-3 text-gray-400" />
          </button>
          <button className="px-3 py-1 bg-orange-500 hover:bg-orange-600 rounded text-xs text-white font-medium">
            Publish
          </button>
        </div>
      </div>

      {/* 메인 레이아웃 */}
      <div className="flex-1 flex overflow-hidden">
        {/* 왼쪽 패널 - AI Assistant */}
        <div className="w-80 bg-[#2d2d2d] border-r border-gray-700 flex flex-col">
          {/* AI Assistant 헤더 */}
          <div className="p-3 border-b border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <Bot className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium text-white">AI Assistant</span>
            </div>
            <div className="text-xs text-gray-400">
              <span className="text-orange-400 font-semibold">5.6M</span> monthly tokens remaining.
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Switch to Pro 200 for 2x more usage
            </div>
          </div>
          
          {/* 채팅 메시지 영역 */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`flex gap-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {message.type === 'assistant' && (
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                )}
                
                <div className={`max-w-[75%] ${message.type === 'user' ? 'order-1' : ''}`}>
                  <div className={`p-2 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white ml-auto' 
                      : 'bg-[#3a3a3a] border border-gray-600'
                  }`}>
                    <p className="text-xs whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>
                  <div className={`text-xs text-gray-500 mt-1 px-1 ${
                    message.type === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    {formatTime(message.timestamp)}
                  </div>
                </div>
                
                {message.type === 'user' && (
                  <div className="w-6 h-6 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-3 h-3 text-white" />
                  </div>
                )}
              </motion.div>
            ))}
            
            {/* 타이핑 인디케이터 */}
            {isTyping && (
              <motion.div
                className="flex gap-2 justify-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3 h-3 text-white" />
                </div>
                <div className="bg-[#3a3a3a] border border-gray-600 p-2 rounded-lg">
                  <div className="flex gap-1">
                    <motion.div
                      className="w-1 h-1 bg-gray-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-1 h-1 bg-gray-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-1 h-1 bg-gray-400 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* 하단 입력 영역 */}
          <div className="p-3 border-t border-gray-700">
            {/* 입력창과 Send 버튼 */}
            <div className="flex items-center gap-2 px-3 py-2 bg-[#3a3a3a] border border-gray-600 rounded-lg mb-2">
              <input
                ref={chatInputRef}
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="How can Bolt help you today?"
                className="flex-1 bg-transparent text-xs text-white placeholder-gray-400 focus:outline-none"
              />
              
              <motion.button
                onClick={handleSendMessage}
                className="w-6 h-6 bg-blue-600 hover:bg-blue-700 rounded flex items-center justify-center transition-colors disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!newMessage.trim() || isTyping}
              >
                <Send className="w-3 h-3 text-white" />
              </motion.button>
            </div>
            
            {/* 하단 버튼들 */}
            <div className="flex gap-2">
              <motion.button
                className="flex items-center gap-1 px-2 py-1 bg-transparent hover:bg-gray-600/30 rounded text-xs text-gray-300 transition-colors border border-transparent hover:border-gray-500/30"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-3 h-3" />
                <span>Select</span>
              </motion.button>
              
              <motion.button
                className="flex items-center gap-1 px-2 py-1 bg-transparent hover:bg-gray-600/30 rounded text-xs text-gray-300 transition-colors border border-transparent hover:border-gray-500/30"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageSquare className="w-3 h-3" />
                <span>Discuss</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* 중앙 패널 - 코드/프리뷰 */}
        <div className="flex-1 bg-[#1e1e1e] flex flex-col">
          {/* 코드/프리뷰 헤더 */}
          <div className="h-10 border-b border-gray-700 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-white">index.js</span>
            </div>
            <div className="flex gap-1">
              <motion.button
                onClick={() => setActiveView('preview')}
                className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                  activeView === 'preview' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Eye className="w-3 h-3" />
                Preview
              </motion.button>
              <motion.button
                onClick={() => setActiveView('code')}
                className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
                  activeView === 'code' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Code className="w-3 h-3" />
                Code
              </motion.button>
            </div>
          </div>
          
          {/* 코드/프리뷰 내용 */}
          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              {activeView === 'preview' ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-full overflow-y-auto p-4 prose prose-invert max-w-none"
                >
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-blue-400" />
                        GET /api/signals/stream
                      </h3>
                      <p className="text-gray-300 mb-4 text-sm">Real-time KPI metrics streaming endpoint.</p>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-white mb-2">Query Parameters:</h4>
                        <div className="space-y-2">
                          <div className="flex items-start gap-2 p-2 bg-[#2d2d2d] rounded border border-gray-700">
                            <span className="text-amber-400 font-mono text-xs font-semibold">metrics</span>
                            <span className="text-gray-300 text-xs">: Comma-separated list (roi,ctr,detect_rate,uptime)</span>
                          </div>
                          <div className="flex items-start gap-2 p-2 bg-[#2d2d2d] rounded border border-gray-700">
                            <span className="text-amber-400 font-mono text-xs font-semibold">window</span>
                            <span className="text-gray-300 text-xs">: Time window (1m, 5m, 1h, 1d)</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="text-sm font-semibold text-white mb-2">Response:</h4>
                        <div className="bg-[#2d2d2d] rounded-lg p-3 border border-gray-700">
                          <pre className="text-xs text-gray-300 overflow-x-auto">
{`{
  "series": [
    {
      "metric": "roi",
      "points": [
        ["2025-01-27T03:30:00Z", 2.05],
        ["2025-01-27T03:35:00Z", 2.10]
      ]
    }
  ],
  "flowlog_samples": [
    {
      "ts": "2025-01-27T03:35:00Z",
      "route": "conversion_branch_a",
      "user_agent": "Mozilla/5.0...",
      "detected": false,
      "score": 0.92
    }
  ]
}`}
                          </pre>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                        <Code className="w-5 h-5 text-green-400" />
                        POST /predict
                      </h3>
                      <p className="text-gray-300 mb-3 text-sm">Execute or analyze code through MCP adapters.</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-medium text-white mb-2">Request:</h5>
                          <div className="bg-[#2d2d2d] rounded-lg p-3 border border-gray-700">
                            <pre className="text-xs text-gray-300">
{`{
  "code": "console.log('Hello FlashEtherea');"
}`}
                            </pre>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium text-white mb-2">Response:</h5>
                          <div className="bg-[#2d2d2d] rounded-lg p-3 border border-gray-700">
                            <pre className="text-xs text-gray-300">
{`{
  "output": "✅ Code analysis complete: 32 chars, 1 lines"
}`}
                            </pre>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="code"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-full overflow-y-auto"
                >
                  <div className="bg-[#1e1e1e] p-4 font-mono text-xs h-full">
                    <pre className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {apiContractContent}
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 오른쪽 패널 - Files */}
        <div className="w-64 bg-[#2d2d2d] border-l border-gray-700 flex flex-col">
          {/* Files 헤더 */}
          <div className="p-3 border-b border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-200">Files</h3>
              <div className="flex gap-1">
                <motion.button 
                  className="p-1 hover:bg-gray-600 rounded"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Plus className="w-3 h-3 text-gray-400" />
                </motion.button>
                <motion.button 
                  className="p-1 hover:bg-gray-600 rounded"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Settings className="w-3 h-3 text-gray-400" />
                </motion.button>
              </div>
            </div>
            
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-7 pr-2 py-1 bg-[#3a3a3a] border border-gray-600 rounded text-xs text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          
          {/* 폴더 트리 */}
          <div className="flex-1 overflow-y-auto py-1">
            {files.map(node => renderFileNode(node))}
          </div>
        </div>
      </div>

      {/* 하단 Terminal 패널 */}
      <div className="h-48 bg-[#1e1e1e] border-t border-gray-700 flex flex-col">
        {/* Terminal 헤더 */}
        <div className="h-8 bg-[#2d2d2d] border-b border-gray-700 flex items-center justify-between px-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-3 h-3 text-cyan-400" />
            <span className="text-xs font-medium text-white">Terminal</span>
          </div>
          <div className="flex gap-1">
            <button className="w-5 h-5 flex items-center justify-center hover:bg-gray-600 rounded">
              <span className="text-xs text-gray-400">−</span>
            </button>
            <button className="w-5 h-5 flex items-center justify-center hover:bg-gray-600 rounded">
              <span className="text-xs text-gray-400">×</span>
            </button>
          </div>
        </div>
        
        {/* Terminal 내용 */}
        <div className="flex-1 bg-[#1e1e1e] p-3 font-mono text-xs overflow-y-auto">
          <div className="text-gray-300 space-y-1">
            <div className="text-gray-500">$ npm run dev</div>
            <div className="text-blue-400">Starting development server...</div>
            <div className="text-green-400">Server running on http://localhost:5000</div>
            <div className="text-gray-300">Watching for file changes...</div>
            <div className="text-gray-500 mt-2">$ <span className="animate-pulse">_</span></div>
          </div>
        </div>
      </div>

      {/* 맨 하단 입력창 */}
      <div className="h-12 bg-[#2d2d2d] border-t border-gray-700 flex items-center px-3">
        <div className="flex items-center gap-2 flex-1">
          <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-600 rounded">
            <Code className="w-3 h-3 text-gray-400" />
          </button>
          <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-600 rounded">
            <Hash className="w-3 h-3 text-gray-400" />
          </button>
        </div>
        
        <div className="flex-1 mx-3">
          <input
            type="text"
            placeholder="Make, test, iterate..."
            className="w-full px-3 py-2 bg-[#3a3a3a] border border-gray-600 rounded text-xs text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <button className="w-6 h-6 flex items-center justify-center hover:bg-gray-600 rounded">
            <Sparkles className="w-3 h-3 text-gray-400" />
          </button>
          <button className="w-6 h-6 bg-orange-500 hover:bg-orange-600 rounded flex items-center justify-center">
            <Send className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}