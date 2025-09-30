import { useState } from "react";
import CodeEditor from "../CodeEditor";

export default function CodeEditorExample() {
  const [code, setCode] = useState(`function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet("World");
`);

  return (
    <div className="h-screen">
      <CodeEditor
        value={code}
        language="javascript"
        fileName="index.js"
        onChange={(value) => {
          console.log("Code changed");
          setCode(value || "");
        }}
      />
    </div>
  );
}
