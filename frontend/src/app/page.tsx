import { KanbanBoard } from "@/components/organisms/KanbanBoard";
import { TaskCard } from "@/components/organisms/TaskCard";
import { TaskList } from "@/components/organisms/TaskList";
import { mockTasks } from "@/data/mockTasks";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">TM3管理ツール</h1>
      <p className="mt-4">タスク一覧の表示テストです。</p>

      <section className="mt-8">
        <h2 className="text-xl font-bold">タスク一覧</h2>
        <div className="mt-4">
          <TaskList tasks={mockTasks} />
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