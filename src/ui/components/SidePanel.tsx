import { useState } from 'react';
import { motion } from 'framer-motion';
import { PanelType } from '../../core/types';
import FileExplorerPanel from '../../features/file-explorer/FileExplorerPanel';
import SearchPanel from './SearchPanel';
import GitPanel from './GitPanel';
import DebugPanel from './DebugPanel';
import ExtensionsPanel from './ExtensionsPanel';
import MCPServerPanel from '../../features/mcp-server/MCPServerPanel';

interface Props {
  activePanel: PanelType;
  width: number;
  onResize: (width: number) => void;
  onClose: () => void;
}

export default function SidePanel({ activePanel, width, onResize, onClose }: Props) {
  const [isResizing, setIsResizing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>('/docs/API_Contracts.md');

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true);
    const startX = e.clientX;
    const startWidth = width;

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = Math.max(200, Math.min(600, startWidth + (e.clientX - startX)));
      onResize(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const renderPanel = () => {
    switch (activePanel) {
      case 'explorer':
        return <FileExplorerPanel onFileSelect={setSelectedFile} selectedFile={selectedFile} />;
      case 'search':
        return <SearchPanel />;
      case 'git':
        return <GitPanel />;
      case 'debug':
        return <DebugPanel />;
      case 'extensions':
        return <ExtensionsPanel />;
      case 'mcp':
        return <MCPServerPanel />;
      default:
        return <FileExplorerPanel onFileSelect={setSelectedFile} selectedFile={selectedFile} />;
    }
  };

  return (
    <div className="h-full flex">
      <div className="flex-1 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          {renderPanel()}
        </motion.div>
      </div>
      
      {/* Resize Handle */}
      <div
        className={`w-1 bg-gray-700 hover:bg-primary-500 cursor-col-resize transition-colors ${
          isResizing ? 'bg-primary-500' : ''
        }`}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}