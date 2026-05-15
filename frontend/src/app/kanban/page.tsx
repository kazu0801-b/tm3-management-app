import { KanbanBoard } from "@/components/organisms/KanbanBoard";
import { mockTasks } from "@/data/mockTasks";

export default function KanbanPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">カンバン</h1>
      <p className="mt-2 text-gray-600">
        ステータスごとにタスクを確認できます。
      </p>

      <div className="mt-8">
        <KanbanBoard tasks={mockTasks} />
      </div>
    </main>
  );
}