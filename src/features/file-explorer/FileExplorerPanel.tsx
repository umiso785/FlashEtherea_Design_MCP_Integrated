// Features - File Explorer (완전 분리)
import { ChevronRight, File, Folder, Plus, Search, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileNode } from '../../core/types';
import { useFileExplorer } from './hooks/useFileExplorer';

interface Props {
  onFileSelect: (path: string) => void;
  selectedFile?: string;
}

export default function FileExplorerPanel({ onFileSelect, selectedFile }: Props) {
  const { files, searchTerm, setSearchTerm, toggleFolder } = useFileExplorer();

  const getFileIcon = (name: string, type: string) => {
    if (type === 'folder') return Folder;
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
              onFileSelect(node.path);
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
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-200 uppercase tracking-wide">Explorer</h3>
          <div className="flex gap-1">
            <button className="p-1 hover:bg-gray-700 rounded">
              <Plus className="w-4 h-4 text-gray-400" />
            </button>
            <button className="p-1 hover:bg-gray-700 rounded">
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-2">
        {files.map(node => renderNode(node))}
      </div>
    </div>
  );
}