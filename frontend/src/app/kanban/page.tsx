"use client";

import { KanbanBoard } from "@/components/organisms/KanbanBoard";
import { Navigation } from "@/components/organisms/Navigation";
import { AppLayout } from "@/components/templates/AppLayout";
import { mockTasks } from "@/data/mockTasks";
import { Task } from "@/types/task";
import { useEffect, useState } from "react";

export default function KanbanPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const handleDelete = (id: number) => {
    const isConfirm = window.confirm("このタスクを削除しますか？");

    if (!isConfirm) return;

    const updatedTasks = tasks.filter((task) => task.id !== id);

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold">カンバン</h1>
      <Navigation />

      <p className="mt-2 text-gray-600">
        ステータスごとにタスクを確認できます。
      </p>

      <div className="mt-8">
        <KanbanBoard tasks={tasks} onDelete={handleDelete} />
      </div>
    </AppLayout>
  );
}
