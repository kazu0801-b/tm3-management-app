"use client";
import { KanbanBoard } from "@/components/organisms/KanbanBoard";
import { TaskForm } from "@/components/organisms/TaskForm";
import { TaskList } from "@/components/organisms/TaskList";
import { mockTasks } from "@/data/mockTasks";
import { Task } from "@/types/task";
import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  return(
    <main className="p-8">
      <section className="mt-8">
        <h2 className="text-2xl font-bold">タスク作成</h2>

        <div>
          <TaskForm />
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-bold">タスク一覧</h2>
        
        
        <div className="mt-4">
          <TaskList tasks={tasks} />
          <KanbanBoard tasks={tasks} />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold">カンバン</h2>
        <div className="mt-4">
          <KanbanBoard tasks={tasks} />
        </div>
      </section>
    </main>
  );
}