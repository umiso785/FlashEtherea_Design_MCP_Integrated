import { useState, useEffect } from 'react';
import { ComponentNode, ArchitectureLayer, DependencyGraph, DesignMetric } from '../../../shared/types/design.types';

export function useDesignComponents() {
  const [components, setComponents] = useState<ComponentNode[]>([]);
  const [architectureLayers, setArchitectureLayers] = useState<ArchitectureLayer[]>([]);
  const [dependencyGraph, setDependencyGraph] = useState<DependencyGraph>({ nodes: [], edges: [] });
  const [metrics, setMetrics] = useState<DesignMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - 실제 환경에서는 API 호출로 교체
    const mockComponents: ComponentNode[] = [
      {
        id: '1',
        name: 'ActivityBar',
        type: 'component',
        path: '/src/ui/components/ActivityBar.tsx',
        dependencies: ['lucide-react', 'framer-motion'],
        exports: ['ActivityBar'],
        status: 'healthy',
        lastModified: new Date('2025-01-27')
      },
      {
        id: '2',
        name: 'useEditor',
        type: 'hook',
        path: '/src/shared/hooks/useMCP.ts',
        dependencies: ['react', 'mcp.service'],
        exports: ['useEditor'],
        status: 'warning',
        lastModified: new Date('2025-01-26')
      },
      {
        id: '3',
        name: 'MCPService',
        type: 'service',
        path: '/src/shared/services/mcp.service.ts',
        dependencies: ['constants'],
        exports: ['mcpService'],
        status: 'healthy',
        lastModified: new Date('2025-01-27')
      },
      {
        id: '4',
        name: 'EditorStore',
        type: 'store',
        path: '/src/store/editor.store.ts',
        dependencies: ['mobx'],
        exports: ['editorStore'],
        status: 'error',
        lastModified: new Date('2025-01-25')
      },
      {
        id: '5',
        name: 'LogsPanel',
        type: 'component',
        path: '/src/components/LogsPanel.tsx',
        dependencies: ['mobx-react-lite', 'framer-motion'],
        exports: ['LogsPanel'],
        status: 'healthy',
        lastModified: new Date('2025-01-27')
      },
      {
        id: '6',
        name: 'CommandRibbon',
        type: 'component',
        path: '/src/components/CommandRibbon.tsx',
        dependencies: ['lucide-react'],
        exports: ['CommandRibbon'],
        status: 'healthy',
        lastModified: new Date('2025-01-27')
      }
    ];

    const mockLayers: ArchitectureLayer[] = [
      {
        name: 'UI Layer',
        description: 'User interface components and layouts',
        color: '#3b82f6',
        components: mockComponents.filter(c => c.path.includes('/ui/') || c.path.includes('/components/'))
      },
      {
        name: 'Features Layer',
        description: 'Feature-specific components and logic',
        color: '#10b981',
        components: mockComponents.filter(c => c.path.includes('/features/'))
      },
      {
        name: 'Shared Layer',
        description: 'Shared services, hooks, and utilities',
        color: '#8b5cf6',
        components: mockComponents.filter(c => c.path.includes('/shared/') || c.path.includes('/services/') || c.path.includes('/hooks/'))
      },
      {
        name: 'Core Layer',
        description: 'Core types, constants, and configurations',
        color: '#f59e0b',
        components: mockComponents.filter(c => c.path.includes('/core/') || c.path.includes('/store/'))
      }
    ];

    const mockGraph: DependencyGraph = {
      nodes: mockComponents,
      edges: [
        { from: '1', to: '3', type: 'import' },
        { from: '2', to: '3', type: 'uses' },
        { from: '5', to: '4', type: 'import' },
        { from: '6', to: '2', type: 'uses' },
      ]
    };

    const mockMetrics: DesignMetric[] = [
      { name: 'Components', value: 24, target: 30, status: 'healthy', trend: 'up' },
      { name: 'Test Coverage', value: 87, target: 90, status: 'warning', trend: 'up' },
      { name: 'Dependencies', value: 12, target: 15, status: 'healthy', trend: 'stable' },
      { name: 'Tech Debt', value: 3, target: 5, status: 'healthy', trend: 'down' }
    ];

    setComponents(mockComponents);
    setArchitectureLayers(mockLayers);
    setDependencyGraph(mockGraph);
    setMetrics(mockMetrics);
    setLoading(false);
  }, []);

  return {
    components,
    architectureLayers,
    dependencyGraph,
    metrics,
    loading
  };
}