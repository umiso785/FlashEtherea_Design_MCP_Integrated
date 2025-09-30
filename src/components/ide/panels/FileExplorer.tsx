import { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder, Plus, Search, MoreHorizontal, FileText, Code, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileNode[];
  isOpen?: boolean;
}

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
          { name: 'CodeEditor.tsx', type: 'file', path: '/src/components/CodeEditor.tsx' },
          { name: 'Navigation.tsx', type: 'file', path: '/src/components/Navigation.tsx' },
          {
            name: 'ide',
            type: 'folder',
            path: '/src/components/ide',
            isOpen: true,
            children: [
              { name: 'ActivityBar.tsx', type: 'file', path: '/src/components/ide/ActivityBar.tsx' },
              { name: 'SidePanel.tsx', type: 'file', path: '/src/components/ide/SidePanel.tsx' },
              { name: 'EditorPanel.tsx', type: 'file', path: '/src/components/ide/EditorPanel.tsx' },
            ]
          }
        ]
      },
      {
        name: 'pages',
        type: 'folder',
        path: '/src/pages',
        children: [
          { name: 'Dashboard.tsx', type: 'file', path: '/src/pages/Dashboard.tsx' },
          { name: 'Editor.tsx', type: 'file', path: '/src/pages/Editor.tsx' },
        ]
      },
      { name: 'App.tsx', type: 'file', path: '/src/App.tsx' },
      { name: 'main.tsx', type: 'file', path: '/src/main.tsx' },
    ]
  },
  {
    name: 'docs',
    type: 'folder',
    path: '/docs',
    isOpen: true,
    children: [
      { name: 'API_Contracts.md', type: 'file', path: '/docs/API_Contracts.md' },
      { name: 'UI_Playbook.md', type: 'file', path: '/docs/UI_Playbook.md' },
    ]
  },
  { name: 'package.json', type: 'file', path: '/package.json' },
  { name: 'vite.config.ts', type: 'file', path: '/vite.config.ts' },
  { name: 'tailwind.config.js', type: 'file', path: '/tailwind.config.js' },
];

export default function FileExplorer() {
  const [files, setFiles] = useState<FileNode[]>(mockFiles);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFile, setSelectedFile] = useState<string>('/docs/API_Contracts.md');
  // 기본 파일 선택
  useEffect(() => {
    if (!selectedFile) {
      onFileSelect('/docs/API_Contracts.md');
    }
  }, [selectedFile, onFileSelect]);


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

  const renderNode = (node: FileNode, depth = 0) => {
    const Icon = getFileIcon(node.name, node.type);
    const isSelected = selectedFile === node.path;

    return (
      <div key={node.path}>
        <motion.div
          className={`flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-gray-700/50 transition-colors ${
            isSelected ? 'bg-primary-600/20 border-r-2 border-primary-500' : ''
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
              {node.children.map(child => renderNode(child, depth + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="h-full bg-gray-800 text-white flex flex-col">
      <div className="p-3 border-b border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-200 uppercase tracking-wide">Explorer</h3>
          <div className="flex gap-1">
            <motion.button 
              className="p-1 hover:bg-gray-700 rounded"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Plus className="w-4 h-4 text-gray-400" />
            </motion.button>
            <motion.button 
              className="p-1 hover:bg-gray-700 rounded"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </motion.button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="py-2">
          {files.map(node => renderNode(node))}
        </div>
      </div>
    </div>
  );
}