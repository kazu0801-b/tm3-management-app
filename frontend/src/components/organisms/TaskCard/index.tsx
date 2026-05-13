import { Task } from "@/types/task";

type Props = {
    task: Task;
};
export const TaskCard = ({task}: Props) => {
    return (
        <div className="rounded-lg border p-4 shadow-sm">
            <h2 className="text-lg font-bold">{task.title}</h2>

            <p className="mt-2">ステータス: {task.status}</p>
            <p>
                期間: {task.startDate} ~ {task.dueDate}
            </p>
        </div>
    );
};