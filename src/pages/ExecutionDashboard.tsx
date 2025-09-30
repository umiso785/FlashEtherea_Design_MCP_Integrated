import { useEffect, useMemo, useState } from "react";
import { motion } from 'framer-motion';
import { checkHealth } from "../services/health.service";
import { 
  Activity, 
  Shield, 
  Target, 
  TrendingUp, 
  Play, 
  Square, 
  RotateCcw, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Terminal,
  Eye,
  Settings,
  BarChart3,
  PieChart,
  TrendingDown,
  Users,
  Globe,
  Database,
  Monitor,
  Layers
} from 'lucide-react';
import CommandRibbon from "../components/CommandRibbon";
import KPIBoard from "../components/KPIBoard";
import LogsPanel from "../components/LogsPanel";
import StatusBadge from "../components/StatusBadge";
import { adaptersStore } from "../store/adapters.store";
import { observer } from "mobx-react-lite";
import { ModeSwitch } from "../components/ModeSwitch";

type Health = "healthy" | "warning" | "error";

interface SystemMetric {
  name: string;
  value: string | number;
  trend: 'up' | 'down' | 'stable';
  status: 'healthy' | 'warning' | 'error';
  icon: any;
  change: string;
}

interface MCPAdapter {
  name: string;
  status: Health;
  latency: string;
  requests: number;
  errors: number;
  description: string;
}

