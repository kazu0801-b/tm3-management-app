import { StatusBadge } from "@/components/atoms/StatusBadge";
import { Task } from "@/types/task";

type Props = {
    task: Task;
};
export const TaskCard = ({task}: Props) => {
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
        </div>
    );
};