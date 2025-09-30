import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, X, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

interface TerminalProps {
  logs?: Array<{ type: "info" | "error" | "success" | "command"; text: string }>;
  onCommand?: (command: string) => void;
}

export default function Terminal({ logs = [], onCommand }: TerminalProps) {
  const [command, setCommand] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim()) {
      console.log("Command executed:", command);
      onCommand?.(command);
      setCommand("");
    }
  };

  const getLogColor = (type: string) => {
    switch (type) {
      case "error":
        return "text-destructive";
      case "success":
        return "text-chart-2";
      case "command":
        return "text-primary";
      default:
        return "text-foreground";
    }
  };

  if (!isExpanded) {
    return (
      <div className="h-10 bg-background border-t border-border flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Terminal</span>
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          onClick={() => setIsExpanded(true)}
          data-testid="button-expand-terminal"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background border-t border-border">
      <div className="h-10 border-b border-border flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Terminal</span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={() => setIsExpanded(false)}
            data-testid="button-minimize-terminal"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={() => console.log("Clear terminal")}
            data-testid="button-clear-terminal"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-1 font-mono">
        <div ref={scrollRef} className="p-4 text-sm space-y-1">
          {logs.map((log, index) => (
            <div
              key={index}
              className={getLogColor(log.type)}
              data-testid={`terminal-log-${index}`}
            >
              {log.text}
            </div>
          ))}
        </div>
      </ScrollArea>
      <form onSubmit={handleSubmit} className="border-t border-border p-2">
        <div className="flex items-center gap-2">
          <span className="text-primary font-mono text-sm">$</span>
          <Input
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Type a command..."
            className="flex-1 h-8 bg-transparent border-0 font-mono text-sm focus-visible:ring-0 px-0"
            data-testid="input-terminal-command"
          />
        </div>
      </form>
    </div>
  );
}
