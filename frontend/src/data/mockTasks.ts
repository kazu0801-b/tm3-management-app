import { Task } from "@/types/task";

export const mockTasks : Task[] = [
    {
        id: 1,
        title: "ログイン画面作成",
        assignee: "田邊",
        status: "doing",
        startDate: "2026-05-13",
        dueDate: "2026-05-15",
    },
    {
        id: 2,
        title: "TaskCard作成",
        assignee: "宮原",
        status: "review",
        startDate: "2026-05-14",
        dueDate: "2026-05-14",
    },
    {
        id: 3,
        title: "API接続",
        assignee: "森川",
        status: "todo",
        startDate: "2026-05-15",
        dueDate: "2026-05-20",
    },
    {
        id: 4,
        title: "ステータス表示調整",
        assignee: "サイコパス坂東",
        status: "done",
        startDate: "2026-05-10",
        dueDate: "2026-05-12",
    },
];