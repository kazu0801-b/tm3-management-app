import { Task, TaskStatus } from "@/types/task";
import { TaskCard } from "../TaskCard";

type Props = {
    title: string;
    status: TaskStatus;
    tasks: Task[];
};

export const KanbanColumn = ({
    title,
    status,
    tasks,
}: Props) => {
    const filteredTasks = tasks.filter(
        (tasks) => tasks.status === status
    );

    return (
        <section className="rounded-lg bg-gray-50 p-4">
            <h2 className="font-bold">
                {title}({filteredTasks.length})
            </h2>

            <div>
                {filteredTasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                    />
                ))}
            </div>
        </section>
    );
};