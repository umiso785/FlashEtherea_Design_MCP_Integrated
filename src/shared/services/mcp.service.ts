// Shared Services - MCP Service
import { MCP_ENDPOINTS } from '../../core/constants';

export interface PredictRequest { 
  code: string; 
}

export interface PredictResponse { 
  output: string; 
}

export interface ExplainResponse { 
  explanation: string; 
}

export interface HealthResponse {
  status: string;
  version: string;
  adapters: Record<string, string>;
}

class MCPService {
  private baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE || '/api';
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`MCP API Error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }

  async health(): Promise<HealthResponse> {
    return this.request<HealthResponse>(MCP_ENDPOINTS.HEALTH);
  }

  async predict(payload: PredictRequest): Promise<PredictResponse> {
    return this.request<PredictResponse>(MCP_ENDPOINTS.PREDICT, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async explain(code: string): Promise<ExplainResponse> {
    return this.request<ExplainResponse>(MCP_ENDPOINTS.EXPLAIN, {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  }

  async getAdapterStatus() {
    return this.request(MCP_ENDPOINTS.ADAPTERS);
  }

  async systemRollback() {
    return this.request(MCP_ENDPOINTS.ROLLBACK, {
      method: 'POST',
    });
  }
}

export const mcpService = new MCPService();