import { useState, useCallback } from "react";
import { EditorService, PredictResponse, ExplainResponse } from "./editor.service";
import { guardedCallWithStats } from "../llmGuard";

export function useEditor() {
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const runCode = useCallback(async (code: string) => {
    setLoading(true);
    try {
      // 입력 검증
      if (!code || code.trim() === "") {
        throw new Error("빈 코드는 실행할 수 없습니다");
      }
      
      const res = await guardedCallWithStats("CODE_EXECUTION", async () => {
        return await EditorService.predict({ code });
      });
      
      if (res.mock) {
        setLogs((prev) => [...prev, `🛡️ LLM Guard: ${res.message}`]);
        // Mock 응답 생성
        const mockResponse: PredictResponse = {
          output: `✅ Mock 실행 결과: ${code.length} chars processed`
        };
        return mockResponse;
      } else {
        setLogs((prev) => [...prev, `✅ 실행 결과: ${res.output}`]);
        return res;
      }
    } catch (err: any) {
      console.error("❌ runCode 오류:", err);
      setLogs((prev) => [...prev, `❌ 오류: ${err.message}`]);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const explainCode = useCallback(async (code: string) => {
    try {
      // 입력 검증
      if (!code || code.trim() === "") {
        throw new Error("빈 코드는 설명할 수 없습니다");
      }
      
      const res = await guardedCallWithStats("CODE_EXPLANATION", async () => {
        return await EditorService.explain(code);
      });
      
      if (res.mock) {
        setLogs((prev) => [...prev, `🛡️ LLM Guard: ${res.message}`]);
        // Mock 응답 생성
        const mockResponse: ExplainResponse = {
          explanation: `📝 Mock 설명: ${code.includes('function') ? '함수 정의' : '코드 구조'} 감지됨`
        };
        return mockResponse;
      } else {
        setLogs((prev) => [...prev, `ℹ️ 설명: ${res.explanation}`]);
        return res;
      }
    } catch (err: any) {
      console.error("❌ explainCode 오류:", err);
      setLogs((prev) => [...prev, `❌ 오류: ${err.message}`]);
      throw err;
    }
  }, []);

  return { logs, runCode, explainCode, loading };
}