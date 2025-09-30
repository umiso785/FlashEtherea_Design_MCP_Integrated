import { Editor } from "@monaco-editor/react";

interface CodeEditorProps {
  value?: string;
  language?: string;
  onChange?: (value: string | undefined) => void;
  fileName?: string;
}

export default function CodeEditor({
  value = "",
  language = "javascript",
  onChange,
  fileName = "index.js",
}: CodeEditorProps) {
  return (
    <div className="h-full flex flex-col bg-background">
      <div className="h-10 border-b border-border flex items-center px-4 gap-2">
        <span className="text-sm text-foreground">{fileName}</span>
      </div>
      <div className="flex-1" data-testid="code-editor">
        <Editor
          height="100%"
          defaultLanguage={language}
          value={value}
          onChange={onChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "JetBrains Mono, monospace",
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
          }}
        />
      </div>
    </div>
  );
}
