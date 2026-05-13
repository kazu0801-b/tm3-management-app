import { TaskCard } from "@/components/organisms/TaskCard";
import { mockTasks } from "@/data/mockTasks";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">TM3管理ツール</h1>
      <p className="mt-4">フロントエンド開発を開始しました。</p>

      <div className="mt-8">
        <TaskCard task={mockTasks[0]}/>
      </div>
    </main>
  );
}