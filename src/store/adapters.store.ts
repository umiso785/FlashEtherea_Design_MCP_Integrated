import { makeAutoObservable } from "mobx";
import { logStore } from "./log.store";
import { llmGuardHelpers } from "../llmGuard";

export class AdaptersStore {
  adapters: { name: string; status: "healthy" | "warning" | "error" }[] = [
    { name: "ollama", status: "healthy" },
    { name: "deepseek", status: "warning" },
    { name: "local_llm", status: "error" },
  ];
  
  mode: "mock" | "live" = "mock"; // Bolt.new 기본 mock 모드
  connectionStatus: "connecting" | "connected" | "disconnected" | "error" = "disconnected";

  constructor() { makeAutoObservable(this); }

  updateStatus(name: string, status: "healthy" | "warning" | "error") {
    const adapter = this.adapters.find((a) => a.name === name);
    if (adapter) adapter.status = status;
  }
  
  setMode(newMode: "mock" | "live") {
    this.mode = newMode;
    
    // 모드 전환 시 연결 상태 초기화
    if (newMode === "mock") {
      this.connectionStatus = "disconnected";
      console.log("🔄 Mock Mode 활성화 → WebSocket 연결 차단");
    } else {
      console.log("⚡ Live Mode 활성화 → WebSocket 연결 허용");
    }
    
    // 로그 기록
    logStore.addLog({
      type: newMode === "mock" ? "info" : "success",
      message: newMode === "mock" ? "⚙️ Mock Mode 활성화" : "⚡ Live Mode 전환",
      timestamp: new Date().toLocaleTimeString()
    });

    // LLM Gate 자동 연동
    if (newMode === "live") {
      llmGuardHelpers.enable();
    } else {
      llmGuardHelpers.disable();
    }

    console.log(`🔄 MCP 모드 변경: ${newMode.toUpperCase()} (연결상태: ${this.connectionStatus})`);
  }
  
  toggleMode() {
    const newMode = this.mode === "mock" ? "live" : "mock";
    this.setMode(newMode);
  }
  
  setConnectionStatus(status: "connecting" | "connected" | "disconnected" | "error") {
    this.connectionStatus = status;
  }
}

export const adaptersStore = new AdaptersStore();