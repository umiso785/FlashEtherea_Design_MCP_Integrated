// Features - File Explorer Hooks
import { useState } from 'react';
import { FileNode } from '../../../core/types';

const mockFiles: FileNode[] = [
  {
    name: 'src',
    type: 'folder',
    path: '/src',
    isOpen: true,
    children: [
      {
        name: 'core',
        type: 'folder',
        path: '/src/core',
        children: [
          { name: 'types', type: 'folder', path: '/src/core/types', children: [
            { name: 'index.ts', type: 'file', path: '/src/core/types/index.ts', language: 'typescript' }
          ]},
          { name: 'constants', type: 'folder', path: '/src/core/constants', children: [
            { name: 'index.ts', type: 'file', path: '/src/core/constants/index.ts', language: 'typescript' }
          ]},
        ]
      },
      {
        name: 'ui',
        type: 'folder',
        path: '/src/ui',
        children: [
          { name: 'layouts', type: 'folder', path: '/src/ui/layouts', children: [
            { name: 'IDELayout.tsx', type: 'file', path: '/src/ui/layouts/IDELayout.tsx', language: 'typescript' }
          ]},
          { name: 'components', type: 'folder', path: '/src/ui/components', children: [
            { name: 'ActivityBar.tsx', type: 'file', path: '/src/ui/components/ActivityBar.tsx', language: 'typescript' }
          ]},
        ]
      },
      {
        name: 'features',
        type: 'folder',
        path: '/src/features',
        children: [
          { name: 'file-explorer', type: 'folder', path: '/src/features/file-explorer', children: [
            { name: 'FileExplorerPanel.tsx', type: 'file', path: '/src/features/file-explorer/FileExplorerPanel.tsx', language: 'typescript' }
          ]},
          { name: 'code-editor', type: 'folder', path: '/src/features/code-editor', children: [
            { name: 'CodeEditorPanel.tsx', type: 'file', path: '/src/features/code-editor/CodeEditorPanel.tsx', language: 'typescript' }
          ]},
        ]
      },
      {
        name: 'shared',
        type: 'folder',
        path: '/src/shared',
        children: [
          { name: 'services', type: 'folder', path: '/src/shared/services', children: [
            { name: 'mcp.service.ts', type: 'file', path: '/src/shared/services/mcp.service.ts', language: 'typescript' }
          ]},
          { name: 'hooks', type: 'folder', path: '/src/shared/hooks', children: [
            { name: 'useMCP.ts', type: 'file', path: '/src/shared/hooks/useMCP.ts', language: 'typescript' }
          ]},
        ]
      },
    ]
  },
  {
    name: 'docs',
    type: 'folder',
    path: '/docs',
    children: [
      { name: 'API_Contracts.md', type: 'file', path: '/docs/API_Contracts.md', language: 'markdown' },
      { name: 'UI_Playbook.md', type: 'file', path: '/docs/UI_Playbook.md', language: 'markdown' },
    ]
  },
  { name: 'package.json', type: 'file', path: '/package.json', language: 'json' },
  { name: 'vite.config.ts', type: 'file', path: '/vite.config.ts', language: 'typescript' },
  { name: 'tailwind.config.js', type: 'file', path: '/tailwind.config.js', language: 'javascript' },
];

export function useFileExplorer() {
  const [files, setFiles] = useState<FileNode[]>(mockFiles);
  const [searchTerm, setSearchTerm] = useState('');

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

  return {
    files,
    searchTerm,
    setSearchTerm,
    toggleFolder,
  };
}