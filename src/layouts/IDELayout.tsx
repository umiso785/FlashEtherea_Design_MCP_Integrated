import { useState } from 'react';
import { Send, Bot, User, Sparkles, Files, Search, Terminal, Minus, X, Plus, Code, Settings, FileText } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileNode[];
  isOpen?: boolean;
}

const mockFiles: FileNode[] = [
  {
    name: '.git',
    type: 'folder',
    path: '/.git',
    children: []
  },
  {
    name: 'api',
    type: 'folder',
    path: '/api',
    children: []
  },
  {
    name: 'attached_assets',
    type: 'folder',
    path: '/attached_assets',
    children: []
  },
  {
    name: 'backend',
    type: 'folder',
    path: '/backend',
    children: []
  },
  {
    name: 'docs',
    type: 'folder',
    path: '/docs',
    children: []
  },
  {
    name: 'frontend',
    type: 'folder',
    path: '/frontend',
    isOpen: true,
    children: [
      { name: 'index.js', type: 'file', path: '/frontend/index.js' },
      { name: 'app.js', type: 'file', path: '/frontend/app.js' },
      { name: 'styles.css', type: 'file', path: '/frontend/styles.css' }
    ]
  },
  {
    name: 'project',
    type: 'folder',
    path: '/project',
    children: []
  },
  { name: '.gitignore', type: 'file', path: '/.gitignore' },
  { name: 'eslint.config.js', type: 'file', path: '/eslint.config.js' },
  { name: 'README.md', type: 'file', path: '/README.md' }
];

const initialCode = `function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet("World");`;

