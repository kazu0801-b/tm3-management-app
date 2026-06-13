import { KanbanBoard } from "@/components/organisms/KanbanBoard";
import { Navigation } from "@/components/organisms/Navigation";
import { AppLayout } from "@/components/templates/AppLayout";
import { mockTasks } from "@/data/mockTasks";

export default function KanbanPage() {
  return (
    <AppLayout>
      <h1 className="text-2xl font-bold">カンバン</h1>
      <Navigation />
      
      <p className="mt-2 text-gray-600">
        ステータスごとにタスクを確認できます。
      </p>

      <div className="mt-8">
        <KanbanBoard tasks={mockTasks} />
      </div>
    </AppLayout>
  );
}