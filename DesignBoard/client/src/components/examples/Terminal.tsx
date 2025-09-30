import { useState } from "react";
import Terminal from "../Terminal";

export default function TerminalExample() {
  const [logs, setLogs] = useState<Array<{ type: "info" | "error" | "success" | "command"; text: string }>>([
    { type: "info" as const, text: "$ npm run dev" },
    { type: "info" as const, text: "Starting development server..." },
    { type: "success" as const, text: "Server running on http://localhost:5000" },
    { type: "info" as const, text: "Watching for file changes..." },
  ]);

  const handleCommand = (command: string) => {
    setLogs([
      ...logs,
      { type: "command" as const, text: `$ ${command}` },
      { type: "info" as const, text: `Executing: ${command}` },
    ]);
  };

  return (
    <div className="h-96">
      <Terminal logs={logs} onCommand={handleCommand} />
    </div>
  );
}
