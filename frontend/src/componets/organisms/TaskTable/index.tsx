import { StatusBadge } from "@/components/atoms/StatusBadge";
import { Task } from "@/types/task";

type Props = {
    tasks: Task[];
};

export const TaskTable = ({tasks}: Props) => {
    return (
        <div className="overflow-hidden rounded-xl border">
            <table className="w-full border-collapse bg-white">
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
                            <td className="px-4 py-4 text-sm text-zinc-500">
                                No.{task.id}
                            </td>
                            <td>
                                {task.title}
                            </td>
                            <td>
                                <StatusBadge status={task.status} />
                            </td>
                            <td>
                                {task.assignee}
                            </td>
                            <td className="px-4 py-4">
                                {task.dueDate}
                            </td>
                            <td className="px-4 py-4">
                                <button className="rounded border px-3 py-1 text-sm">
                                    詳細
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};