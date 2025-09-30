import { Package, Download, Star, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const extensions = [
  {
    name: 'FlashEtherea MCP',
    description: 'AI/SEO automation battle system integration',
    version: '1.0.0',
    installed: true,
    rating: 4.8
  },
  {
    name: 'TypeScript Hero',
    description: 'Additional TypeScript tooling for VS Code',
    version: '3.0.1',
    installed: true,
    rating: 4.5
  },
  {
    name: 'Prettier',
    description: 'Code formatter using prettier',
    version: '9.10.4',
    installed: true,
    rating: 4.9
  },
  {
    name: 'GitLens',
    description: 'Supercharge Git within VS Code',
    version: '13.6.0',
    installed: false,
    rating: 4.7
  }
];

export default function ExtensionsPanel() {
  return (
    <div className="h-full bg-gray-800 text-white flex flex-col">
      <div className="p-3 border-b border-gray-700">
        <div className="flex items-center gap-2 mb-3">
          <Package className="w-5 h-5 text-primary-500" />
          <h3 className="text-sm font-medium text-gray-200 uppercase tracking-wide">Extensions</h3>
        </div>
        
        <input
          type="text"
          placeholder="Search extensions..."
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-sm text-white placeholder-gray-400 focus:outline-none focus:border-primary-500"
        />
      </div>
      
      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-3">
          {extensions.map((ext, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 rounded-lg p-3 hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-white">{ext.name}</h4>
                  <p className="text-xs text-gray-400 mt-1">{ext.description}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs text-gray-400">{ext.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">v{ext.version}</span>
                <div className="flex gap-2">
                  {ext.installed ? (
                    <>
                      <motion.button
                        className="p-1 hover:bg-gray-600 rounded"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Settings className="w-4 h-4 text-gray-400" />
                      </motion.button>
                      <span className="text-xs text-green-400 px-2 py-1 bg-green-900/20 rounded">
                        Installed
                      </span>
                    </>
                  ) : (
                    <motion.button
                      className="flex items-center gap-1 px-2 py-1 bg-primary-600 hover:bg-primary-700 rounded text-xs transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Download className="w-3 h-3" />
                      Install
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}