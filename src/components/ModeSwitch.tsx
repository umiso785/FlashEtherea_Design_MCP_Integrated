import { observer } from "mobx-react-lite";
import { motion } from "framer-motion";
import { Monitor, Wifi, Power } from "lucide-react";
import { adaptersStore } from "../store/adapters.store";

export const ModeSwitch = observer(() => {
  const isMockMode = adaptersStore.mode === "mock";

  return (
    <div className="flex items-center gap-3">
      {/* 모드 표시 텍스트 */}
      <div className="text-sm text-gray-400">
        {isMockMode ? "Mock Mode" : "Live Mode"}
      </div>
      
      {/* 아이콘 토글 스위치 */}
      <motion.button
        onClick={() => adaptersStore.toggleMode()}
        className={`relative w-16 h-8 rounded-full p-1 transition-colors duration-300 ${
          isMockMode 
            ? "bg-blue-600/20 border border-blue-500/30" 
            : "bg-green-600/20 border border-green-500/30"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={`현재: ${isMockMode ? "Mock" : "Live"} Mode - 클릭하여 전환`}
      >
        {/* 슬라이딩 배경 */}
        <motion.div
          className={`absolute top-1 w-6 h-6 rounded-full flex items-center justify-center ${
            isMockMode ? "bg-blue-500" : "bg-green-500"
          }`}
          animate={{
            x: isMockMode ? 0 : 32
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30
          }}
        >
          {/* 아이콘 */}
          <motion.div
            animate={{ rotate: isMockMode ? 0 : 180 }}
            transition={{ duration: 0.3 }}
          >
            {isMockMode ? (
              <Monitor className="w-4 h-4 text-white" />
            ) : (
              <Wifi className="w-4 h-4 text-white" />
            )}
          </motion.div>
        </motion.div>
        
        {/* 배경 아이콘들 */}
        <div className="absolute inset-0 flex items-center justify-between px-2">
          <Monitor className={`w-4 h-4 transition-opacity ${
            isMockMode ? "opacity-100 text-blue-400" : "opacity-30 text-gray-500"
          }`} />
          <Wifi className={`w-4 h-4 transition-opacity ${
            !isMockMode ? "opacity-100 text-green-400" : "opacity-30 text-gray-500"
          }`} />
        </div>
      </motion.button>
      
      {/* 상태 인디케이터 */}
      <motion.div
        className={`w-2 h-2 rounded-full ${
          isMockMode ? "bg-blue-400" : "bg-green-400"
        }`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  );
});