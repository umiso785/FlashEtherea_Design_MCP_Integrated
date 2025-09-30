import { useState } from "react";
import PreviewPanel from "../PreviewPanel";

export default function PreviewPanelExample() {
  const [activeTab, setActiveTab] = useState("preview");

  const tabs = [
    { id: "preview", name: "Preview" },
    { id: "console", name: "Console" },
    { id: "output", name: "Output" },
  ];

  return (
    <div className="h-screen">
      <PreviewPanel
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(id) => {
          console.log("Tab changed to:", id);
          setActiveTab(id);
        }}
        content={
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Preview Content</h2>
            <p className="text-muted-foreground">
              This is where your application preview would appear.
            </p>
          </div>
        }
      />
    </div>
  );
}
