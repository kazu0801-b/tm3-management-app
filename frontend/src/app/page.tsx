"use client";

import { KanbanBoard } from "@/components/organisms/KanbanBoard";
import { TaskForm } from "@/components/organisms/TaskForm";
import { TaskList } from "@/components/organisms/TaskList";
import { mockTasks } from "@/data/mockTasks";
import { Task } from "@/types/task";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks, isLoaded]);

  const handleAddTask = (newTask: Task) => {
    setTasks((previousTasks) => [
      newTask,
      ...previousTasks,
    ]);
  };

  const handleDeleteTask = (id: number) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  };

  return (
    <main className="p-8">
      <section className="mt-8">
        <h2 className="text-2xl font-bold">タスク作成</h2>

        <div className="mt-4">
          <TaskForm onSubmit={handleAddTask} />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">タスク一覧</h2>

        <div className="mt-4">
          <TaskList
            tasks={tasks}
            onDelete={handleDeleteTask}
          />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">カンバン</h2>

        <div className="mt-4">
          <KanbanBoard tasks={tasks} />
        </div>
      </section>
    </main>
  );
}