export default observer(function ExecutionDashboard() {
  // ── 상태
  const [kpi, setKpi] = useState<{ name: string; value: string | number }[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [server, setServer] = useState<Health>("warning");
  const [version] = useState("v1.0.0");
  const [isSystemRunning, setIsSystemRunning] = useState(true);

  const [systemStats, setSystemStats] = useState({
    cpu: "23%",
    memory: "67%",
    disk: "45%",
    network: "125 MB/s",
    uptime: "2h 34m",
    processes: 42
  });

  const [adapters, setAdapters] = useState<MCPAdapter[]>([
    { 
      name: "ollama", 
      status: 'healthy', 
      latency: '45ms', 
      requests: 1247, 
      errors: 0,
      description: "Local LLM inference server"
    },
    { 
      name: "deepseek", 
      status: 'warning', 
      latency: '120ms', 
      requests: 892, 
      errors: 3,
      description: "DeepSeek API integration"
    },
    { 
      name: "local_llm", 
      status: 'error', 
      latency: 'timeout', 
      requests: 0, 
      errors: 15,
      description: "Local model processing"
    }
  ]);

  // ── KPI 모의값 (후속: useKPI 훅/실API로 교체)
  useEffect(() => {
    setKpi([
      { name: "ROI", value: "2.31" },
      { name: "CTR", value: "9.2%" },
      { name: "탐지율", value: "0.08%" },
      { name: "생존성", value: "0.998" },
      { name: "위장 점수", value: "97%" },
    ]);
  }, []);

  // ── MCP 헬스체크
  useEffect(() => {
    const poll = async () => {
      const status = await checkHealth();
      setServer(status);
    };
    poll();
    const t = setInterval(poll, 5000);
    return () => clearInterval(t);
  }, []);

  // ── WebSocket 로그 스트림
  useEffect(() => {
    // Mock Mode에서는 WebSocket 연결 완전 차단
    if (adaptersStore.mode === "mock") {
      console.log("🔄 Mock Mode → WebSocket 연결 차단");
      setLogs([
        "🔄 Mock Mode 활성화",
        "🚀 FlashEtherea 시스템 초기화 완료",
        "📡 MCP 서버 연결 확인 중...",
        "⚡ AI 어댑터 상태 확인 중...",
        "📊 KPI 모니터링 시작",
        "🛡️ Do-No-Harm 정책 활성화"
      ]);
      
      // Mock 로그 주기적 추가
      const mockInterval = setInterval(() => {
        const mockMessages = [
          "📊 KPI 메트릭 업데이트 완료",
          "⚡ AI 어댑터 상태 정상",
          "🛡️ 보안 정책 검증 완료",
          "🔧 시스템 리소스 모니터링 중",
          "📈 성능 지표 수집 중"
        ];
        const randomMessage = mockMessages[Math.floor(Math.random() * mockMessages.length)];
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [...prev, `[${timestamp}] ${randomMessage}`]);
      }, 5000);
      
      return () => clearInterval(mockInterval);
    }
    
    // Bolt.new WebContainer 환경 감지
    const isBoltContainer = window.location.hostname === 'localhost' || 
                           window.location.hostname.includes('bolt.new') ||
                           import.meta.env.DEV;
    
    if (isBoltContainer) {
      console.log("🔧 Bolt.new 환경 감지 → WebSocket 연결 건너뛰기");
      adaptersStore.setConnectionStatus("disconnected");
      setLogs((prev) => [
        ...prev,
        "🔧 Bolt.new 개발 환경 감지",
        "⚠️ WebSocket 연결 건너뛰기 → Mock 로그 사용",
        "🚀 FlashEtherea 시스템 초기화 완료",
        "📡 MCP 서버 연결 확인 중...",
        "⚡ AI 어댑터 상태 확인 중...",
        "📊 KPI 모니터링 시작",
        "🛡️ Do-No-Harm 정책 활성화"
      ]);
      
      // Mock 로그 시뮬레이션
      const mockInterval = setInterval(() => {
        const mockMessages = [
          "📊 KPI 메트릭 업데이트 완료",
          "⚡ AI 어댑터 상태 정상",
          "🛡️ 보안 정책 검증 완료",
          "🔧 시스템 리소스 모니터링 중",
          "📈 성능 지표 수집 중"
        ];
        const randomMessage = mockMessages[Math.floor(Math.random() * mockMessages.length)];
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [...prev, `[${timestamp}] ${randomMessage}`]);
      }, 5000);
      
      return () => clearInterval(mockInterval);
    }
    
    // Live Mode에서만 실제 WebSocket 연결 시도
    console.log("⚡ Live Mode → WebSocket 연결 시도");
    const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";
    const WS_URL = API_BASE.replace(/^http/, "ws") + "/ws/logs";
    
    // WebSocket 연결 상태 초기화
    adaptersStore.setConnectionStatus("connecting");
    let ws: WebSocket | null = null;
    let connectionTimeout: NodeJS.Timeout;
    
    try {
      // 연결 타임아웃 설정 (5초)
      connectionTimeout = setTimeout(() => {
        if (ws && ws.readyState === WebSocket.CONNECTING) {
          console.warn("⏰ WebSocket 연결 타임아웃");
          ws.close();
          adaptersStore.setConnectionStatus("error");
          setLogs((prev) => [
            ...prev,
            "⏰ WebSocket 연결 타임아웃 → Mock 로그 사용",
            "🚀 FlashEtherea 시스템 초기화 완료",
            "📡 MCP 서버 연결 확인 중...",
            "⚡ AI 어댑터 상태 확인 중...",
            "📊 KPI 모니터링 시작",
            "🛡️ Do-No-Harm 정책 활성화"
          ]);
        }
      }, 5000);
      
      ws = new WebSocket(WS_URL);
      
      // 연결 성공 핸들러
      ws.onopen = () => {
        clearTimeout(connectionTimeout);
        console.log("✅ WebSocket 연결 성공:", WS_URL);
        adaptersStore.setConnectionStatus("connected");
        setLogs((prev) => [...prev, "🔗 WebSocket 로그 연결됨"]);
      };
      
      // 메시지 수신 핸들러 (스트림 검증 추가)
      ws.onmessage = (event) => {
        try {
          // 스트림 데이터 검증
          if (!event.data || event.data === undefined || event.data === null) {
            console.warn("⚠️ Empty WebSocket chunk dropped");
            return;
          }
          
          const message = String(event.data);
          if (message.trim()) {
            setLogs((prev) => [...prev, message]);
          }
        } catch (streamError) {
          console.error("❌ WebSocket 메시지 처리 오류:", streamError);
          setLogs((prev) => [...prev, `❌ 메시지 처리 오류: ${streamError.message}`]);
        }
      };
      
      // 연결 오류 핸들러
      ws.onerror = (error) => {
        clearTimeout(connectionTimeout);
        console.warn("⚠️ WebSocket 연결 실패:", error);
        console.warn("시도한 URL:", WS_URL);
        adaptersStore.setConnectionStatus("error");
        
        // 오류 시 Mock 로그로 대체
        setLogs((prev) => [
          ...prev,
          "⚠️ WebSocket 연결 실패 → Mock 로그 사용",
          "🔧 Bolt.new 환경에서는 WebSocket이 제한될 수 있습니다",
          "🚀 FlashEtherea 시스템 초기화 완료",
          "📡 MCP 서버 연결 확인 중...",
          "⚡ AI 어댑터 상태 확인 중...",
          "📊 KPI 모니터링 시작",
          "🛡️ Do-No-Harm 정책 활성화"
        ]);
        
        // Mock 로그 시뮬레이션 시작
        const mockInterval = setInterval(() => {
          const mockMessages = [
            "📊 KPI 메트릭 업데이트 완료",
            "⚡ AI 어댑터 상태 정상",
            "🛡️ 보안 정책 검증 완료",
            "🔧 시스템 리소스 모니터링 중",
            "📈 성능 지표 수집 중"
          ];
          const randomMessage = mockMessages[Math.floor(Math.random() * mockMessages.length)];
          const timestamp = new Date().toLocaleTimeString();
          setLogs(prev => [...prev, `[${timestamp}] ${randomMessage}`]);
        }, 5000);
        
        // 정리 함수에 추가
        setTimeout(() => clearInterval(mockInterval), 30000); // 30초 후 정리
      };
      
      // 연결 종료 핸들러
      ws.onclose = () => {
        clearTimeout(connectionTimeout);
        console.log("🔌 WebSocket 연결 종료");
        adaptersStore.setConnectionStatus("disconnected");
        setLogs((prev) => [...prev, "❌ WebSocket 연결 종료"]);
      };
      
    } catch (error) {
      clearTimeout(connectionTimeout);
      console.warn("⚠️ WebSocket 초기화 실패:", error);
      adaptersStore.setConnectionStatus("error");
      
      setLogs((prev) => [
        ...prev,
        "⚠️ WebSocket 초기화 실패 → Mock 로그 사용",
        "🔧 Bolt.new 환경에서는 WebSocket이 제한될 수 있습니다",
        "🚀 FlashEtherea 시스템 초기화 완료",
        "📡 MCP 서버 연결 확인 중...",
        "⚡ AI 어댑터 상태 확인 중...",
        "📊 KPI 모니터링 시작",
        "🛡️ Do-No-Harm 정책 활성화"
      ]);
    }
    
    return () => {
      if (connectionTimeout) {
        clearTimeout(connectionTimeout);
      }
      if (ws) {
        console.log("🧹 WebSocket 정리 중...");
        ws.onmessage = null; // 핸들러 정리
        ws.onerror = null;
        ws.onclose = null;
        ws.close();
      }
    };
  }, [adaptersStore.mode]); // 모드 변경 시 재연결

  // ── 핸들러
  const onStart = () => {
    setLogs((p) => [...p, "✅ Start issued"]);
    setIsSystemRunning(true);
  };
  const onStop = () => {
    setLogs((p) => [...p, "🛑 Stop issued"]);
    setIsSystemRunning(false);
  };
  const onRollback = () => setLogs((p) => [...p, "↩️ Rollback issued"]);

  const adapterBadges = useMemo(
    () => [
      { name: "ollama", status: server },
      { name: "deepseek", status: "warning" as Health },
      { name: "local_llm", status: "error" as Health },
    ],
    [server]
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-emerald-400';
      case 'warning':
        return 'text-amber-400';
      case 'error':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      {/* 사이드바 */}
      <div className="fixed left-0 top-0 h-full w-64 bg-[#0f1419] border-r border-gray-800 p-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold">FLASHETHEREA</h1>
          </div>
          <p className="text-xs text-gray-400">EXECUTION DASHBOARD</p>
        </div>

        <nav className="space-y-2">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">MAIN</div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm">Execution</span>
          </div>
          <a href="/design" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            <Layers className="w-4 h-4" />
            <span className="text-sm">Design</span>
          </a>
          <a href="/main" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            <PieChart className="w-4 h-4" />
            <span className="text-sm">Main</span>
          </a>
          <a href="/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings</span>
          </a>
          <a href="/ide" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            <Terminal className="w-4 h-4" />
            <span className="text-sm">IDE</span>
          </a>
          
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-3 mt-6">MANAGEMENT</div>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            <Users className="w-4 h-4" />
            <span className="text-sm">Users</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            <Database className="w-4 h-4" />
            <span className="text-sm">Database</span>
          </a>
          
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-3 mt-6">SYSTEM</div>
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            <Server className="w-4 h-4" />
            <span className="text-sm">Servers</span>
          </a>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-[#1a1f2e] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${
                isSystemRunning ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'
              }`}></div>
              <span className="text-xs text-gray-400">System Status</span>
            </div>
            <div className="text-sm font-medium">
              {isSystemRunning ? 'Active' : 'Stopped'}
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="ml-64 p-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Execution Dashboard</h2>
            <p className="text-gray-400">FlashEtherea 실시간 실행 모니터링 시스템</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Last updated: 2 min ago</span>
            </div>
            
            {/* 모드 스위치 */}
            <ModeSwitch />
            
            <button className="p-2 bg-[#1a1f2e] rounded-lg border border-gray-700 hover:bg-gray-800">
              <Settings className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* 메트릭 카드 */}
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
                <div className="text-xs text-gray-400">Detection Rate</div>
                <div className="text-2xl font-bold text-amber-400">0.08%</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-emerald-400" />
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
                <div className="text-xs text-gray-400">Uptime</div>
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

        {/* 차트 및 시스템 상태 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* 시스템 리소스 */}
          <div className="lg:col-span-2 bg-[#1a1f2e] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">System Resources</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg">1H</button>
                <button className="px-3 py-1 text-xs text-gray-400 hover:bg-gray-800 rounded-lg">6H</button>
                <button className="px-3 py-1 text-xs text-gray-400 hover:bg-gray-800 rounded-lg">1D</button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">CPU Usage</span>
                  <span className="text-sm font-medium text-white">{systemStats.cpu}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-400 to-cyan-400 h-2 rounded-full" style={{width: '23%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Memory</span>
                  <span className="text-sm font-medium text-white">{systemStats.memory}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-gradient-to-r from-emerald-400 to-green-400 h-2 rounded-full" style={{width: '67%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Disk Usage</span>
                  <span className="text-sm font-medium text-white">{systemStats.disk}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-gradient-to-r from-amber-400 to-orange-400 h-2 rounded-full" style={{width: '45%'}}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Network</span>
                  <span className="text-sm font-medium text-white">{systemStats.network}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full" style={{width: '80%'}}></div>
                </div>
              </div>
            </div>
          </div>

          {/* MCP 어댑터 상태 */}
          <div className="bg-[#1a1f2e] rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-6">MCP Adapters</h3>
            <div className="space-y-4">
              {adapters.map((adapter, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-[#0f1419] rounded-lg border border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      adapter.status === 'healthy' ? 'bg-emerald-400' :
                      adapter.status === 'warning' ? 'bg-amber-400' : 'bg-red-400'
                    }`}></div>
                    <div>
                      <div className="text-sm font-medium text-white">{adapter.name}</div>
                      <div className="text-xs text-gray-400">{adapter.latency}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Requests</div>
                    <div className="text-sm font-medium text-white">{adapter.requests}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 컨트롤 리본 */}
        <div className="mb-8">
          <CommandRibbon onStart={onStart} onStop={onStop} onRollback={onRollback} />
        </div>

        {/* 로그 패널 */}
        <div className="bg-[#1a1f2e] rounded-xl border border-gray-800">
          <div className="p-4">
            <div className="h-64 overflow-y-auto">
              <LogsPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});