import { Task } from "@/types/task";
import { TaskCard } from "../TaskCard";

type Props = {
    tasks: Task[];
    onDelete: (id: number) => void;
};

export const TaskList = ({ tasks, onDelete}: Props) => {
    return (
        <div className="grid gap-4">
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} onDelete={onDelete} />
            ))}
        </div>
    );
}