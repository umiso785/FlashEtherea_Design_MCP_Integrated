import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Activity, 
  Shield, 
  Target, 
  TrendingUp, 
  Clock,
  Zap,
  Server,
  Users,
  Globe,
  Database,
  Monitor,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Play,
  Pause,
  Square
} from 'lucide-react';

interface DashboardMetric {
  id: string;
  name: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'stable';
  status: 'healthy' | 'warning' | 'error';
  icon: any;
}

interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: string;
  resolved: boolean;
}

export default function MainDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetric[]>([
    {
      id: '1',
      name: 'Total Revenue',
      value: '$124,592',
      change: '+12.5%',
      trend: 'up',
      status: 'healthy',
      icon: TrendingUp
    },
    {
      id: '2', 
      name: 'Active Users',
      value: '8,429',
      change: '+3.2%',
      trend: 'up',
      status: 'healthy',
      icon: Users
    },
    {
      id: '3',
      name: 'System Load',
      value: '67%',
      change: '+5.1%',
      trend: 'up',
      status: 'warning',
      icon: Activity
    },
    {
      id: '4',
      name: 'Response Time',
      value: '245ms',
      change: '-8.3%',
      trend: 'down',
      status: 'healthy',
      icon: Clock
    }
  ]);

  const [alerts, setAlerts] = useState<SystemAlert[]>([
    {
      id: '1',
      type: 'warning',
      title: 'High CPU Usage',
      message: 'Server CPU usage has exceeded 80% for the last 10 minutes',
      timestamp: '2 minutes ago',
      resolved: false
    },
    {
      id: '2',
      type: 'success',
      title: 'Backup Completed',
      message: 'Daily backup process completed successfully',
      timestamp: '1 hour ago',
      resolved: true
    },
    {
      id: '3',
      type: 'error',
      title: 'Database Connection',
      message: 'Failed to connect to secondary database',
      timestamp: '3 hours ago',
      resolved: false
    }
  ]);

  const [isSystemRunning, setIsSystemRunning] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // 실시간 업데이트 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      
      // 메트릭 값 랜덤 업데이트
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.id === '3' ? `${Math.floor(Math.random() * 40 + 50)}%` :
               metric.id === '4' ? `${Math.floor(Math.random() * 100 + 200)}ms` :
               metric.value
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-emerald-900/20 border-emerald-500/30';
      case 'warning':
        return 'bg-amber-900/20 border-amber-500/30';
      case 'error':
        return 'bg-red-900/20 border-red-500/30';
      default:
        return 'bg-gray-900/20 border-gray-500/30';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Bell className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      {/* 헤더 */}
      <div className="border-b border-gray-800 bg-[#0f1419]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Main Dashboard</h1>
                <p className="text-gray-400 text-sm">FlashEtherea 통합 모니터링 시스템</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  isSystemRunning ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'
                }`}></div>
                <span className="text-sm text-gray-400">
                  {isSystemRunning ? 'System Active' : 'System Stopped'}
                </span>
              </div>
              
              <div className="flex gap-2">
                <motion.button
                  className="p-2 bg-[#1a1f2e] rounded-lg border border-gray-700 hover:bg-gray-800"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RefreshCw className="w-4 h-4 text-gray-400" />
                </motion.button>
                
                <motion.button
                  className="p-2 bg-[#1a1f2e] rounded-lg border border-gray-700 hover:bg-gray-800"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Settings className="w-4 h-4 text-gray-400" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* 메트릭 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.id}
                className={`p-6 rounded-xl border ${getStatusBg(metric.status)}`}
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">{metric.name}</div>
                    <div className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                      {metric.value}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className={`w-4 h-4 ${
                    metric.trend === 'up' ? 'text-emerald-400' : 
                    metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                  }`} />
                  <span className={`text-xs ${
                    metric.trend === 'up' ? 'text-emerald-400' : 
                    metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                  }`}>
                    {metric.change}
                  </span>
                  <span className="text-xs text-gray-500">vs last period</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* 시스템 상태 */}
          <div className="lg:col-span-2 bg-[#1a1f2e] rounded-xl p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">System Status</h3>
              <div className="flex gap-2">
                <motion.button
                  onClick={() => setIsSystemRunning(!isSystemRunning)}
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm transition-colors ${
                    isSystemRunning 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSystemRunning ? (
                    <>
                      <Pause className="w-4 h-4" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Start
                    </>
                  )}
                </motion.button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Server className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm text-gray-400">Servers</div>
                <div className="text-lg font-bold text-emerald-400">3/3</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Database className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm text-gray-400">Databases</div>
                <div className="text-lg font-bold text-blue-400">2/2</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm text-gray-400">Services</div>
                <div className="text-lg font-bold text-purple-400">8/8</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Monitor className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm text-gray-400">Monitors</div>
                <div className="text-lg font-bold text-amber-400">12/12</div>
              </div>
            </div>
          </div>

          {/* 빠른 액션 */}
          <div className="bg-[#1a1f2e] rounded-xl p-6 border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <motion.button
                className="w-full flex items-center gap-3 p-3 bg-[#0f1419] hover:bg-gray-800 rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Eye className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-gray-300">View Logs</span>
              </motion.button>
              
              <motion.button
                className="w-full flex items-center gap-3 p-3 bg-[#0f1419] hover:bg-gray-800 rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-5 h-5 text-emerald-400" />
                <span className="text-sm text-gray-300">Export Data</span>
              </motion.button>
              
              <motion.button
                className="w-full flex items-center gap-3 p-3 bg-[#0f1419] hover:bg-gray-800 rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Settings className="w-5 h-5 text-gray-400" />
                <span className="text-sm text-gray-300">System Settings</span>
              </motion.button>
              
              <motion.button
                className="w-full flex items-center gap-3 p-3 bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <AlertTriangle className="w-5 h-5 text-white" />
                <span className="text-sm text-white">Emergency Stop</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* 알림 및 이벤트 */}
        <div className="bg-[#1a1f2e] rounded-xl p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Recent Alerts</h3>
            <div className="flex gap-2">
              <motion.button
                className="flex items-center gap-2 px-3 py-1 bg-[#0f1419] hover:bg-gray-800 rounded-lg text-sm transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Filter className="w-4 h-4 text-gray-400" />
                Filter
              </motion.button>
              
              <motion.button
                className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Bell className="w-4 h-4 text-white" />
                Mark All Read
              </motion.button>
            </div>
          </div>
          
          <div className="space-y-3">
            {alerts.map((alert) => (
              <motion.div
                key={alert.id}
                className={`p-4 rounded-lg border transition-colors ${
                  alert.resolved 
                    ? 'bg-gray-900/50 border-gray-700 opacity-60' 
                    : 'bg-[#0f1419] border-gray-700 hover:bg-gray-800'
                }`}
                whileHover={{ scale: alert.resolved ? 1 : 1.01 }}
              >
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`font-medium ${alert.resolved ? 'text-gray-500' : 'text-white'}`}>
                        {alert.title}
                      </h4>
                      <span className="text-xs text-gray-500">{alert.timestamp}</span>
                    </div>
                    <p className={`text-sm ${alert.resolved ? 'text-gray-600' : 'text-gray-400'}`}>
                      {alert.message}
                    </p>
                    {alert.resolved && (
                      <div className="mt-2">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-900/20 text-emerald-400 rounded text-xs">
                          <CheckCircle className="w-3 h-3" />
                          Resolved
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}