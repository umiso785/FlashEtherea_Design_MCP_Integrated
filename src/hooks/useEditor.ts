import { useEffect } from "react";
import { editorStore } from "../store/editor.store";

// 코드 자동 저장 + 추후 AI Assist 삽입 가능
export function useEditorAutoSave() {
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.setItem("editor_code", editorStore.code);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
}