import { useEffect, useRef } from 'react';
import { Editor } from '@monaco-editor/react';
import { motion } from 'framer-motion';

interface Props {
  value: string;
  language: string;
  onChange: (value: string) => void;
  onRunCode?: () => void;
}

export default function CodeEditor({ value, language, onChange, onRunCode }: Props) {
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // 키보드 단축키 추가
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      onRunCode?.();
    });
    
    // Configure Monaco theme
    monaco.editor.defineTheme('flashetherea-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'keyword', foreground: '569CD6' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'type', foreground: '4EC9B0' },
        { token: 'function', foreground: 'DCDCAA' },
      ],
      colors: {
        'editor.background': '#1F2937',
        'editor.foreground': '#F3F4F6',
        'editorLineNumber.foreground': '#6B7280',
        'editorLineNumber.activeForeground': '#F3F4F6',
        'editor.selectionBackground': '#374151',
        'editor.inactiveSelectionBackground': '#374151',
        'editorCursor.foreground': '#38BDF8',
        'editor.findMatchBackground': '#38BDF8',
        'editor.findMatchHighlightBackground': '#1E40AF',
        'editorSuggestWidget.background': '#1F2937',
        'editorSuggestWidget.border': '#374151',
      }
    });
    
    monaco.editor.setTheme('flashetherea-dark');
  };

  return (
    <motion.div 
      className="h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <Editor
        value={value}
        language={language}
        onChange={(val) => onChange(val || '')}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          lineHeight: 20,
          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          insertSpaces: true,
          wordWrap: 'on',
          lineNumbers: 'on',
          renderLineHighlight: 'all',
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false,
          cursorStyle: 'line',
          automaticLayout: true,
          glyphMargin: true,
          folding: true,
          showFoldingControls: 'always',
          bracketPairColorization: {
            enabled: true
          },
          guides: {
            bracketPairs: true,
            indentation: true
          }
        }}
      />
    </motion.div>
  );
}