import { useState } from "react";
import { ChevronRight, ChevronDown, Folder, File, Search, FilePlus, FolderPlus, MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
}

interface FileExplorerProps {
  files?: FileNode[];
  onFileClick?: (file: FileNode) => void;
  selectedFileId?: string;
  onToggleVisibility?: () => void;
}

export default function FileExplorer({
  files = [],
  onFileClick,
  selectedFileId,
  onToggleVisibility,
}: FileExplorerProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["root"])
  );
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const renderNode = (node: FileNode, depth: number = 0) => {
    const isExpanded = expandedFolders.has(node.id);
    const isSelected = selectedFileId === node.id;

    if (node.type === "folder") {
      return (
        <div key={node.id}>
          <div
            className={`
              group flex items-center gap-2 px-2 py-1 cursor-pointer hover-elevate rounded-sm
              ${isSelected ? "bg-primary/10 text-primary" : "text-foreground"}
            `}
            style={{ paddingLeft: `${depth * 12 + 8}px` }}
            onClick={() => toggleFolder(node.id)}
            data-testid={`folder-${node.id}`}
          >
            {isExpanded ? (
              <ChevronDown className="w-3.5 h-3.5 flex-shrink-0 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-muted-foreground" />
            )}
            <Folder className="w-4 h-4 flex-shrink-0 text-muted-foreground" />
            <span className="text-xs truncate flex-1">{node.name}</span>
            <MoreVertical className="w-3.5 h-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100 text-muted-foreground" />
          </div>
          {isExpanded && node.children && (
            <div>
              {node.children.map((child) => renderNode(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    const getFileIcon = (fileName: string) => {
      if (fileName.endsWith(".js") || fileName.endsWith(".jsx")) {
        return <span className="w-4 h-4 flex-shrink-0 text-yellow-500 text-xs font-bold">JS</span>;
      }
      if (fileName.endsWith(".ts") || fileName.endsWith(".tsx")) {
        return <span className="w-4 h-4 flex-shrink-0 text-blue-500 text-xs font-bold">TS</span>;
      }
      if (fileName.endsWith(".json")) {
        return <span className="w-4 h-4 flex-shrink-0 text-yellow-600 text-xs font-bold">{ }</span>;
      }
      if (fileName.endsWith(".css")) {
        return <span className="w-4 h-4 flex-shrink-0 text-blue-400 text-xs font-bold">#</span>;
      }
      if (fileName.endsWith(".md")) {
        return <span className="w-4 h-4 flex-shrink-0 text-gray-400 text-xs font-bold">M</span>;
      }
      return <File className="w-4 h-4 flex-shrink-0 text-muted-foreground" />;
    };

    return (
      <div
        key={node.id}
        className={`
          group flex items-center gap-2 px-2 py-1 cursor-pointer hover-elevate rounded-sm
          ${isSelected ? "bg-primary/10 text-primary" : "text-foreground"}
        `}
        style={{ paddingLeft: `${depth * 12 + 28}px` }}
        onClick={() => onFileClick?.(node)}
        data-testid={`file-${node.id}`}
      >
        {getFileIcon(node.name)}
        <span className="text-xs truncate flex-1">{node.name}</span>
        <MoreVertical className="w-3.5 h-3.5 flex-shrink-0 opacity-0 group-hover:opacity-100 text-muted-foreground" />
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-background border-l border-border">
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground">Files</h2>
          <div className="flex items-center gap-1">
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7"
              onClick={() => console.log("New file")}
              data-testid="button-new-file"
            >
              <FilePlus className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7"
              onClick={() => console.log("New folder")}
              data-testid="button-new-folder"
            >
              <FolderPlus className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7"
              onClick={onToggleVisibility}
              data-testid="button-hide-file-explorer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H9m0-18v18"/></svg>
            </Button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 pl-8 text-xs bg-accent/50 border-0"
            data-testid="input-file-search"
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {files.map((node) => renderNode(node, 0))}
        </div>
      </ScrollArea>
    </div>
  );
}
