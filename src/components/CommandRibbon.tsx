import { useEffect } from "react";
import { Play, Square, RotateCcw, AlertTriangle } from "lucide-react";

interface Props {
  onStart?: () => void;
  onStop?: () => void;
  onRollback?: () => void;
  busy?: boolean;
}

export default function CommandRibbon({ onStart, onStop, onRollback, busy = false }: Props) {
  // 키바인딩 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // busy 상태일 때는 키바인딩 무시
      if (busy) return;
      
      // Ctrl/Cmd + Enter: Start
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        onStart?.();
      }
      
      // Ctrl/Cmd + Backspace: Stop
      if ((e.ctrlKey || e.metaKey) && e.key === 'Backspace') {
        e.preventDefault();
        onStop?.();
      }
      
      // Shift + R: Rollback
      if (e.shiftKey && e.key === 'R') {
        e.preventDefault();
        onRollback?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onStart, onStop, onRollback, busy]);

  return (
    <div className="flex items-center gap-3 p-4 bg-[#1a1f2e] rounded-xl border border-gray-800">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${busy ? 'bg-yellow-500 animate-pulse' : 'bg-green-500 animate-pulse'}`}></div>
        <span className="text-sm font-medium text-gray-300">
          {busy ? 'System Busy' : 'System Active'}
        </span>
      </div>
      
      <div className="flex gap-2 ml-auto">
        <button 
          onClick={onStart}
          disabled={busy}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Start System (Ctrl+Enter)"
        >
          <Play className="w-4 h-4" />
          Start
          <span className="text-xs opacity-75 ml-1">⌘⏎</span>
        </button>
        
        <button 
          onClick={onStop}
          disabled={busy}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Stop System (Ctrl+Backspace)"
        >
          <Square className="w-4 h-4" />
          Stop
          <span className="text-xs opacity-75 ml-1">⌘⌫</span>
        </button>
        
        <button 
          onClick={onRollback}
          disabled={busy}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Emergency Rollback (Shift+R)"
        >
          <RotateCcw className="w-4 h-4" />
          Rollback
          <span className="text-xs opacity-75 ml-1">⇧R</span>
        </button>
        
        <button 
          disabled={busy}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Emergency Stop"
        >
          <AlertTriangle className="w-4 h-4" />
          Emergency
        </button>
      </div>
    </div>
  );
}