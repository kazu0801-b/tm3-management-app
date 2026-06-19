import { TaskStatus } from "@/types/task";
import { fulfillRouteCacheEntry } from "next/dist/client/components/segment-cache/cache";

type Props = {
  status: TaskStatus;
};

export const StatusBadge = ({ status }: Props) => {
  const statusMap = {
    todo: "bg-gray-200 text-gray-800",
    doing: "bg-blue-200 text-blue-800",
    review: "bg-yellow-200 text-yellow-800",
    done: "bg-green-200 text-green-800",
  };

  return (
    <span
      className={`
            rounded-full
            px-3
            py-1
            text-sm
            font-bold
            ${statusMap[status]}`}
    >
      {status}
    </span>
  );
};
