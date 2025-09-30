// Bolt.new LLM 호출 제어기
export const llmGate = {
  enabled: false,                      // Bolt.new 기본값: OFF
  whitelist: ["TTL_ERROR", "CONNECTION_SPIKE"],  // 허용 이벤트만 호출
  max_tokens: 2000,                    // 1회 호출 상한
  cooldown_ms: 5000,                   // 호출 간 최소 대기시간 (5s)
};

let lastCall = 0;

export async function guardedCall(event: string, fn: () => Promise<any>) {
  if (!llmGate.enabled) {
    console.log(`[llmGuard] Gate OFF → 차단됨 (${event})`);
    return { mock: true, message: "LLM 호출 차단됨" };
  }

  if (!llmGate.whitelist.includes(event)) {
    console.log(`[llmGuard] 이벤트 ${event} 허용 안됨`);
    return { mock: true, message: "Whitelist 차단" };
  }

  const now = Date.now();
  if (now - lastCall < llmGate.cooldown_ms) {
    console.log(`[llmGuard] 쿨다운 적용, 호출 무시`);
    return { mock: true, message: "Cooldown 차단" };
  }

  lastCall = now;
  return await fn();
}

// LLM 호출 통계
export const llmStats = {
  totalCalls: 0,
  blockedCalls: 0,
  successCalls: 0,
  errorCalls: 0,
  
  reset() {
    this.totalCalls = 0;
    this.blockedCalls = 0;
    this.successCalls = 0;
    this.errorCalls = 0;
  },
  
  getStats() {
    return {
      total: this.totalCalls,
      blocked: this.blockedCalls,
      success: this.successCalls,
      error: this.errorCalls,
      blockRate: this.totalCalls > 0 ? (this.blockedCalls / this.totalCalls * 100).toFixed(1) : '0'
    };
  }
};

// 향상된 가드 함수 (통계 포함)
export async function guardedCallWithStats(event: string, fn: () => Promise<any>) {
  llmStats.totalCalls++;
  
  if (!llmGate.enabled) {
    llmStats.blockedCalls++;
    console.log(`[llmGuard] Gate OFF → 차단됨 (${event})`);
    return { mock: true, message: "LLM 호출 차단됨", blocked: true };
  }

  if (!llmGate.whitelist.includes(event)) {
    llmStats.blockedCalls++;
    console.log(`[llmGuard] 이벤트 ${event} 허용 안됨`);
    return { mock: true, message: "Whitelist 차단", blocked: true };
  }

  const now = Date.now();
  if (now - lastCall < llmGate.cooldown_ms) {
    llmStats.blockedCalls++;
    console.log(`[llmGuard] 쿨다운 적용, 호출 무시`);
    return { mock: true, message: "Cooldown 차단", blocked: true };
  }

  try {
    lastCall = now;
    const result = await fn();
    llmStats.successCalls++;
    return result;
  } catch (error) {
    llmStats.errorCalls++;
    console.error(`[llmGuard] LLM 호출 에러:`, error);
    return { mock: true, message: "LLM 호출 실패", error: true };
  }
}

// 설정 업데이트 함수
export function updateLLMGate(config: Partial<typeof llmGate>) {
  Object.assign(llmGate, config);
  console.log(`[llmGuard] 설정 업데이트:`, llmGate);
}

// 개발용 헬퍼 함수들
export const llmGuardHelpers = {
  // 게이트 활성화/비활성화
  enable: () => updateLLMGate({ enabled: true }),
  disable: () => updateLLMGate({ enabled: false }),
  
  // 화이트리스트 관리
  addToWhitelist: (event: string) => {
    if (!llmGate.whitelist.includes(event)) {
      llmGate.whitelist.push(event);
      console.log(`[llmGuard] 화이트리스트에 추가: ${event}`);
    }
  },
  
  removeFromWhitelist: (event: string) => {
    const index = llmGate.whitelist.indexOf(event);
    if (index > -1) {
      llmGate.whitelist.splice(index, 1);
      console.log(`[llmGuard] 화이트리스트에서 제거: ${event}`);
    }
  },
  
  // 쿨다운 설정
  setCooldown: (ms: number) => updateLLMGate({ cooldown_ms: ms }),
  
  // 통계 출력
  printStats: () => {
    const stats = llmStats.getStats();
    console.table(stats);
  }
};

// 전역 객체에 디버깅용 함수 노출 (개발 환경에서만)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).llmGuard = {
    gate: llmGate,
    stats: llmStats,
    helpers: llmGuardHelpers
  };
}