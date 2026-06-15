"use client";

import { AppLayout } from "@/components/templates/AppLayout";
import { useParams } from "next/navigation";
import { mockTasks } from "@/data/mockTasks";

const TaskDetailPage = () => {
  const params = useParams();

  const taskId = params.id;

  const task = mockTasks.find(
    (task) => task.id.toString() === taskId
  );

  if(!task) {
    return (
      <AppLayout>
        <h1>タスクが見つかりません</h1>
      </AppLayout>
    );
  }

  const getStatusLabel = (status: string) => {
    if(status === "todo") return "未対応";
    if(status === "doing") return "対応中";
    if(status === "review") return "確認中";
    if(status === "done") return "対応済み";

    return status;
  };

  const getStatusBadgeClass = (status: string) => {
    if(status === "todo") return "bg-zinc-100 text-zinc-700";
    if(status === "doing") return "bg-blue-100 text-blue-700";
    if(status === "review") return "bg-yellow-100 text-yellow-700";
    if(status === "done") return "bg-green-100 text-green-700";

    return "bg-zinc-100 text-zinc-700";
  };

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold">タスク詳細</h1>

      <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-zinc-500">タスクID</p>
        <p className="mt-1 text-xl font-bold">{task.title}</p>

        <div className="mt-4 space-y-2">
          <p>担当者: {task.assignee}</p>
          <div className="flex items-center gap-2">
            <span className="text-zinc-500">ステータス</span>
            <span
             className={`rounded-full px-3 py-1 text-sm font-bold ${getStatusBadgeClass(task.status)}`}
             >
              {getStatusLabel(task.status)}
             </span>
          </div>
          <p>開始日: {task.startDate}</p>
          <p>期限日: {task.dueDate}</p>
        </div>
      </div>
    </AppLayout>
  );
};

export default TaskDetailPage;