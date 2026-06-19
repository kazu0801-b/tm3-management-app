import { StatusBadge } from "@/components/atoms/StatusBadge";
import { Task } from "@/types/task";
import Link from "next/link";

type Props = {
  tasks: Task[];
};

export const TaskTable = ({ tasks }: Props) => {
  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <table className="w-full border-collapse">
        <thead className="bg-zinc-50">
          <tr className="text-left text-sm text-zinc-500">
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">タスク名</th>
            <th className="px-4 py-3">ステータス</th>
            <th className="px-4 py-3">担当者</th>
            <th className="px-4 py-3">期限</th>
            <th className="px-4 py-3">操作</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-t">
              <td className="px-4 py-4 text-sm text-zinc-500">No.{task.id}</td>

              <td className="px-4 py-4 font-bold">{task.title}</td>

              <td className="px-4 py-4">
                <StatusBadge status={task.status} />
              </td>

              <td className="px-4 py-4">{task.assignee}</td>

              <td className="px-4 py-4">{task.dueDate}</td>

              <td className="px-4 py-4">
                <Link
                  href={`/tasks/${task.id}`}
                  className="inline-block rounded bg-blue-600 px-3 py-1 text-sm font-bold text-white hover:bg-blue-700"
                >
                  詳細
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
