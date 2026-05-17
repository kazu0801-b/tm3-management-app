"use client";
import { KanbanBoard } from "@/components/organisms/KanbanBoard";
import { TaskForm } from "@/components/organisms/TaskForm";
import { TaskList } from "@/components/organisms/TaskList";
import { mockTasks } from "@/data/mockTasks";
import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState(mockTasks);
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
          <TaskList tasks={mockTasks} />
          <KanbanBoard tasks={tasks} />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold">カンバン</h2>
        <div className="mt-4">
          <KanbanBoard tasks={mockTasks} />
        </div>
      </section>
    </main>
  );
}