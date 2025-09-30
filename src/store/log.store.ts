import { makeAutoObservable } from "mobx";

export interface LogEntry {
  type: "info" | "warn" | "error" | "success";
  message: string;
  timestamp: string;
  id: string;
  analysis?: string; // LLM 분석 결과 저장
}

class LogStore {
  logs: LogEntry[] = [
    {
      id: "1",
      type: "info",
      message: "🚀 FlashEtherea 시스템 초기화 완료",
      timestamp: new Date().toLocaleTimeString()
    },
    {
      id: "2", 
      type: "info",
      message: "📡 MCP 서버 연결 확인 중...",
      timestamp: new Date().toLocaleTimeString()
    }
  ];
  llmAnalysisEnabled = false; // 🔥 분석 모드 토글

  constructor() {
    makeAutoObservable(this);
  }

  addLog(entry: Omit<LogEntry, 'id'>) {
    const newLog: LogEntry = {
      ...entry,
      id: Date.now().toString()
    };
    this.logs.unshift(newLog); // 최신 로그 위로
    
    // 로그가 너무 많아지면 오래된 것 제거
    if (this.logs.length > 100) {
      this.logs = this.logs.slice(0, 100);
    }
  }

  toggleAnalysis() {
    this.llmAnalysisEnabled = !this.llmAnalysisEnabled;
    
    // 분석 모드 변경 로그 추가
    this.addLog({
      level: this.llmAnalysisEnabled ? 'success' : 'info',
      message: this.llmAnalysisEnabled ? '🧠 LLM 분석 모드 활성화' : '💤 LLM 분석 모드 비활성화',
      timestamp: new Date(),
      source: 'LogStore'
    });
  }

  updateLogAnalysis(logId: string, analysis: string) {
    const log = this.logs.find(l => l.id === logId);
    if (log) {
      log.analysis = analysis;
    }
  }
  clearLogs() {
    this.logs = [];
  }
}

export const logStore = new LogStore();