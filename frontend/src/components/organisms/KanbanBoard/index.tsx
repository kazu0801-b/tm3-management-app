import { Task } from "@/types/task";
import { KanbanColumn } from "../KanbanColumn";

type Props = {
  tasks: Task[];
  onDelete: (id: number) => void;
};

export const KanbanBoard = ({ tasks, onDelete }: Props) => {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <KanbanColumn
        title="未対応"
        status="todo"
        tasks={tasks}
        onDelete={onDelete}
      />
      <KanbanColumn
        title="対応中"
        status="doing"
        tasks={tasks}
        onDelete={onDelete}
      />
      <KanbanColumn
        title="確認中"
        status="review"
        tasks={tasks}
        onDelete={onDelete}
      />
      <KanbanColumn
        title="対応済み"
        status="done"
        tasks={tasks}
        onDelete={onDelete}
      />
    </div>
  );
};
