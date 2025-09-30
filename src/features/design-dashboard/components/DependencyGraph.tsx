import { motion } from 'framer-motion';
import { GitBranch, ArrowRight, Package, AlertTriangle } from 'lucide-react';
import { DependencyGraph as DependencyGraphType } from '../../../shared/types/design.types';

interface Props {
  graph: DependencyGraphType;
}

export default function DependencyGraph({ graph }: Props) {
  const getNodeColor = (type: string) => {
    switch (type) {
      case 'component':
        return 'bg-blue-500';
      case 'hook':
        return 'bg-green-500';
      case 'service':
        return 'bg-purple-500';
      case 'store':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getEdgeColor = (type: string) => {
    switch (type) {
      case 'import':
        return 'text-blue-400';
      case 'extends':
        return 'text-green-400';
      case 'uses':
        return 'text-purple-400';
      default:
        return 'text-gray-400';
    }
  };

  // 순환 의존성 감지
  const circularDependencies = graph.edges.filter(edge => 
    graph.edges.some(reverseEdge => 
      reverseEdge.from === edge.to && reverseEdge.to === edge.from
    )
  );

  return (
    <div className="space-y-6">
      {/* 순환 의존성 경고 */}
      {circularDependencies.length > 0 && (
        <motion.div
          className="bg-red-900/20 border border-red-500/30 rounded-lg p-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h4 className="text-sm font-medium text-red-400">Circular Dependencies Detected</h4>
          </div>
          <p className="text-xs text-red-300">
            {circularDependencies.length} circular dependencies found. This may cause issues.
          </p>
        </motion.div>
      )}

      {/* 노드 목록 */}
      <div className="bg-[#0f1419] rounded-xl p-6 border border-gray-800">
        <h4 className="text-lg font-semibold text-white mb-4">Components</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {graph.nodes.map((node) => (
            <motion.div
              key={node.id}
              className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              <div className={`w-3 h-3 rounded-full ${getNodeColor(node.type)}`}></div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">{node.name}</div>
                <div className="text-xs text-gray-400">{node.type}</div>
              </div>
              <div className="text-xs text-gray-500">
                {graph.edges.filter(edge => edge.from === node.id).length} deps
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 의존성 관계 */}
      <div className="bg-[#0f1419] rounded-xl p-6 border border-gray-800">
        <h4 className="text-lg font-semibold text-white mb-4">Dependencies</h4>
        <div className="space-y-2">
          {graph.edges.map((edge, index) => {
            const fromNode = graph.nodes.find(n => n.id === edge.from);
            const toNode = graph.nodes.find(n => n.id === edge.to);
            
            if (!fromNode || !toNode) return null;
            
            return (
              <motion.div
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-800/20 rounded-lg hover:bg-gray-800/40 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getNodeColor(fromNode.type)}`}></div>
                  <span className="text-sm text-gray-300">{fromNode.name}</span>
                </div>
                
                <ArrowRight className={`w-4 h-4 ${getEdgeColor(edge.type)}`} />
                
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getNodeColor(toNode.type)}`}></div>
                  <span className="text-sm text-gray-300">{toNode.name}</span>
                </div>
                
                <div className="ml-auto">
                  <span className={`text-xs px-2 py-1 rounded ${
                    edge.type === 'import' ? 'bg-blue-600/20 text-blue-300' :
                    edge.type === 'extends' ? 'bg-green-600/20 text-green-300' :
                    'bg-purple-600/20 text-purple-300'
                  }`}>
                    {edge.type}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}