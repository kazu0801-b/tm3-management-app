import { StatusBadge } from "@/components/atoms/StatusBadge";
import { Task } from "@/types/task";
import Link from "next/link";

type Props = {
  task: Task;
  onDelete: (id: number) => void;
};
export const TaskCard = ({ task, onDelete }: Props) => {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <h2 className="text-lg font-bold">{task.title}</h2>

      <p className="mt-2 text-sm text-zinc-600">担当者: {task.assignee}</p>

      <div className="mt-2">
        <StatusBadge status={task.status} />
      </div>

      <p>
        期間: {task.startDate} ~ {task.dueDate}
      </p>

      <div className="mt-4 gap-2">
        <Link
          href={`/tasks/${task.id}`}
          className="rounded bg-blue-600 px-3 py-1 text-sm font-bold text-white hover:bg-blue-700"
        >
          詳細
        </Link>

        <button
          type="button"
          className="mt-4 rounded bg-red-500 px-3 py-1 text-white"
          onClick={() => onDelete(task.id)}
        >
          削除
        </button>
      </div>
    </div>
  );
};
