import { useState, useEffect } from "react";

export function useKPI() {
  const [kpi, setKpi] = useState<{ name: string; value: string | number }[]>([]);

  useEffect(() => {
    // TODO: MCP API 연결 후 교체
    setKpi([
      { name: "ROI", value: "2.3" },
      { name: "CTR", value: "9.1%" },
    ]);
  }, []);

  return kpi;
}