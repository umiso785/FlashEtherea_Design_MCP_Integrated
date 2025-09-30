import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  GitBranch, 
  Package, 
  Settings, 
  BarChart3,
  Zap,
  Code,
  FileText,
  Search,
  Filter,
  RefreshCw,
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import ComponentCard from './components/ComponentCard';
import ArchitectureView from './components/ArchitectureView';
import DependencyGraph from './components/DependencyGraph';
import { useDesignComponents } from './hooks/useDesignComponents';

export default function DesignDashboard() {
  const { components, architectureLayers, dependencyGraph, metrics, loading } = useDesignComponents();
  const [activeView, setActiveView] = useState<'components' | 'architecture' | 'dependencies'>('components');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'component' | 'hook' | 'service' | 'store'>('all');

  const filteredComponents = components.filter(comp => {
    const matchesSearch = comp.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || comp.type === filterType;
    return matchesSearch && matchesFilter;
  });

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

        {/* 메트릭 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              className="bg-[#1a1f2e] rounded-xl p-6 border border-gray-800"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">{metric.name}</div>
                  <div className="text-2xl font-bold text-purple-400">{metric.value}</div>
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

        {/* 메인 뷰 */}
        <div className="bg-[#1a1f2e] rounded-xl border border-gray-800 min-h-[600px]">
          {activeView === 'components' && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Components ({filteredComponents.length})</h3>
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Plus className="w-4 h-4" />
                  New Component
                </motion.button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredComponents.map((component) => (
                  <ComponentCard key={component.id} component={component} />
                ))}
              </div>
            </div>
          )}

          {activeView === 'architecture' && (
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Architecture Layers</h3>
              <ArchitectureView layers={architectureLayers} />
            </div>
          )}

          {activeView === 'dependencies' && (
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Dependency Graph</h3>
              <DependencyGraph graph={dependencyGraph} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}