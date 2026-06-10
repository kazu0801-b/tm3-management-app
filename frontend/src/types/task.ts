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
    id: string;
    projectId: string;
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

export type TaskListItem = {
    id: string;
    projectId: string;
    title: string;
    description?: string;
    statusId: number;
    assigneeName: string;
    startDate?: string;
    dueDate: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string; 
};

export type CreateTaskRequest = {
    projectId: string;
    title: string;
    description?: string;
    statusId?: string;
    startDate: string;
    dueDate: string; 
};