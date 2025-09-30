// Shared Hooks - MCP Hook
import { useState, useCallback } from 'react';
import { mcpService, PredictResponse, ExplainResponse } from '../services/mcp.service';
import { LogEntry } from '../../core/types';

export function useMCP() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const addLog = useCallback((level: LogEntry['level'], message: string, source?: string) => {
    const newLog: LogEntry = {
      id: Date.now().toString(),
      timestamp: new Date(),
      level,
      message,
      source,
    };
    setLogs(prev => [...prev, newLog]);
  }, []);

  const runCode = useCallback(async (code: string): Promise<PredictResponse> => {
    setLoading(true);
    try {
      addLog('info', `Executing code: ${code.substring(0, 50)}...`, 'MCP');
      const result = await mcpService.predict({ code });
      addLog('success', `✅ Execution result: ${result.output}`, 'MCP');
      return result;
    } catch (error: any) {
      addLog('error', `❌ Execution failed: ${error.message}`, 'MCP');
      throw error;
    } finally {
      setLoading(false);
    }
  }, [addLog]);

  const explainCode = useCallback(async (code: string): Promise<ExplainResponse> => {
    try {
      addLog('info', `Explaining code: ${code.substring(0, 50)}...`, 'MCP');
      const result = await mcpService.explain(code);
      addLog('info', `ℹ️ Explanation: ${result.explanation}`, 'MCP');
      return result;
    } catch (error: any) {
      addLog('error', `❌ Explanation failed: ${error.message}`, 'MCP');
      throw error;
    }
  }, [addLog]);

  const checkHealth = useCallback(async () => {
    try {
      const health = await mcpService.health();
      addLog('success', `🟢 MCP Server healthy: ${health.status}`, 'Health');
      return health;
    } catch (error: any) {
      addLog('error', `🔴 MCP Server unhealthy: ${error.message}`, 'Health');
      throw error;
    }
  }, [addLog]);

  return {
    logs,
    loading,
    runCode,
    explainCode,
    checkHealth,
    addLog,
  };
}