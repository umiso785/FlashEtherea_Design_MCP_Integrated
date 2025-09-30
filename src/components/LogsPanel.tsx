import { observer } from "mobx-react-lite";
import { Terminal, Brain, Zap } from "lucide-react";
import { logStore } from "../store/log.store";
import { guardedCallWithStats } from "../llmGuard";
import { motion } from "framer-motion";

export default observer(function LogsPanel() {
  const logs = logStore.logs;

  const analyzeLog = async (log: LogEntry) => {
    if (!logStore.llmAnalysisEnabled || log.analysis) return;

    try {
      // 로그 데이터 검증
      if (!log.message || log.message.trim() === "") {
        console.warn("⚠️ 빈 로그 메시지 분석 건너뜀");
        return;
      }
      
      const result = await guardedCallWithStats("LOG_ANALYSIS", async () => {
        // Mock LLM 분석 (실제 환경에서는 실제 LLM API 호출)
        await new Promise(resolve => setTimeout(resolve, 500)); // 분석 시뮬레이션
        
        // 로그 내용에 따른 Mock 분석 결과
        if (log.message.includes('초기화')) {
          return { text: "🔍 시스템 초기화 프로세스 - 정상적인 부팅 시퀀스입니다." };
        } else if (log.message.includes('연결')) {
          return { text: "🌐 네트워크 연결 시도 - 외부 서비스와의 통신을 확인 중입니다." };
        } else if (log.message.includes('에러') || log.message.includes('실패')) {
          return { text: "⚠️ 오류 감지 - 즉시 확인이 필요한 문제입니다." };
        } else if (log.message.includes('모드')) {
          return { text: "⚙️ 시스템 모드 변경 - 운영 환경 설정이 업데이트되었습니다." };
        } else {
          return { text: "📊 일반 시스템 이벤트 - 정상적인 운영 로그입니다." };
        }
      });

      if (result?.text && !result.blocked) {
        logStore.updateLogAnalysis(log.id, result.text);
      } else if (result?.blocked) {
        logStore.updateLogAnalysis(log.id, "🛡️ LLM 호출이 차단되었습니다. (Gate 정책)");
      }
    } catch (error) {
      console.error("❌ 로그 분석 오류:", error);
      logStore.updateLogAnalysis(log.id, "❌ 분석 중 오류가 발생했습니다.");
    }
  };
  return (
    <div className="w-full h-full bg-[#0f1419] text-white font-mono text-sm flex flex-col">
      {/* 헤더 */}
      <div className="flex items-center justify-between p-3 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="text-sm font-medium">System Logs</span>
          <span className="text-xs text-gray-500">({logs.length})</span>
        </div>
        
        {/* LLM 분석 토글 */}
        <motion.button
          onClick={() => logStore.toggleAnalysis()}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
            logStore.llmAnalysisEnabled 
              ? "bg-purple-600 text-white" 
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={logStore.llmAnalysisEnabled ? "LLM 분석 비활성화" : "LLM 분석 활성화"}
        >
          <Brain className="w-3 h-3" />
          <span>{logStore.llmAnalysisEnabled ? "분석: ON" : "분석: OFF"}</span>
          {logStore.llmAnalysisEnabled && (
            <motion.div
              className="w-1.5 h-1.5 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.button>
      </div>

      {/* 로그 목록 */}
      <div className="flex-1 overflow-y-auto p-2">
      {logs.length === 0 ? (
          <div className="text-center text-gray-500 py-8 h-full flex flex-col items-center justify-center">
          <Terminal className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No logs available</p>
        </div>
      ) : (
          <div className="space-y-2 font-mono text-xs">
          {logs.map((log) => (
              <motion.div 
                key={log.id} 
                className="bg-gray-800/30 rounded-lg p-3 hover:bg-gray-800/50 transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* 메인 로그 */}
                <div className="flex items-start gap-3">
                  <span className="text-xs text-gray-500 mt-0.5 w-16 flex-shrink-0">
                    {typeof log.timestamp === 'string' ? log.timestamp : log.timestamp.toLocaleTimeString()}
                  </span>
                  <span className={`text-sm flex-1 ${
                    log.level === "info" ? "text-blue-400" :
                    log.level === "success" ? "text-green-400" :
                    log.level === "warn" ? "text-yellow-400" : "text-red-400"
                  }`}>
                    {log.message}
                  </span>
                  
                  {/* 분석 버튼 */}
                  {logStore.llmAnalysisEnabled && !log.analysis && (
                    <motion.button
                      onClick={() => analyzeLog(log)}
                      className="flex items-center gap-1 px-2 py-1 bg-purple-600/20 hover:bg-purple-600/40 rounded text-xs text-purple-300 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="LLM으로 로그 분석"
                    >
                      <Zap className="w-3 h-3" />
                      <span>분석</span>
                    </motion.button>
                  )}
                </div>

                {/* LLM 분석 결과 */}
                {log.analysis && (
                  <motion.div 
                    className="mt-2 ml-6 p-2 bg-purple-900/20 border-l-2 border-purple-500 rounded-r"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Brain className="w-3 h-3 text-purple-400" />
                      <span className="text-xs text-purple-400 font-medium">AI 분석</span>
                    </div>
                    <div className="text-xs text-purple-200">
                      {log.analysis}
                    </div>
                  </motion.div>
                )}
              </motion.div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
});