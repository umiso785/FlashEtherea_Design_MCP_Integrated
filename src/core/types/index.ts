// Core Types - 핵심 타입 정의
export type PanelType = 'explorer' | 'search' | 'git' | 'debug' | 'extensions' | 'mcp';

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileNode[];
  isOpen?: boolean;
  language?: string;
}

export interface Tab {
  id: string;
  name: string;
  path: string;
  content: string;
  isDirty: boolean;
  language: string;
}

export interface MCPAdapter {
  name: string;
  status: 'healthy' | 'warning' | 'error';
  latency: string;
  description: string;
}

export interface KPIMetric {
  name: string;
  value: string | number;
  icon?: any;
  trend?: string;
}

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: 'info' | 'warn' | 'error' | 'success';
  message: string;
  source?: string;
}