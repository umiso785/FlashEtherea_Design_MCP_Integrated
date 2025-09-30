import { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";

// Import workers
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

// Configure Monaco Environment
self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function CodeEditor({ value, onChange }: Props) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const monacoRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      monacoRef.current = monaco.editor.create(editorRef.current, {
        value,
        language: "javascript",
        theme: "vs-dark",
        automaticLayout: true,
      });

      monacoRef.current.onDidChangeModelContent(() => {
        onChange(monacoRef.current!.getValue());
      });
    }

    return () => {
      monacoRef.current?.dispose();
    };
  }, []);

  return <div ref={editorRef} style={{ height: "500px" }} />;
}