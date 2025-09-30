import { Plus, Search, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TopNavProps {
  projectName?: string;
  tabs?: Array<{ id: string; name: string; active: boolean }>;
  onTabClick?: (id: string) => void;
  onTabClose?: (id: string) => void;
  onPublish?: () => void;
}

export default function TopNav({
  projectName = "FlashEtherea_Design_환경오류",
  tabs = [],
  onTabClick,
  onTabClose,
  onPublish,
}: TopNavProps) {
  return (
    <div className="h-12 bg-background border-b border-border flex items-center px-4 gap-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-primary rounded-sm" />
          <span className="text-sm font-medium text-foreground">{projectName}</span>
        </div>
      </div>

      <div className="flex-1 flex items-center gap-1 overflow-x-auto">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`
              group flex items-center gap-2 px-3 h-9 rounded-md cursor-pointer transition-colors
              ${tab.active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover-elevate"}
            `}
            onClick={() => onTabClick?.(tab.id)}
            data-testid={`tab-${tab.id}`}
          >
            <span className="text-sm whitespace-nowrap">{tab.name}</span>
            <button
              className="opacity-0 group-hover:opacity-100 hover:bg-white/10 rounded p-0.5 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                onTabClose?.(tab.id);
              }}
              data-testid={`button-close-tab-${tab.id}`}
            >
              <Plus className="w-3 h-3 rotate-45" />
            </button>
          </div>
        ))}
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          onClick={() => console.log("Add tab")}
          data-testid="button-add-tab"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="w-48 h-9 pl-8 bg-accent/50 border-0"
            data-testid="input-search"
          />
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          data-testid="button-settings"
        >
          <Settings className="w-4 h-4" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className="h-8 w-8"
          data-testid="button-user"
        >
          <User className="w-4 h-4" />
        </Button>
        <Button
          variant="default"
          className="h-9 bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => {
            console.log("Publish clicked");
            onPublish?.();
          }}
          data-testid="button-publish"
        >
          Publish
        </Button>
      </div>
    </div>
  );
}