export default function IDELayout() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '안녕하세요! 무엇을 도와드릴까요?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [code, setCode] = useState(initialCode);
  const [selectedFile, setSelectedFile] = useState('/frontend/index.js');
  const [files, setFiles] = useState<FileNode[]>(mockFiles);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: input,
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setInput('');
      
      // AI 응답 시뮬레이션
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: `메시지를 받았습니다: "${input}"`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
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
    if (type === 'folder') return '📁';
    if (name.endsWith('.js')) return 'JS';
    if (name.endsWith('.css')) return '#';
    if (name.endsWith('.md')) return 'M';
    if (name.endsWith('.json')) return '{ }';
    return '📄';
  };

  const renderFileNode = (node: FileNode, depth = 0) => {
    const isSelected = selectedFile === node.path;
    
    return (
      <div key={node.path}>
        <div
          className={`flex items-center gap-1 px-2 py-0.5 cursor-pointer hover:bg-gray-700/50 text-xs ${
            isSelected ? 'bg-blue-600/20 text-blue-400' : 'text-gray-300'
          }`}
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.path);
            } else {
              setSelectedFile(node.path);
            }
          }}
        >
          {node.type === 'folder' && (
            <span className="text-gray-400 text-xs">
              {node.isOpen ? '▼' : '▶'}
            </span>
          )}
          {node.type === 'file' && <div className="w-2" />}
          <span className="text-xs mr-1">{getFileIcon(node.name, node.type)}</span>
          <span className="text-xs">{node.name}</span>
        </div>
        
        {node.type === 'folder' && node.isOpen && node.children && (
          <div>
            {node.children.map(child => renderFileNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen bg-[#1e1e1e] text-white flex flex-col">
      {/* Top Navigation */}
      <div className="h-10 bg-[#2d2d30] border-b border-gray-700 flex items-center px-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded-sm"></div>
          <span className="text-sm text-white">FlashEtherea_Design_환경오류</span>
        </div>
        
        <div className="flex-1 flex items-center gap-1 ml-8">
          <div className="flex items-center gap-1 px-3 py-1 bg-[#1e1e1e] rounded text-xs text-white">
            Preview
            <X className="w-3 h-3 ml-2 text-gray-400" />
          </div>
          <div className="flex items-center gap-1 px-3 py-1 text-xs text-gray-400 hover:bg-gray-700 rounded">
            Console
          </div>
          <div className="flex items-center gap-1 px-3 py-1 text-xs text-gray-400 hover:bg-gray-700 rounded">
            API_Contracts.md
          </div>
          <Plus className="w-4 h-4 text-gray-400 ml-2" />
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1 bg-gray-700 rounded text-xs">
            <Search className="w-3 h-3" />
            <span>Search...</span>
          </div>
          <Settings className="w-4 h-4 text-gray-400" />
          <User className="w-4 h-4 text-gray-400" />
          <button className="px-3 py-1 bg-orange-500 text-white rounded text-xs font-medium">
            Publish
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Panel - AI Assistant */}
        <div className="w-80 bg-[#252526] border-r border-gray-700 flex flex-col">
          <div className="h-10 border-b border-gray-700 flex items-center px-3 gap-2">
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium">AI Assistant</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  message.role === 'assistant' 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-blue-500 text-white'
                }`}>
                  {message.role === 'assistant' ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                </div>
                <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-2 rounded text-xs ${
                    message.role === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-700 text-gray-200'
                  }`}>
                    {message.content}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    오전 {message.timestamp.toLocaleTimeString('ko-KR', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Panel - Code Editor */}
        <div className="flex-1 bg-[#1e1e1e] flex flex-col">
          <div className="h-10 border-b border-gray-700 flex items-center px-3">
            <span className="text-sm text-white">index.js</span>
          </div>
          
          <div className="flex-1 p-4">
            <div className="font-mono text-sm text-white leading-relaxed">
              <div className="flex">
                <div className="w-8 text-gray-500 text-right pr-2">1</div>
                <div>
                  <span className="text-blue-400">function</span>{' '}
                  <span className="text-yellow-300">greet</span>
                  <span className="text-white">(</span>
                  <span className="text-orange-400">name</span>
                  <span className="text-white">) {</span>
                </div>
              </div>
              <div className="flex">
                <div className="w-8 text-gray-500 text-right pr-2">2</div>
                <div className="pl-4">
                  <span className="text-white">console.</span>
                  <span className="text-yellow-300">log</span>
                  <span className="text-white">(</span>
                  <span className="text-green-400">`Hello, </span>
                  <span className="text-white">${</span>
                  <span className="text-orange-400">name</span>
                  <span className="text-white">}</span>
                  <span className="text-green-400">!`</span>
                  <span className="text-white">);</span>
                </div>
              </div>
              <div className="flex">
                <div className="w-8 text-gray-500 text-right pr-2">3</div>
                <div>
                  <span className="text-white">}</span>
                </div>
              </div>
              <div className="flex">
                <div className="w-8 text-gray-500 text-right pr-2">4</div>
                <div></div>
              </div>
              <div className="flex">
                <div className="w-8 text-gray-500 text-right pr-2">5</div>
                <div>
                  <span className="text-yellow-300">greet</span>
                  <span className="text-white">(</span>
                  <span className="text-green-400">"World"</span>
                  <span className="text-white">);</span>
                </div>
              </div>
              <div className="flex">
                <div className="w-8 text-gray-500 text-right pr-2">6</div>
                <div></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Files */}
        <div className="w-80 bg-[#252526] border-l border-gray-700 flex flex-col">
          <div className="h-10 border-b border-gray-700 flex items-center justify-between px-3">
            <span className="text-sm font-medium text-white">Files</span>
            <div className="flex gap-1">
              <Files className="w-4 h-4 text-gray-400" />
              <Code className="w-4 h-4 text-gray-400" />
              <Settings className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          
          <div className="p-2">
            <div className="relative mb-2">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-6 pr-2 py-1 bg-[#3c3c3c] border border-gray-600 rounded text-xs text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <div className="space-y-0.5">
              {files.map(node => renderFileNode(node))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Terminal */}
      <div className="h-48 bg-[#1e1e1e] border-t border-gray-700 flex flex-col">
        <div className="h-8 border-b border-gray-700 flex items-center justify-between px-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-white">Terminal</span>
          </div>
          <div className="flex gap-1">
            <Minus className="w-3 h-3 text-gray-400" />
            <X className="w-3 h-3 text-gray-400" />
          </div>
        </div>
        
        <div className="flex-1 p-3 font-mono text-xs text-green-400 overflow-y-auto">
          <div>$ npm run dev</div>
          <div className="text-gray-300">Starting development server...</div>
          <div className="text-green-400">Server running on http://localhost:5000</div>
          <div className="text-gray-300">Watching for file changes...</div>
          <div className="mt-2">
            <span className="text-orange-400">$</span>
            <span className="ml-1 bg-green-400 w-2 h-3 inline-block animate-pulse"></span>
          </div>
        </div>
      </div>

      {/* Bottom Input */}
      <div className="h-12 bg-[#2d2d30] border-t border-gray-700 flex items-center px-4">
        <div className="flex items-center gap-2 mr-4">
          <Code className="w-4 h-4 text-gray-400" />
          <span className="text-xs text-gray-400">📎</span>
        </div>
        
        <form onSubmit={handleSendMessage} className="flex-1 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Make, test, iterate..."
            className="flex-1 bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none"
          />
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gray-400" />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-1 rounded hover:bg-gray-700 disabled:opacity-50"
            >
              <Send className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  function renderFileNode(node: FileNode, depth = 0) {
    const isSelected = selectedFile === node.path;
    
    return (
      <div key={node.path}>
        <div
          className={`flex items-center gap-1 px-1 py-0.5 cursor-pointer hover:bg-gray-700/50 text-xs ${
            isSelected ? 'bg-blue-600/20 text-blue-400' : 'text-gray-300'
          }`}
          style={{ paddingLeft: `${depth * 12}px` }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.path);
            } else {
              setSelectedFile(node.path);
            }
          }}
        >
          {node.type === 'folder' && (
            <span className="text-gray-400 text-xs w-3">
              {node.isOpen ? '▼' : '▶'}
            </span>
          )}
          {node.type === 'file' && <div className="w-3" />}
          <span className="text-xs mr-1">{getFileIcon(node.name, node.type)}</span>
          <span className="text-xs">{node.name}</span>
        </div>
        
        {node.type === 'folder' && node.isOpen && node.children && (
          <div>
            {node.children.map(child => renderFileNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  }
}