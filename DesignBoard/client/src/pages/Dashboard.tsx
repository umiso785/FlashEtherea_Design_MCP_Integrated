import { useState } from "react";
import TopNav from "@/components/TopNav";
import ChatPanel from "@/components/ChatPanel";
import FileExplorer from "@/components/FileExplorer";
import CodeEditor from "@/components/CodeEditor";
import Terminal from "@/components/Terminal";
import { Button } from "@/components/ui/button";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

export default function Dashboard() {
  const [selectedFile, setSelectedFile] = useState("index.js");
  const [activeTab, setActiveTab] = useState("preview");
  const [isFileExplorerVisible, setIsFileExplorerVisible] = useState(true);
  const [code, setCode] = useState(`function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet("World");
`);
  const [terminalLogs, setTerminalLogs] = useState<Array<{ type: "info" | "error" | "success" | "command"; text: string }>>([
    { type: "info" as const, text: "$ npm run dev" },
    { type: "info" as const, text: "Starting development server..." },
    { type: "success" as const, text: "Server running on http://localhost:5000" },
    { type: "info" as const, text: "Watching for file changes..." },
  ]);
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; role: "user" | "assistant"; content: string; timestamp: Date }>>([
    {
      id: "1",
      role: "assistant" as const,
      content: "안녕하세요! 무엇을 도와드릴까요?",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);

  const topNavTabs = [
    { id: "preview", name: "Preview", active: activeTab === "preview" },
    { id: "console", name: "Console", active: activeTab === "console" },
    { id: "contracts", name: "API_Contracts.md", active: activeTab === "contracts" },
  ];

  const mockFiles = [
    {
      id: ".git",
      name: ".git",
      type: "folder" as const,
      children: [],
    },
    {
      id: "api",
      name: "api",
      type: "folder" as const,
      children: [],
    },
    {
      id: "attached_assets",
      name: "attached_assets",
      type: "folder" as const,
      children: [],
    },
    {
      id: "backend",
      name: "backend",
      type: "folder" as const,
      children: [],
    },
    {
      id: "docs",
      name: "docs",
      type: "folder" as const,
      children: [],
    },
    {
      id: "frontend",
      name: "frontend",
      type: "folder" as const,
      children: [
        { id: "index.js", name: "index.js", type: "file" as const },
        { id: "app.js", name: "app.js", type: "file" as const },
        { id: "styles.css", name: "styles.css", type: "file" as const },
      ],
    },
    {
      id: "project",
      name: "project",
      type: "folder" as const,
      children: [],
    },
    {
      id: ".gitignore",
      name: ".gitignore",
      type: "file" as const,
    },
    {
      id: "eslint.config.js",
      name: "eslint.config.js",
      type: "file" as const,
    },
    {
      id: "README.md",
      name: "README.md",
      type: "file" as const,
    },
  ];

  const handleCommand = (command: string) => {
    setTerminalLogs([
      ...terminalLogs,
      { type: "command" as const, text: `$ ${command}` },
      { type: "info" as const, text: `Executing: ${command}` },
    ]);
  };

  const handleSendMessage = (message: string) => {
    const newMessage = {
      id: String(chatMessages.length + 1),
      role: "user" as const,
      content: message,
      timestamp: new Date(),
    };
    setChatMessages([...chatMessages, newMessage]);

    setTimeout(() => {
      const aiResponse = {
        id: String(chatMessages.length + 2),
        role: "assistant" as const,
        content: "메시지를 받았습니다: " + message,
        timestamp: new Date(),
      };
      setChatMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <TopNav
        projectName="FlashEtherea_Design_환경오류"
        tabs={topNavTabs}
        onTabClick={(id) => {
          console.log("Top nav tab clicked:", id);
          setActiveTab(id);
        }}
        onTabClose={(id) => console.log("Tab closed:", id)}
        onPublish={() => console.log("Publish clicked")}
      />

      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={15} minSize={10} maxSize={40}>
          <ChatPanel messages={chatMessages} onSendMessage={handleSendMessage} />
        </ResizablePanel>

        <ResizableHandle className="w-px bg-border/60 hover:bg-primary/30 transition-colors" />

        <ResizablePanel defaultSize={isFileExplorerVisible ? 70 : 85} minSize={30}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={70} minSize={40}>
              <CodeEditor
                value={code}
                language="javascript"
                fileName={selectedFile}
                onChange={(value) => {
                  console.log("Code changed");
                  setCode(value || "");
                }}
              />
            </ResizablePanel>

            <ResizableHandle className="h-px bg-border/60 hover:bg-primary/30 transition-colors" />

            <ResizablePanel defaultSize={30} minSize={10} maxSize={50}>
              <Terminal logs={terminalLogs} onCommand={handleCommand} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>

        {isFileExplorerVisible && (
          <>
            <ResizableHandle className="w-px bg-border/60 hover:bg-primary/30 transition-colors" />

            <ResizablePanel defaultSize={15} minSize={10} maxSize={40}>
              <FileExplorer
                files={mockFiles}
                selectedFileId={selectedFile}
                onFileClick={(file) => {
                  console.log("File clicked:", file.name);
                  setSelectedFile(file.id);
                }}
                onToggleVisibility={() => setIsFileExplorerVisible(false)}
              />
            </ResizablePanel>
          </>
        )}
        
        {!isFileExplorerVisible && (
          <div className="w-10 border-l border-border bg-background flex items-start justify-center pt-3">
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7"
              onClick={() => setIsFileExplorerVisible(true)}
              data-testid="button-show-file-explorer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
            </Button>
          </div>
        )}
      </ResizablePanelGroup>
    </div>
  );
}
