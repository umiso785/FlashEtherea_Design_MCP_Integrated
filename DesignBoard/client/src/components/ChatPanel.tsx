import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatPanelProps {
  messages?: Message[];
  onSendMessage?: (message: string) => void;
}

export default function ChatPanel({ messages = [], onSendMessage }: ChatPanelProps) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      console.log("Sending message:", input);
      onSendMessage?.(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="h-full flex flex-col bg-background border-r border-border">
      <div className="h-12 border-b border-border flex items-center px-4 gap-2">
        <Sparkles className="w-5 h-5 text-primary" />
        <h2 className="text-sm font-semibold text-foreground">AI Assistant</h2>
      </div>

      <ScrollArea className="flex-1">
        <div ref={scrollRef} className="p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Bot className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-sm font-medium text-foreground mb-2">
                바이브 코딩을 시작하세요
              </h3>
              <p className="text-xs text-muted-foreground max-w-xs">
                AI 어시스턴트와 대화하며 코드를 작성하고 개발하세요
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                data-testid={`message-${message.id}`}
              >
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarFallback
                    className={
                      message.role === "assistant"
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground"
                    }
                  >
                    {message.role === "assistant" ? (
                      <Bot className="w-4 h-4" />
                    ) : (
                      <User className="w-4 h-4" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div
                    className={
                      message.role === "assistant"
                        ? ""
                        : "rounded-md p-3 bg-primary/10 border border-primary/20"
                    }
                  >
                    <p className={`text-sm text-foreground whitespace-pre-wrap ${message.role === "assistant" ? "" : ""}`}>
                      {message.content}
                    </p>
                    {message.role === "user" && (
                      <span className="text-xs text-muted-foreground mt-2 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                  {message.role === "assistant" && (
                    <span className="text-xs text-muted-foreground mt-1 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      <div className="border-t border-border p-2">
        <form onSubmit={handleSubmit} className="relative flex items-end gap-2 bg-background border border-primary/30 focus-within:border-primary/50 rounded-md px-2.5 py-2">
          <div className="flex items-center gap-1 pb-1">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-5 w-5 hover-elevate"
              data-testid="button-code"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </Button>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-5 w-5 hover-elevate"
              data-testid="button-attach"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
            </Button>
          </div>
          
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Make, test, iterate..."
            rows={2}
            className="flex-1 bg-transparent border-0 outline-none text-sm placeholder:text-muted-foreground resize-none overflow-hidden max-h-32 leading-relaxed py-1"
            style={{ minHeight: '40px' }}
            data-testid="input-chat-message"
          />
          
          <div className="flex items-center gap-1 pb-1">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              className="h-5 w-5 hover-elevate"
              data-testid="button-magic"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
            </Button>
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim()}
              className="h-5 w-5"
              data-testid="button-send-message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 3 3 9-3 9 19-9Z"/><path d="M6 12h16"/></svg>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
