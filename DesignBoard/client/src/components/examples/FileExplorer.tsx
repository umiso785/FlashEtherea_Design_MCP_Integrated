import { useState } from "react";
import FileExplorer from "../FileExplorer";

export default function FileExplorerExample() {
  const [selectedFileId, setSelectedFileId] = useState("index.js");

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

  return (
    <div className="h-screen">
      <FileExplorer
        files={mockFiles}
        selectedFileId={selectedFileId}
        onFileClick={(file) => {
          console.log("File clicked:", file.name);
          setSelectedFileId(file.id);
        }}
      />
    </div>
  );
}
