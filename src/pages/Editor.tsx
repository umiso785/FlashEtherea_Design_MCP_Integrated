import { useState } from "react";
import { Play, HelpCircle, RotateCcw } from "lucide-react";
import CodeEditor from "../components/CodeEditor";
import LogsPanel from "../components/LogsPanel";
import { useEditor } from "../services/mcp_hooks";

export default function Editor() {
  const [code, setCode] = useState(`// FlashEtherea MCP IDE
// AI/SEO 자동화 전장 시스템

function flashEtherea() {
  console.log("🚀 FlashEtherea 시스템 초기화");
  
  // Do-No-Harm / No-Falsehood 원칙 적용
  const principles = {
    noHarm: true,
    noFalsehood: true,
    transparency: "최우선"
  };
  
  return principles;
}

flashEtherea();`);
  const { logs, runCode, explainCode, loading } = useEditor();

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-xl font-semibold text-gray-800">Code Editor</h2>
        <p className="text-sm text-gray-600">AI-powered code analysis and execution</p>
      </div>
      
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <CodeEditor value={code} onChange={setCode} />
          </div>
          
          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-3">
              <button 
                onClick={() => runCode(code)} 
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50" 
                disabled={loading}
              >
                <Play className="w-4 h-4" />
                {loading ? "실행 중..." : "실행"}
              </button>
              
              <button 
                onClick={() => explainCode(code)} 
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50" 
                disabled={loading}
              >
                <HelpCircle className="w-4 h-4" />
                설명
              </button>
              
              <button 
                onClick={() => setCode("// 새로운 코드를 작성하세요")} 
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                초기화
              </button>
            </div>
          </div>
        </div>
        
        <div className="w-80 border-l border-gray-200">
          <LogsPanel logs={logs} />
        </div>
      </div>
    </div>
  );
}