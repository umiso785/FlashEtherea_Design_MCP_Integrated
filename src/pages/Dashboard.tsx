import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Square, 
  RotateCcw, 
  Settings, 
  BarChart3, 
  Code, 
  Terminal, 
  TrendingUp, 
  Shield,
  Activity,
  CheckCircle,
  AlertTriangle,
  Zap,
  Monitor,
  Database,
  Wifi,
  Target,
  Eye
} from 'lucide-react';
import CommandRibbon from '../components/CommandRibbon';
import KPIBoard from '../components/KPIBoard';
import StatusBadge from '../components/StatusBadge';
import CodeEditor from '../components/CodeEditor';
import LogsPanel from '../components/LogsPanel';

type ActiveSection = 'dashboard' | 'editor' | 'logs' | 'kpi' | 'settings';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('dashboard');
  const [code, setCode] = useState(`// FlashEtherea MCP Dashboard
// AI/SEO 자동화 전장 시스템

function flashEthereaDashboard() {
  console.log("🚀 FlashEtherea 대시보드 초기화");
  
  // Do-No-Harm / No-Falsehood 원칙 적용
  const systemStatus = {
    roi: 2.31,
    ctr: 9.2,
    detectRate: 0.08,
    uptime: 99.8
  };
  
  return systemStatus;
}

flashEthereaDashboard();`);

  // Mock KPI 데이터
  const kpiData = [
    { name: "ROI", value: "2.31x" },
    { name: "CTR", value: "9.2%" },
    { name: "탐지율", value: "0.08%" },
    { name: "생존율", value: "99.8%" },
  ];

  // 사이드바 메뉴 항목
  const sidebarItems = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard', active: true },
    { id: 'editor', icon: Code, label: 'Editor' },
    { id: 'logs', icon: Terminal, label: 'Logs' },
    { id: 'kpi', icon: TrendingUp, label: 'KPI Metrics' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  // 시스템 상태
  const systemStatus = {
    overall: 'healthy' as const,
    adapters: [
      { name: 'ollama', status: 'healthy' as const },
      { name: 'deepseek', status: 'warning' as const },
      { name: 'local_llm', status: 'error' as const },
    ]
  };

  // 커맨드 리본 핸들러
  const handleRun = () => console.log('🚀 System Run');
  const handleStop = () => console.log('🛑 System Stop');
  const handleRollback = () => console.log('↩️ Emergency Rollback');
  const handleSettings = () => setActiveSection('settings');

  // 메인 워크벤치 렌더링
  const renderMainWorkbench = () => {
    switch (activeSection) {
      case 'editor':
        return (
          <div className="h-full flex flex-col">
            <div className="flex-1">
              <CodeEditor value={code} onChange={setCode} />
            </div>
            <div className="h-48 border-t border-gray-700">
              <LogsPanel />
            </div>
          </div>
        );
      
      case 'logs':
        return (
          <div className="h-full">
            <LogsPanel />
          </div>
        );
      
      case 'kpi':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">KPI 상세 분석</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {kpiData.map((kpi, idx) => (
                <motion.div
                  key={idx}
                  className="bg-[#1a1f2e] rounded-xl p-6 border border-gray-800"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-3xl font-bold text-white mb-2">{kpi.value}</div>
                  <div className="text-gray-400">{kpi.name}</div>
                  <div className="mt-4 h-2 bg-gray-800 rounded-full">
                    <div className="h-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" style={{width: '75%'}}></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      
      case 'settings':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">시스템 설정</h2>
            <div className="space-y-4">
              <div className="bg-[#1a1f2e] rounded-xl p-4 border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-2">MCP 어댑터 설정</h3>
                <div className="space-y-2">
                  {systemStatus.adapters.map((adapter, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-gray-300">{adapter.name}</span>
                      <StatusBadge status={adapter.status} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">시스템 현황</h2>
            
            {/* 시스템 메트릭 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                className="bg-[#1a1f2e] rounded-xl p-6 border border-gray-800"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">ROI</div>
                    <div className="text-2xl font-bold text-emerald-400">2.31x</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-emerald-400">+12.5%</span>
                  <span className="text-xs text-gray-500">vs last month</span>
                </div>
              </motion.div>

              <motion.div
                className="bg-[#1a1f2e] rounded-xl p-6 border border-gray-800"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">CTR</div>
                    <div className="text-2xl font-bold text-blue-400">9.2%</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-blue-400">+3.2%</span>
                  <span className="text-xs text-gray-500">vs last week</span>
                </div>
              </motion.div>

              <motion.div
                className="bg-[#1a1f2e] rounded-xl p-6 border border-gray-800"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">탐지율</div>
                    <div className="text-2xl font-bold text-amber-400">0.08%</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-emerald-400">-0.02%</span>
                  <span className="text-xs text-gray-500">vs yesterday</span>
                </div>
              </motion.div>

              <motion.div
                className="bg-[#1a1f2e] rounded-xl p-6 border border-gray-800"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">생존율</div>
                    <div className="text-2xl font-bold text-purple-400">99.8%</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs text-emerald-400">Stable</span>
                  <span className="text-xs text-gray-500">2h 34m</span>
                </div>
              </motion.div>
            </div>

            {/* 시스템 상태 개요 */}
            <div className="bg-[#1a1f2e] rounded-xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">시스템 상태 개요</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <Monitor className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-sm text-gray-300">Frontend</div>
                    <div className="text-xs text-green-400">정상 작동</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-sm text-gray-300">MCP Server</div>
                    <div className="text-xs text-green-400">연결됨</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Wifi className="w-5 h-5 text-cyan-400" />
                  <div>
                    <div className="text-sm text-gray-300">AI Adapters</div>
                    <div className="text-xs text-yellow-400">부분 작동</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white flex flex-col">
      {/* 🔵 Top CommandRibbon (지휘 리본) */}
      <div className="border-b border-gray-800 p-4">
        <CommandRibbon 
          onStart={handleRun}
          onStop={handleStop}
          onRollback={handleRollback}
        />
      </div>

      {/* 메인 레이아웃 */}
      <div className="flex-1 flex">
        {/* ◀ Sidebar (탐색/메뉴) */}
        <div className="w-64 bg-[#0f1419] border-r border-gray-800 flex flex-col">
          {/* 로고 및 제목 */}
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-lg font-bold">FLASHETHEREA</h1>
            </div>
            <p className="text-xs text-gray-400">DASHBOARD CONTROL</p>
          </div>

          {/* 네비게이션 메뉴 */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveSection(item.id as ActiveSection)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      isActive 
                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </nav>

          {/* StatusBadge (시스템 상태) */}
          <div className="p-4 border-t border-gray-800">
            <div className="bg-[#1a1f2e] rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${
                  systemStatus.overall === 'healthy' ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'
                }`}></div>
                <span className="text-xs text-gray-400">System Status</span>
              </div>
              <div className="text-sm font-medium">
                <StatusBadge status={systemStatus.overall} />
              </div>
            </div>
          </div>
        </div>

        {/* 🖥️ Main Workbench */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-hidden">
            {renderMainWorkbench()}
          </div>
        </div>
      </div>

      {/* 🔻 KPIBoard (하단 고정) */}
      <div className="border-t border-gray-800 p-4 bg-[#0f1419]">
        <KPIBoard data={kpiData} />
      </div>
    </div>
  );
}