import TopNav from "../TopNav";

export default function TopNavExample() {
  const tabs = [
    { id: "preview", name: "Preview", active: true },
    { id: "console", name: "Console", active: false },
    { id: "contracts", name: "API_Contracts.md", active: false },
  ];

  return (
    <TopNav
      projectName="FlashEtherea_Design_환경오류"
      tabs={tabs}
      onTabClick={(id) => console.log("Tab clicked:", id)}
      onTabClose={(id) => console.log("Tab closed:", id)}
      onPublish={() => console.log("Publish clicked")}
    />
  );
}
