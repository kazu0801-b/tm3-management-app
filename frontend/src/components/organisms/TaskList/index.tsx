import { Task } from "@/types/task";
import { TaskCard } from "../TaskCard";

type Props = {
    tasks: Task[];
};

export const TaskList = ({tasks}: Props) => {
    return (
        <div className="grid gap-4">
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
}