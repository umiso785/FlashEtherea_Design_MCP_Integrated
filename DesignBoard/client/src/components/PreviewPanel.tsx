import { useState } from "react";
import { ExternalLink, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PreviewPanelProps {
  tabs?: Array<{ id: string; name: string }>;
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  content?: React.ReactNode;
}

export default function PreviewPanel({
  tabs = [],
  activeTab,
  onTabChange,
  content,
}: PreviewPanelProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    console.log("Refresh preview");
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  return (
    <div className="h-full flex flex-col bg-background border-l border-border">
      <div className="h-10 border-b border-border flex items-center px-2 gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`
              px-3 h-8 text-sm rounded-md transition-colors
              ${
                activeTab === tab.id
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover-elevate"
              }
            `}
            onClick={() => onTabChange?.(tab.id)}
            data-testid={`tab-preview-${tab.id}`}
          >
            {tab.name}
          </button>
        ))}
        <div className="flex-1" />
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          onClick={handleRefresh}
          data-testid="button-refresh-preview"
        >
          <RefreshCw
            className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
          />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          data-testid="button-open-preview"
        >
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4">
          {content || (
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <p className="text-sm">Preview will appear here</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
