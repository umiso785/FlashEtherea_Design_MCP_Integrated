import { makeAutoObservable } from "mobx";

export class EditorStore {
  code = "// 코드를 작성하세요";
  history: string[] = [];
  future: string[] = [];
  logs: { ts: string; msg: string }[] = [];

  constructor() { makeAutoObservable(this); }

  setCode(newCode: string) {
    this.history.push(this.code);
    this.code = newCode;
    this.future = [];
  }

  undo() {
    if (this.history.length > 0) {
      const prev = this.history.pop()!;
      this.future.push(this.code);
      this.code = prev;
    }
  }

  redo() {
    if (this.future.length > 0) {
      const next = this.future.pop()!;
      this.history.push(this.code);
      this.code = next;
    }
  }

  addLog(message: string) {
    this.logs.push({
      ts: new Date().toLocaleTimeString(),
      msg: message,
    });
  }

  clearLogs() {
    this.logs = [];
  }
}
export const editorStore = new EditorStore();