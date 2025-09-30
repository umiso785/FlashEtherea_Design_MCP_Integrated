import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layers, GitBranch, Package, Settings, BarChart3, Zap, Code, Search, RefreshCw, Plus, CheckCircle, AlertTriangle, Clock, Eye, FileEdit as Edit, Trash2 } from 'lucide-react';

interface ComponentNode {
  id: string;
  name: string;
  type: 'component' | 'hook' | 'service' | 'store';
  path: string;
  dependencies: string[];
  exports: string[];
  status: 'healthy' | 'warning' | 'error';
  lastModified: Date;
}

interface DesignMetric {
  name: string;
  value: number;
  target: number;
  status: 'healthy' | 'warning' | 'error';
  trend: 'up' | 'down' | 'stable';
}

export default function DesignDashboard() {
  const [activeView, setActiveView] = useState<'components' | 'architecture' | 'dependencies'>('components');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'component' | 'hook' | 'service' | 'store'>('all');

  // Mock 메트릭 데이터 (이미지와 정확히 일치)
  const metrics: DesignMetric[] = [
    { name: 'Components', value: 24, target: 30, status: 'healthy', trend: 'up' },
    { name: 'Test Coverage', value: 87, target: 90, status: 'warning', trend: 'up' },
    { name: 'Dependencies', value: 12, target: 15, status: 'healthy', trend: 'stable' },
    { name: 'Tech Debt', value: 3, target: 5, status: 'healthy', trend: 'down' }
  ];

  // Mock 컴포넌트 데이터 (이미지와 정확히 일치)
  const components: ComponentNode[] = [
    {
      id: '1',
      name: 'ActivityBar',
      type: 'component',
      path: '/src/ui/components/ActivityBar.tsx',
      dependencies: ['lucide-react', 'framer-motion'],
      exports: ['ActivityBar'],
      status: 'healthy',
      lastModified: new Date('2025-01-27')
    },
    {
      id: '2',
      name: 'useEditor',
      type: 'hook',
      path: '/src/shared/hooks/useMCP.ts',
      dependencies: ['react', 'mcp.service'],
      exports: ['useEditor'],
      status: 'warning',
      lastModified: new Date('2025-01-26')
    },
    {
      id: '3',
      name: 'MCPService',
      type: 'service',
      path: '/src/shared/services/mcp.service.ts',
      dependencies: ['constants'],
      exports: ['mcpService'],
      status: 'healthy',
      lastModified: new Date('2025-01-27')
    },
    {
      id: '4',
      name: 'EditorStore',
      type: 'store',
      path: '/src/store/editor.store.ts',
      dependencies: ['mobx'],
      exports: ['editorStore'],
      status: 'error',
      lastModified: new Date('2025-01-25')
    },
    {
      id: '5',
      name: 'LogsPanel',
      type: 'component',
      path: '/src/components/LogsPanel.tsx',
      dependencies: ['mobx-react-lite', 'framer-motion'],
      exports: ['LogsPanel'],
      status: 'healthy',
      lastModified: new Date('2025-01-27')
    },
    {
      id: '6',
      name: 'CommandRibbon',
      type: 'component',
      path: '/src/components/CommandRibbon.tsx',
      dependencies: ['lucide-react'],
      exports: ['CommandRibbon'],
      status: 'healthy',
      lastModified: new Date('2025-01-27')
    }
  ];

  const filteredComponents = components.filter(comp => {
    const matchesSearch = comp.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || comp.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default:
        return <Code className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'border-emerald-500/30 bg-emerald-900/10';
      case 'warning':
        return 'border-amber-500/30 bg-amber-900/10';
      case 'error':
        return 'border-red-500/30 bg-red-900/10';
      default:
        return 'border-gray-500/30 bg-gray-900/10';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'component':
        return 'bg-blue-500';
      case 'hook':
        return 'bg-green-500';
      case 'service':
        return 'bg-purple-500';
      case 'store':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getMetricIcon = (name: string) => {
    switch (name) {
      case 'Components':
        return <BarChart3 className="w-6 h-6 text-white" />;
      case 'Test Coverage':
        return <CheckCircle className="w-6 h-6 text-white" />;
      case 'Dependencies':
        return <GitBranch className="w-6 h-6 text-white" />;
      case 'Tech Debt':
        return <AlertTriangle className="w-6 h-6 text-white" />;
      default:
        return <BarChart3 className="w-6 h-6 text-white" />;
    }
  };

  const getMetricColor = (name: string) => {
    switch (name) {
      case 'Components':
        return 'from-purple-400 to-purple-600';
      case 'Test Coverage':
        return 'from-pink-400 to-pink-600';
      case 'Dependencies':
        return 'from-blue-400 to-blue-600';
      case 'Tech Debt':
        return 'from-green-400 to-green-600';
      default:
        return 'from-purple-400 to-purple-600';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      {/* 사이드바 */}
      <div className="fixed left-0 top-0 h-full w-64 bg-[#0f1419] border-r border-gray-800 p-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold">FLASHETHEREA</h1>
          </div>
          <p className="text-xs text-gray-400">DESIGN DASHBOARD</p>
        </div>

        <nav className="space-y-2">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">MAIN</div>
          <a href="/execution" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm">Execution</span>
          </a>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/30">
            <Layers className="w-4 h-4" />
            <span className="text-sm">Design</span>
          </div>
          <a href="/main" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            <Package className="w-4 h-4" />
            <span className="text-sm">Main</span>
          </a>
          <a href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings</span>
          </a>
          
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-3 mt-6">DESIGN TOOLS</div>
          <button 
            onClick={() => setActiveView('components')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              activeView === 'components' ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <Code className="w-4 h-4" />
            <span className="text-sm">Components</span>
          </button>
          <button 
            onClick={() => setActiveView('architecture')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              activeView === 'architecture' ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span className="text-sm">Architecture</span>
          </button>
          <button 
            onClick={() => setActiveView('dependencies')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              activeView === 'dependencies' ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span className="text-sm">Dependencies</span>
          </button>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-[#1a1f2e] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
              <span className="text-xs text-gray-400">Design System</span>
            </div>
            <div className="text-sm font-medium text-purple-400">Active</div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="ml-64 p-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Design Dashboard</h2>
            <p className="text-gray-400">FlashEtherea 컴포넌트 설계 및 아키텍처 관리</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search components..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 bg-[#1a1f2e] border border-gray-700 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-2 bg-[#1a1f2e] border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500"
            >
              <option value="all">All Types</option>
              <option value="component">Components</option>
              <option value="hook">Hooks</option>
              <option value="service">Services</option>
              <option value="store">Stores</option>
            </select>
            
            <button className="p-2 bg-[#1a1f2e] rounded-lg border border-gray-700 hover:bg-gray-800">
              <RefreshCw className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* 메트릭 카드 - 이미지와 정확히 일치 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              className="bg-[#1a1f2e] rounded-xl p-6 border border-gray-800"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${getMetricColor(metric.name)} rounded-lg flex items-center justify-center`}>
                  {getMetricIcon(metric.name)}
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">{metric.name}</div>
                  <div className="text-2xl font-bold text-white">{metric.value}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  metric.status === 'healthy' ? 'bg-emerald-400' :
                  metric.status === 'warning' ? 'bg-amber-400' : 'bg-red-400'
                }`}></div>
                <span className="text-xs text-gray-400">Target: {metric.target}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 컴포넌트 섹션 - 이미지와 정확히 일치 */}
        <div className="bg-[#1a1f2e] rounded-xl border border-gray-800 min-h-[600px]">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Components (6)</h3>
              <motion.button
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus className="w-4 h-4" />
                New Component
              </motion.button>
            </div>
            
            {/* 컴포넌트 카드 그리드 - 이미지와 정확히 일치 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredComponents.map((component) => (
                <motion.div
                  key={component.id}
                  className={`bg-[#0f1419] rounded-lg p-4 border ${getStatusColor(component.status)} hover:bg-gray-800/50 transition-colors`}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getTypeColor(component.type)}`}></div>
                      <h4 className="text-sm font-medium text-white">{component.name}</h4>
                    </div>
                    {getStatusIcon(component.status)}
                  </div>
                  
                  <div className="text-xs text-gray-400 mb-3">
                    <div className="flex items-center gap-1 mb-1">
                      <Code className="w-3 h-3" />
                      <span>{component.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{component.lastModified.toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 mb-3">
                    <div>Dependencies: {component.dependencies.length}</div>
                    <div>Exports: {component.exports.length}</div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <motion.button
                      className="flex items-center gap-1 px-2 py-1 bg-blue-600/20 hover:bg-blue-600/40 rounded text-xs text-blue-300 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Eye className="w-3 h-3" />
                      View
                    </motion.button>
                    
                    <motion.button
                      className="flex items-center gap-1 px-2 py-1 bg-green-600/20 hover:bg-green-600/40 rounded text-xs text-green-300 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Edit className="w-3 h-3" />
                      Edit
                    </motion.button>
                    
                    <motion.button
                      className="flex items-center gap-1 px-2 py-1 bg-red-600/20 hover:bg-red-600/40 rounded text-xs text-red-300 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}