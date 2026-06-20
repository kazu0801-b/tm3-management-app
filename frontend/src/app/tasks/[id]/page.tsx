"use client";

import { AppLayout } from "@/components/templates/AppLayout";
import { useParams } from "next/navigation";
import { mockTasks } from "@/data/mockTasks";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Task } from "@/types/task";

const TaskDetailPage = () => {
  const params = useParams();

  const taskId = params.id;

  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    setIsLoaded(true);
  }, []);

  const task = tasks.find((task) => task.id.toString() === taskId);

  if (!isLoaded) {
    return (
      <AppLayout>
        <p>読み込み中...</p>
      </AppLayout>
    );
  }

  const getStatusLabel = (status: string) => {
    if (status === "todo") return "未対応";
    if (status === "doing") return "対応中";
    if (status === "review") return "確認中";
    if (status === "done") return "対応済み";

    return status;
  };

  const getStatusBadgeClass = (status: string) => {
    if (status === "todo") return "bg-zinc-100 text-zinc-700";
    if (status === "doing") return "bg-blue-100 text-blue-700";
    if (status === "review") return "bg-yellow-100 text-yellow-700";
    if (status === "done") return "bg-green-100 text-green-700";

    return "bg-zinc-100 text-zinc-700";
  };

  if (!task) {
    return (
      <AppLayout>
        <h1>タスクが見つかりません</h1>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Link
        href="/"
        className="mb-4 inline-block text-blue-600 hover:underline"
      >
        一覧へ戻る
      </Link>
      <div>
        <h1 className="text-3xl font-bold">タスク詳細</h1>

        <Link
          href={`/tasks/${task.id}/edit`}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-clue-700"
        >
          編集
        </Link>
      </div>

      <div className="mt-6 rounded-xl border bg-white p-6 shadow-sm">
        <p className="text-sm text-zinc-500">タスク名</p>
        <p className="mt-1 text-xl font-bold">{task.title}</p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <p className="text-sm text-zinc-500">担当者</p>
            <p className="mt-1 font-bold">{task.assignee}</p>
          </div>

          <div>
            <p className="text-sm text-zinc-500">ステータス</p>
            <span
              className={`mt-1 inline-block rounded-full px-3 py-1 text-sm font-bold ${getStatusBadgeClass(task.status)}`}
            >
              {getStatusLabel(task.status)}
            </span>
          </div>

          <div>
            <p className="text-sm text-zinc-500">開始日</p>
            <p className="mt-1 font-bold">{task.startDate}</p>
          </div>

          <div>
            <p className="text-sm text-zinc-500">期限日</p>
            <p className="mt-1 font-bold">{task.dueDate}</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default TaskDetailPage;
