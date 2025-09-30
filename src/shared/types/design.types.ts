// Design Dashboard Types
export interface ComponentNode {
  id: string;
  name: string;
  type: 'component' | 'hook' | 'service' | 'store';
  path: string;
  dependencies: string[];
  exports: string[];
  status: 'healthy' | 'warning' | 'error';
  lastModified: Date;
}

export interface ArchitectureLayer {
  name: string;
  components: ComponentNode[];
  description: string;
  color: string;
}

export interface DependencyGraph {
  nodes: ComponentNode[];
  edges: Array<{
    from: string;
    to: string;
    type: 'import' | 'extends' | 'uses';
  }>;
}

export interface DesignMetric {
  name: string;
  value: number;
  target: number;
  status: 'healthy' | 'warning' | 'error';
  trend: 'up' | 'down' | 'stable';
}