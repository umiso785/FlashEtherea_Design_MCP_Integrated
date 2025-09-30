import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ActivityBar from '../components/ide/ActivityBar';
import SidePanel from '../components/ide/SidePanel';
import EditorPanel from '../components/ide/EditorPanel';
import RightPanel from '../components/ide/RightPanel';
import BottomPanel from '../components/ide/BottomPanel';
import StatusBar from '../components/ide/StatusBar';
import { useMCP } from '../shared/hooks/useMCP';

export type PanelType = 'explorer' | 'search' | 'git' | 'debug' | 'extensions' | 'mcp';

interface Props {
  children?: React.ReactNode;
}

export default function IDELayout({ children }: Props) {
  const [activePanel, setActivePanel] = useState<PanelType>('explorer');
  const [sidePanelWidth, setSidePanelWidth] = useState(300);
  const [rightPanelWidth, setRightPanelWidth] = useState(300);
  const [bottomPanelHeight, setBottomPanelHeight] = useState(200);
  const [showSidePanel, setShowSidePanel] = useState(true);
  const [showRightPanel, setShowRightPanel] = useState(true);
  const [showBottomPanel, setShowBottomPanel] = useState(true);
  const { logs } = useMCP();

  // 키보드 단축키
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'b':
            e.preventDefault();
            setShowSidePanel(!showSidePanel);
            break;
          case 'j':
            e.preventDefault();
            setShowBottomPanel(!showBottomPanel);
            break;
          case '`':
            e.preventDefault();
            setShowBottomPanel(true);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSidePanel, showBottomPanel]);

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col overflow-hidden">
      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Activity Bar */}
        <ActivityBar 
          activePanel={activePanel} 
          onPanelChange={setActivePanel}
          onToggleSidePanel={() => setShowSidePanel(!showSidePanel)}
        />

        {/* Side Panel */}
        <motion.div
          initial={false}
          animate={{ 
            width: showSidePanel ? sidePanelWidth : 0,
            opacity: showSidePanel ? 1 : 0
          }}
          transition={{ duration: 0.2 }}
          className="bg-gray-800 border-r border-gray-700 overflow-hidden"
        >
          {showSidePanel && (
            <SidePanel 
              activePanel={activePanel}
              width={sidePanelWidth}
              onResize={setSidePanelWidth}
              onClose={() => setShowSidePanel(false)}
            />
          )}
        </motion.div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Editor Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Editor Panel */}
            <div className="flex-1 overflow-hidden">
              <EditorPanel 
                onRunCode={(code) => console.log('Running:', code)}
                onExplainCode={(code) => console.log('Explaining:', code)}
              />
            </div>

            {/* Right Panel */}
            <motion.div
              initial={false}
              animate={{ 
                width: showRightPanel ? rightPanelWidth : 0,
                opacity: showRightPanel ? 1 : 0
              }}
              transition={{ duration: 0.2 }}
              className="bg-gray-800 border-l border-gray-700 overflow-hidden"
            >
              {showRightPanel && (
                <RightPanel 
                  width={rightPanelWidth}
                  onResize={setRightPanelWidth}
                  onClose={() => setShowRightPanel(false)}
                />
              )}
            </motion.div>
          </div>

          {/* Bottom Panel */}
          <motion.div
            initial={false}
            animate={{ 
              height: showBottomPanel ? bottomPanelHeight : 0,
              opacity: showBottomPanel ? 1 : 0
            }}
            transition={{ duration: 0.2 }}
            className="bg-gray-800 border-t border-gray-700 overflow-hidden"
          >
            {showBottomPanel && (
              <BottomPanel 
                height={bottomPanelHeight}
                onResize={setBottomPanelHeight}
                onClose={() => setShowBottomPanel(false)}
                logs={logs}
              />
            )}
          </motion.div>
        </div>
      </div>

      {/* Status Bar */}
      <StatusBar 
        onToggleBottomPanel={() => setShowBottomPanel(!showBottomPanel)}
        onToggleRightPanel={() => setShowRightPanel(!showRightPanel)}
        showBottomPanel={showBottomPanel}
        showRightPanel={showRightPanel}
      />
    </div>
  );
}