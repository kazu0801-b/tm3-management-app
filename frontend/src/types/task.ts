export type TaskStatus = "todo" | "doing" | "review" | "done";

export type Task = {
    id: number;
    title: string;
    assignee: string;
    status: TaskStatus;
    startDate: string;
    dueDate: string;
};