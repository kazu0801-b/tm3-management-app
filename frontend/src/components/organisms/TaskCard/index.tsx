import { StatusBadge } from "@/components/atoms/StatusBadge";
import { Task } from "@/types/task";

type Props = {
    task: Task;
    onDelete: (id: number) => void;
};
export const TaskCard = ({
    task,
    onDelete,
}: Props) => {
    return (
        <div className="rounded-lg border p-4 shadow-sm">
            <h2 className="text-lg font-bold">{task.title}</h2>
            <p className="mt-2">
                担当者: {task.assignee}
            </p>
            <div className="mt-2">
                <StatusBadge status={task.status}/>
            </div>
            <p>
                期間: {task.startDate} ~ {task.dueDate}
            </p>
            <button className="mt-4 rounded bg-red-500 px-3 py-1 text-white" onClick={() => onDelete(task.id)}>削除</button>
        </div>
    );
};