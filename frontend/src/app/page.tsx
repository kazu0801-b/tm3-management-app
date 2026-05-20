"use client";

import { ErrorMessage } from "@/components/atoms/ErrorMessage";
import { KanbanBoard } from "@/components/organisms/KanbanBoard";
import { TaskForm } from "@/components/organisms/TaskForm";
import { TaskList } from "@/components/organisms/TaskList";
import { AppLayout } from "@/components/templates/AppLayout";
import { mockTasks } from "@/data/mockTasks";
import { Task } from "@/types/task";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchKeyword, setSearchKeyWord ] = useState("");

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

  const filteredTasks = tasks.filter((task)=>
    task.title.includes(searchKeyword)
  );

  return (
    <AppLayout >
      <section>
        <h2 className="text-2xl font-bold">タスク作成</h2>

        <div className="mt-4">
          <ErrorMessage message="タスク名と担当者を入力してください" />
        </div>

        <div className="mt-4">
          <TaskForm onSubmit={handleAddTask} />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">タスク一覧</h2>

        <div className="mt-4">
          <input 
            type="text"
            placeholder="タスクを検索"
            value={searchKeyword}
            onChange={(event) =>  
              setSearchKeyWord(event.target.value)
            }
            className="w-full rounded-lg border px-4 py-2"
            />
        </div>

        <div className="mt-4">
          <TaskList
          tasks={filteredTasks}
          onDelete={handleDeleteTask} />
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
  </AppLayout>
  );
}