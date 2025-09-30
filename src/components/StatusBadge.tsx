type Status = "healthy" | "warning" | "error";

interface Props {
  status: Status;
}

export default function StatusBadge({ status }: Props) {
  const colors = {
    healthy: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
  };

  return (
    <span className={`px-2 py-1 rounded text-white ${colors[status]}`}>
      {status.toUpperCase()}
    </span>
  );
}