interface KPI { 
  name: string; 
  value: string | number; 
}
interface Props { 
  data: KPI[]; 
}

export default function KPIBoard({ data }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {data.map((kpi, idx) => (
        <div key={idx} className="p-4 bg-white rounded-xl shadow border border-gray-100">
          <div className="text-xs text-gray-500">{kpi.name}</div>
          <div className="text-2xl font-extrabold mt-1">{kpi.value}</div>
        </div>
      ))}
    </div>
  );
}