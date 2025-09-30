import { adaptersStore } from "../store/adapters.store";
import { observer } from "mobx-react-lite";
import StatusBadge from "../components/StatusBadge";
import { motion } from "framer-motion";
import { Settings as SettingsIcon, Wifi, Server, Monitor, ArrowLeft, Shield, BarChart3 } from "lucide-react";
import { llmGate, llmStats, llmGuardHelpers } from "../llmGuard";
import { ModeSwitch } from "../components/ModeSwitch";

export default observer(function Settings() {
  const stats = llmStats.getStats();
  
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      {/* 헤더 */}
      <div className="max-w-4xl mx-auto pt-8 pb-6 px-6">
        <div className="flex items-center gap-4 mb-6">
          <motion.a
            href="/execution"
            className="flex items-center gap-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">대시보드로 돌아가기</span>
          </motion.a>
        </div>
        
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center">
            <SettingsIcon className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">설정</h1>
        </div>
        <p className="text-gray-400">FlashEtherea 시스템 설정 및 모드 관리</p>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="bg-white text-gray-900 rounded-t-3xl min-h-screen">
        <div className="max-w-4xl mx-auto p-6">
          
          {/* 간단한 MCP 모드 스위치 */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 mb-6 border border-blue-200">
            <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Server className="w-5 h-5" />
              ⚙️ 시스템 설정
            </h2>
            
            {/* MCP 모드 스위치 */}
            <div className="mb-6">
              <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 mb-4">
                <p className="text-blue-900 font-semibold">
                  현재 MCP 모드: <span className="text-blue-600">{adaptersStore.mode}</span>
                </p>
              </div>
              
              <div className="flex justify-center">
                <ModeSwitch />
              </div>
            </div>

            {/* LLM Gate 상태 */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 mb-2">LLM Gate 상태</h3>
              <div className="text-sm text-orange-800 space-y-1">
                <p>LLM Gate: <span className="font-semibold">{llmGate.enabled ? "ON" : "OFF"}</span></p>
                <p>Whitelist: {llmGate.whitelist.join(", ")}</p>
                <p>쿨다운: {llmGate.cooldown_ms / 1000}s</p>
              </div>
            </div>
          </div>
          
          {/* MCP 어댑터 상태 */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">MCP 어댑터 상태</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {adaptersStore.adapters.map((adapter) => (
                <div key={adapter.name} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{adapter.name}</span>
                    <StatusBadge status={adapter.status} />
                  </div>
                  <div className="text-sm text-gray-600">
                    {adaptersStore.mode === "mock" ? "시뮬레이션 모드" : "실시간 연결"}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* LLM Guard 설정 */}
          <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-xl p-8 border border-orange-200 shadow-lg">
            <h2 className="text-xl font-bold text-orange-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              LLM Guard 제어
            </h2>
            
            <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${
                  llmGate.enabled ? "bg-green-500 animate-pulse" : "bg-red-500"
                }`}></div>
                <span className="font-semibold text-orange-900">
                  LLM Gate: {llmGate.enabled ? "활성화" : "비활성화"}
                </span>
              </div>
              <p className="text-sm text-orange-700">
                {llmGate.enabled 
                  ? "LLM 호출이 허용되어 있습니다. 리소스 사용량을 모니터링하세요." 
                  : "LLM 호출이 차단되어 있습니다. Mock 응답을 사용합니다."
                }
              </p>
            </div>
            
            {/* LLM 통계 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg p-3 text-center border border-orange-200">
                <div className="text-lg font-bold text-orange-600">{stats.total}</div>
                <div className="text-xs text-orange-700">총 호출</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center border border-red-200">
                <div className="text-lg font-bold text-red-600">{stats.blocked}</div>
                <div className="text-xs text-red-700">차단됨</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center border border-green-200">
                <div className="text-lg font-bold text-green-600">{stats.success}</div>
                <div className="text-xs text-green-700">성공</div>
              </div>
              <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
                <div className="text-lg font-bold text-gray-600">{stats.blockRate}%</div>
                <div className="text-xs text-gray-700">차단율</div>
              </div>
            </div>
            
            {/* 제어 버튼들 */}
            <div className="flex flex-wrap gap-3">
              <motion.button
                onClick={() => llmGuardHelpers.enable()}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                LLM 활성화
              </motion.button>
              
              <motion.button
                onClick={() => llmGuardHelpers.disable()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                LLM 비활성화
              </motion.button>
              
              <motion.button
                onClick={() => llmStats.reset()}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                통계 초기화
              </motion.button>
              
              <motion.button
                onClick={() => llmGuardHelpers.printStats()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <BarChart3 className="w-4 h-4 inline mr-2" />
                콘솔 통계
              </motion.button>
            </div>
            
            {/* 현재 설정 표시 */}
            <div className="mt-6 bg-white rounded-lg p-4 border border-orange-200">
              <h3 className="font-semibold text-gray-900 mb-2">현재 설정</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div>쿨다운: {llmGate.cooldown_ms}ms</div>
                <div>최대 토큰: {llmGate.max_tokens}</div>
                <div>화이트리스트: {llmGate.whitelist.join(', ')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});