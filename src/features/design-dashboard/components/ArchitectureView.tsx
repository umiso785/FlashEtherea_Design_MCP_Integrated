import { motion } from 'framer-motion';
import { Layers, Package, Database, Globe } from 'lucide-react';
import { ArchitectureLayer } from '../../../shared/types/design.types';

interface Props {
  layers: ArchitectureLayer[];
}

export default function ArchitectureView({ layers }: Props) {
  const getLayerIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case 'ui':
        return Globe;
      case 'features':
        return Package;
      case 'shared':
        return Database;
      case 'core':
        return Layers;
      default:
        return Package;
    }
  };

  return (
    <div className="space-y-6">
      {layers.map((layer, index) => {
        const Icon = getLayerIcon(layer.name);
        
        return (
          <motion.div
            key={layer.name}
            className="bg-[#0f1419] rounded-xl p-6 border border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: layer.color }}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white">{layer.name}</h4>
                <p className="text-sm text-gray-400">{layer.description}</p>
              </div>
              <div className="ml-auto text-right">
                <div className="text-sm font-medium text-white">{layer.components.length}</div>
                <div className="text-xs text-gray-400">components</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {layer.components.slice(0, 6).map((component) => (
                <motion.div
                  key={component.id}
                  className="flex items-center gap-2 p-2 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    component.status === 'healthy' ? 'bg-emerald-400' :
                    component.status === 'warning' ? 'bg-amber-400' : 'bg-red-400'
                  }`}></div>
                  <span className="text-sm text-gray-300 truncate">{component.name}</span>
                </motion.div>
              ))}
              
              {layer.components.length > 6 && (
                <div className="flex items-center justify-center p-2 bg-gray-800/20 rounded-lg border border-gray-700 border-dashed">
                  <span className="text-xs text-gray-400">+{layer.components.length - 6} more</span>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}