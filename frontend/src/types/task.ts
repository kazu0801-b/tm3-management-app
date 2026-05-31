export type TaskStatus = "todo" | "doing" | "review" | "done";

export type Task = {
    id: number;
    title: string;
    assignee: string;
    status: TaskStatus;
    startDate: string;
    dueDate: string;
};

export type DirectusTask = {
    id: number;
    projectId: number;
    title: string;
    description?: string;
    statusId: number;
    assigneeId: string;
    startDate?: string;
    dueDate: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;

} 